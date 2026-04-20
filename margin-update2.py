import re

with open('index.css', 'r') as f:
    content = f.read()

# More specific replacements for complex padding/margin patterns
replacements = [
    # padding with 16px in various positions
    (r'padding:\s*(\d+px)\s+16px\s+(\d+px)\b', r'padding: \1 8px \2'),
    (r'padding:\s*16px\s+(\d+px)\s+(\d+px)\b', r'padding: 8px \1 \2'),
    (r'padding:\s*(\d+px)\s+16px\b', r'padding: \1 8px'),
    (r'padding:\s*16px\s+(\d+px)\b', r'padding: 8px \1'),
    (r'padding:\s*0\s+16px\b', r'padding: 0 8px'),
    (r'padding:\s*(\d+px)\s+8px\s+(\d+px)\s+16px\b', r'padding: \1 8px \2 8px'),
    
    # margin with 16px
    (r'margin:\s*(\d+px)\s+16px\b', r'margin: \1 8px'),
    (r'margin:\s*0\s+16px\b', r'margin: 0 8px'),
    
    # padding-bottom/top with calculations involving 16px
    (r'padding-bottom:\s*calc\(var\(--app-bottom-nav-height\)\s*\+\s*16px\)', 'padding-bottom: calc(var(--app-bottom-nav-height) + 8px)'),
    
    # padding-inline still being 16px
    (r'padding-inline:\s*16px\b', 'padding-inline: 8px'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

with open('index.css', 'w') as f:
    f.write(content)

print("Additional margin/padding updates applied!")
