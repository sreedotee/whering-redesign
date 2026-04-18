
import asyncio
import sys
sys.path.append(r"C:\Users\sreen\linkedin-mcp-server")
from linkedin_mcp_server.bootstrap import initialize_bootstrap, get_runtime_policy, start_background_browser_setup_if_needed
from linkedin_mcp_server.drivers.browser import get_or_create_browser, close_browser
from linkedin_mcp_server.scraping import LinkedInExtractor

async def test():
    initialize_bootstrap(get_runtime_policy())
    await start_background_browser_setup_if_needed()
    b = await get_or_create_browser()
    e = LinkedInExtractor(b.page)
    p = await e.scrape_person("gdezn", {"main_profile"})
    text = p["sections"]["main_profile"]
    lines = text.split("\n")
    for line in lines[:10]:
        print(line)
    await close_browser()

if __name__ == "__main__":
    asyncio.run(test())
