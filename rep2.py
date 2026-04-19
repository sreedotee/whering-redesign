import io
with io.open("src/App.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Overlay radius dial and body restructuring
content = content.replace("function DiscoverOutfitOverlay({ card, onClose }) {", "function DiscoverOutfitOverlay({ card, onClose }) {\n  const { registerDial } = useDialKit();\n  const overlayRadius = registerDial('Overlay Radius', 24, 0, 48);\n  const authorSectionGap = registerDial('Author Section Gap', 10, 0, 32);\n  const authorSectionPad = registerDial('Author Section Pad', 0, 0, 48);\n  const itemsSectionGap = registerDial('Items Section Gap', 10, 0, 32);\n  const itemBorderRadius = registerDial('Item Radius', 16, 0, 32);")

content = content.replace("<div className=\"discover-overlay-card\">", "<div className=\"discover-overlay-card\" style={{ borderRadius: overlayRadius, overflow: 'hidden' }}>")

# 2. Hero Share button and remove close button
content = content.replace(r"""        <div
          className="discover-overlay-hero"
          style={{
            backgroundImage: `url(${card.imageUrl})`,
            backgroundPosition: card.imagePosition,
          }}
        >
          <button type="button" className="discover-overlay-icon discover-overlay-icon--left" onClick={onClose} aria-label="Close outfit details">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="7 10 12 15 17 10" />
            </svg>
          </button>
        </div>""", r"""        <div
          className="discover-overlay-hero"
          style={{
            backgroundImage: `url(${card.imageUrl})`,
            backgroundPosition: card.imagePosition,
            position: 'relative',
          }}
        >
          <button type="button" className="discover-overlay-share" aria-label="Share outfit" style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(255,255,255,0.9)', zIndex: 10 }}>
            <ShareIcon />
          </button>
        </div>""")

# 3. Author Section styling
content = content.replace(r"""<div className="discover-overlay-author-row">""", r"""<div className="discover-overlay-author-row" style={{ gap: authorSectionGap, padding: authorSectionPad }}>""")

# 4. Avatar styling (keeping it explicit to make sure it functions)
content = content.replace(r"""<div className="discover-author-avatar" />""", r"""<div className="discover-author-avatar" style={card.authorAvatar ? { backgroundImage: `url(${card.authorAvatar})` } : null} />""")

# 5. Remove Title row entirely
content = content.replace(r"""          <div className="discover-overlay-title-row">
            <h2 className="discover-overlay-title">{detail.title}</h2>
            <button type="button" className="discover-overlay-share" aria-label="Share outfit">
              <ShareIcon />
            </button>
          </div>""", "")

# 6. Items gap and radius, change + to BookmarkIcon
content = content.replace(r"""<div className="discover-overlay-items">""", r"""<div className="discover-overlay-items" style={{ gap: itemsSectionGap }}>""")

content = content.replace(r"""                <div className="discover-overlay-item-image" style={{ backgroundImage: `url(${item.imageUrl})` }}>
                  <button type="button" className="discover-overlay-item-plus" aria-label={`Add ${item.name}`}>
                    +
                  </button>
                </div>""", r"""                <div className="discover-overlay-item-image" style={{ backgroundImage: `url(${item.imageUrl})`, borderRadius: itemBorderRadius }}>
                  <button type="button" className="discover-overlay-item-plus" aria-label={`Save ${item.name}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ transform: 'scale(0.65)' }}>
                      <BookmarkIcon dark />
                    </div>
                  </button>
                </div>""")

with io.open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
