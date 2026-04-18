
import asyncio
import os
import sys
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
        print("Authenticated. Getting Whering company profile...")
        
        extractor = LinkedInExtractor(browser.page)
        
        # Get Company Profile for Whering
        results = await extractor.scrape_company("whering", None)
        
        print("\n--- RESULTS ---")
        print(results)
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await close_browser()

if __name__ == "__main__":
    asyncio.run(main())
