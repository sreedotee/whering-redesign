import re

with open('index.css', 'r') as f:
    content = f.read()

# Mapping of old values to new values
replacements = [
    # 16px -> 8px (padding/margin)
    (r'padding:\s*16px\b', 'padding: 8px'),
    (r'padding-inline:\s*16px\b', 'padding-inline: 8px'),
    (r'padding-left:\s*16px\b', 'padding-left: 8px'),
    (r'padding-right:\s*16px\b', 'padding-right: 8px'),
    (r'padding-top:\s*16px\b', 'padding-top: 8px'),
    (r'padding-bottom:\s*16px\b', 'padding-bottom: 8px'),
    (r'margin:\s*16px\b', 'margin: 8px'),
    (r'margin-inline:\s*16px\b', 'margin-inline: 8px'),
    (r'margin-left:\s*16px\b', 'margin-left: 8px'),
    (r'margin-right:\s*16px\b', 'margin-right: 8px'),
    (r'margin-top:\s*16px\b', 'margin-top: 8px'),
    (r'margin-bottom:\s*16px\b', 'margin-bottom: 8px'),
    
    # For padding with multiple values - more careful
    (r'padding:\s*(\d+px)\s+16px\b', r'padding: \1 8px'),
    (r'padding:\s*16px\s+(\d+px)\b', r'padding: 8px \1'),
    (r'padding:\s*(\d+px)\s+16px\s+(\d+px)\b', r'padding: \1 8px \2'),
    (r'padding:\s*16px\s+(\d+px)\s+(\d+px)\b', r'padding: 8px \1 \2'),
    (r'padding:\s*(\d+px)\s+16px\s+(\d+px)\s+(\d+px)\b', r'padding: \1 8px \2 \3'),
    
    # 20px -> 12px (maintain spacing ratios)
    (r'padding:\s*20px\b', 'padding: 12px'),
    (r'padding-top:\s*20px\b', 'padding-top: 12px'),
    (r'padding-bottom:\s*20px\b', 'padding-bottom: 12px'),
    (r'padding-inline:\s*20px\b', 'padding-inline: 12px'),
    (r'margin:\s*20px\b', 'margin: 12px'),
    (r'margin-top:\s*20px\b', 'margin-top: 12px'),
    (r'margin-bottom:\s*20px\b', 'margin-bottom: 12px'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

with open('index.css', 'w') as f:
    f.write(content)

print("Margin/padding values updated successfully!")
