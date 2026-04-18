import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import PyPDF2
import glob
import os
import sys

def search_epub(filepath, query):
    try:
        book = epub.read_epub(filepath)
        found = False
        for item in book.get_items_of_type(ebooklib.ITEM_DOCUMENT):
            soup = BeautifulSoup(item.get_content(), 'html.parser')
            text = soup.get_text()
            if query.lower() in text.lower():
                index = text.lower().find(query.lower())
                start = max(0, index - 300)
                end = min(len(text), index + 500)
                print(f"\n--- MATCH IN EPUB: {os.path.basename(filepath)} ---")
                print(f"[{query}]\n...{text[start:end]}...")
                found = True
                break
        return found
    except Exception as e:
        return False

def search_pdf(filepath, query):
    try:
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page_num, page in enumerate(reader.pages):
                text = page.extract_text()
                if query.lower() in text.lower():
                    index = text.lower().find(query.lower())
                    start = max(0, index - 300)
                    end = min(len(text), index + 500)
                    print(f"\n--- MATCH IN PDF: {os.path.basename(filepath)} (Page {page_num+1}) ---")
                    print(f"[{query}]\n...{text[start:end]}...")
                    return True
        return False
    except Exception as e:
        return False

if __name__ == "__main__":
    queries = sys.argv[1:] if len(sys.argv) > 1 else ["navigation", "persona", "power user"]
    epubs = glob.glob("*.epub")
    pdfs = glob.glob("*.pdf")
    
    for q in queries:
        print(f"\nSearching for: '{q}'...")
        for e in epubs: search_epub(e, q)
        for p in pdfs: search_pdf(p, q)
