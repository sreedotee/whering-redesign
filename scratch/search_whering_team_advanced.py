
import asyncio
import os
import sys
import json
import logging

# Set output to utf-8
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Add the server directory to path
server_dir = r"C:\Users\sreen\linkedin-mcp-server"
if server_dir not in sys.path:
    sys.path.append(server_dir)

from linkedin_mcp_server.bootstrap import initialize_bootstrap, get_runtime_policy, start_background_browser_setup_if_needed
from linkedin_mcp_server.drivers.browser import get_or_create_browser, close_browser
from linkedin_mcp_server.scraping import LinkedInExtractor

async def main():
    print("Initializing browser...")
    initialize_bootstrap(get_runtime_policy())
    await start_background_browser_setup_if_needed()
    
    try:
        browser = await get_or_create_browser()
        print("Authenticated. Searching for Whering Product & Design team...")
        
        extractor = LinkedInExtractor(browser.page)
        
        queries = [
            "Whering Product",
            "Whering Design",
            "Whering UX",
            "Whering Engineering"
        ]
        
        all_people = {} # URL -> {text, context}
        
        for query in queries:
            print(f"\nSearching for: {query}...")
            results = await extractor.search_people(query, None)
            
            if "references" in results and "search_results" in results["references"]:
                refs = results["references"]["search_results"]
                for ref in refs:
                    if ref.get("kind") == "person":
                        url = ref["url"]
                        name = ref.get("text", "Unknown")
                        context = ref.get("context", "")
                        
                        if url not in all_people:
                            all_people[url] = {
                                "name": name,
                                "context": context,
                                "query": query,
                                "url": url
                            }
            
            # Avoid immediate consecutive searches
            await asyncio.sleep(2)
        
        print("\n--- IDENTIFIED TEAM MEMBERS ---")
        sorted_people = sorted(all_people.values(), key=lambda x: (x['context'] or '', x['name']))
        
        for person in sorted_people:
            print(f"- {person['name']} | {person['context']} (Found via: {person['query']}) | https://www.linkedin.com{person['url']}")
            
        # Also output as JSON for easier processing if needed
        with open("whering_team_identified.json", "w") as f:
            json.dump(all_people, f, indent=4)
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        await close_browser()

if __name__ == "__main__":
    asyncio.run(main())
