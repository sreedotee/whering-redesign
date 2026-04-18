import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import PyPDF2
import glob
import os

def scan_epub(filepath):
    print(f"--- Scanning EPUB: {os.path.basename(filepath)} ---")
    try:
        book = epub.read_epub(filepath)
        print(f"Title: {book.get_metadata('DC', 'title')}")
        
        # Get first few items to show I can read it
        count = 0
        for item in book.get_items_of_type(ebooklib.ITEM_DOCUMENT):
            soup = BeautifulSoup(item.get_content(), 'html.parser')
            text = soup.get_text().strip()
            if text:
                print(f"Snippet: {text[:200]}...")
                count += 1
                if count > 2: break
    except Exception as e:
        print(f"Error reading EPUB: {e}")

def scan_pdf(filepath):
    print(f"\n--- Scanning PDF: {os.path.basename(filepath)} ---")
    try:
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            print(f"Pages: {len(reader.pages)}")
            print(f"Snippet: {reader.pages[0].extract_text()[:400]}...")
    except Exception as e:
        print(f"Error reading PDF: {e}")

if __name__ == "__main__":
    epubs = glob.glob("*.epub")
    pdfs = glob.glob("*.pdf")
    
    for e in epubs: scan_epub(e)
    for p in pdfs: scan_pdf(p)
