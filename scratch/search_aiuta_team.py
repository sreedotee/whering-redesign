import asyncio
import io
import json
import sys

if sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

server_dir = r"C:\Users\sreen\linkedin-mcp-server"
if server_dir not in sys.path:
    sys.path.append(server_dir)

from linkedin_mcp_server.bootstrap import (
    get_runtime_policy,
    initialize_bootstrap,
    start_background_browser_setup_if_needed,
)
from linkedin_mcp_server.drivers.browser import close_browser, get_or_create_browser
from linkedin_mcp_server.scraping import LinkedInExtractor


async def main():
    print("Initializing browser...")
    initialize_bootstrap(get_runtime_policy())
    await start_background_browser_setup_if_needed()

    try:
        browser = await get_or_create_browser()
        print("Authenticated. Searching for AIUTA design/product people...")

        extractor = LinkedInExtractor(browser.page)
        queries = [
            "AIUTA Design",
            "AIUTA Product Designer",
            "AIUTA UX",
            "AIUTA Product",
            "AIUTA Founder",
            "AIUTA CPO",
            "AIUTA Head of Product",
            "AIUTA Mobile",
        ]

        all_people = {}
        for query in queries:
            print(f"\nSearching for: {query}...")
            results = await extractor.search_people(query, None)
            refs = results.get("references", {}).get("search_results", [])
            for ref in refs:
                if ref.get("kind") != "person":
                    continue

                url = ref["url"]
                if url not in all_people:
                    all_people[url] = {
                        "name": ref.get("text", "Unknown"),
                        "context": ref.get("context", ""),
                        "query": query,
                        "url": url,
                    }

            await asyncio.sleep(2)

        print("\n--- IDENTIFIED AIUTA PEOPLE ---")
        for person in sorted(all_people.values(), key=lambda x: (x["context"] or "", x["name"])):
            print(
                f"- {person['name']} | {person['context']} "
                f"(Found via: {person['query']}) | https://www.linkedin.com{person['url']}"
            )

        with open("aiuta_team_identified.json", "w", encoding="utf-8") as f:
            json.dump(all_people, f, indent=4, ensure_ascii=False)

    except Exception as exc:
        print(f"Error: {exc}")
        import traceback

        traceback.print_exc()
    finally:
        await close_browser()


if __name__ == "__main__":
    asyncio.run(main())
