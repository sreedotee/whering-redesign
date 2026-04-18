
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
        extractor = LinkedInExtractor(browser.page)
        
        with open("whering_team_identified.json", "r") as f:
            all_people = json.load(f)
            
        print(f"Loaded {len(all_people)} candidates. Verifying roles...")
        
        verified_team = []
        
        # Filter out likely false positives (people with 'Wehring' in name but not work context)
        candidates = []
        for url, data in all_people.items():
            name_lower = data['name'].lower()
            if "wehring" in name_lower and data['query'] != "Whering Product":
                # If they were found via a non-product query but have the name Wehring, might be noise
                # but we'll check them anyway if they are in design/ux
                pass
            candidates.append(url)
            
        # To avoid rate limits, we'll only check the most promising ones first
        # Priority: Dan Beech, Callum Winn, Georgia Cozma, and others found via Design/UX queries
        priority_urls = [
            "/in/dan-beech/",
            "/in/callum-winn/",
            "/in/gdezn/",
            "/in/okeme-enemona/",
            "/in/mohsen-vala-485b7848/",
            "/in/leayerevanian/",
            "/in/mathilde-schaub-6881a5122/",
            "/in/lavanya-garg-34852455/",
            "/in/gorki-bora/",
            "/in/aravinthanbabu/"
        ]
        
        # Add remaining ones
        for url in candidates:
            if url not in priority_urls:
                priority_urls.append(url)
        
        for url in priority_urls:
            username = url.split("/in/")[1].strip("/")
            print(f"Checking {username}...")
            
            try:
                profile = await extractor.scrape_person(username, {"main_profile"})
                text = profile.get("sections", {}).get("main_profile", "")
                
                # Check if they actually work at Whering
                if "whering" in text.lower():
                    # Extract the first line or two as role
                    lines = [l.strip() for l in text.split("\n") if l.strip()]
                    role = lines[1] if len(lines) > 1 else "Unknown Role"
                    
                    verified_team.append({
                        "name": all_people[url]["name"],
                        "role": role,
                        "url": f"https://www.linkedin.com{url}",
                        "headline": lines[0] if lines else ""
                    })
                    print(f"  [VERIFIED] {all_people[url]['name']}: {role}")
                else:
                    print(f"  [SKIPPED] {all_people[url]['name']} does not seem to be at Whering.")
            except Exception as e:
                print(f"  [ERROR] {username}: {e}")
                
            await asyncio.sleep(2) # Protect against rate limits
            
            # Stop after 15 to avoid over-scraping in one go
            if len(verified_team) >= 15:
                break
                
        print("\n--- FINAL VERIFIED WHERING TEAM ---")
        for member in verified_team:
            print(f"- {member['name']}: {member['role']} ({member['url']})")
            
        with open("whering_team_verified.json", "w") as f:
            json.dump(verified_team, f, indent=4)
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await close_browser()

if __name__ == "__main__":
    asyncio.run(main())
