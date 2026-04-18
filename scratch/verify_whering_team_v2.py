
import asyncio
import os
import sys
import json
import logging
import re

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
        
        # Explicitly add founders and known key people
        manual_candidates = [
            "biancarangecroft", # Founder
            "lucia-saborio-317134aa", # Co-founder
            "gdezn", # Georgia Cozma
            "callum-winn",
            "dan-beech"
        ]
        
        with open("whering_team_identified.json", "r") as f:
            all_people = json.load(f)
            
        print(f"Verifying team members...")
        
        verified_team = []
        
        target_usernames = set(manual_candidates)
        for url in all_people.keys():
            username = url.split("/in/")[1].strip("/")
            target_usernames.add(username)
            
        processed = set()
        
        for username in target_usernames:
            if username in processed: continue
            processed.add(username)
            
            print(f"Checking {username}...")
            
            try:
                profile = await extractor.scrape_person(username, {"main_profile"})
                text = profile.get("sections", {}).get("main_profile", "")
                
                # Smarter headline extraction
                lines = [l.strip() for l in text.split("\n") if l.strip()]
                
                # Filter out name, pronouns, and connection degree to find headline
                headline = ""
                name = lines[0] if lines else username
                
                for line in lines[1:6]:
                    if "rd" in line and "" in line: continue # Connection degree
                    if "/" in line and any(p in line.lower() for p in ["she", "he", "they", "him", "her"]): continue # Pronouns
                    if line == name: continue
                    headline = line
                    break
                
                # Check if they actually work at Whering
                if "whering" in text.lower() or "whering" in headline.lower():
                    verified_team.append({
                        "name": name,
                        "headline": headline,
                        "url": f"https://www.linkedin.com/in/{username}/",
                        "username": username
                    })
                    print(f"  [VERIFIED] {name}: {headline}")
                else:
                    print(f"  [SKIPPED] {name} does not seem to be at Whering.")
            except Exception as e:
                print(f"  [ERROR] {username}: {e}")
                
            await asyncio.sleep(2)
            
            if len(verified_team) >= 20:
                break
                
        print("\n--- FINAL VERIFIED WHERING TEAM ---")
        for member in verified_team:
            print(f"- {member['name']}: {member['headline']} ({member['url']})")
            
        with open("whering_team_final.json", "w") as f:
            json.dump(verified_team, f, indent=4)
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await close_browser()

if __name__ == "__main__":
    asyncio.run(main())
