import re

with open('src/App.jsx', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

old_overlay = '''function DiscoverOutfitOverlay({ card, onClose }) {
  const detail = discoverOutfitDetails[card.id] ?? discoverOutfitDetails.default;

  return (
    <div
      className="discover-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="discover-overlay-card">
        <div
          className="discover-overlay-hero"
          style={{
            backgroundImage: \url( + "$" + {card.imageUrl})\,
            backgroundPosition: card.imagePosition,
          }}
        >
          <button type="button" className="discover-overlay-icon discover-overlay-icon--left" onClick={onClose} aria-label="Close outfit details">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="7 10 12 15 17 10" />
            </svg>
          </button>
        </div>

        <div className="discover-overlay-body">
          <div className="discover-overlay-author-row">
            <div className="discover-author">
              <div className="discover-author-avatar" />
              <div className="discover-author-text">
                <div className="discover-author-name">{card.author}</div>
                <div className="discover-author-context">{card.context}</div>
              </div>
            </div>
            <button type="button" className="discover-overlay-follow">Follow</button>
          </div>
          <div className="discover-overlay-title-row">
            <h2 className="discover-overlay-title">{detail.title}</h2>
            <button type="button" className="discover-overlay-share" aria-label="Share outfit">
              <ShareIcon />
            </button>
          </div>

          <div className="discover-overlay-items-header">Items used</div>
          <div className="discover-overlay-items">
            {detail.items.map((item) => (
              <div key={item.id} className="discover-overlay-item-card">
                <div className="discover-overlay-item-image" style={{ backgroundImage: \url( + "$" + {item.imageUrl})\ }}>
                  <button type="button" className="discover-overlay-item-plus" aria-label={\Add  + "$" + {item.name}\}>
                    +
                  </button>
                </div>
                <div className="discover-overlay-item-brand">{item.brand}</div>
                <div className="discover-overlay-item-name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="discover-overlay-footer">
          <div className="discover-overlay-footer-copy">
            <span>{detail.includedCount} Items included</span>
            <strong>Style this Look</strong>
          </div>
          <button type="button" className="discover-overlay-cta">
            <BookmarkIcon />
            {detail.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}'''

new_overlay = '''function DiscoverOutfitOverlay({ card, onClose }) {
  const detail = discoverOutfitDetails[card.id] ?? discoverOutfitDetails.default;
  const { registerDial } = useDialKit();

  const overlayRadius = registerDial('Overlay Radius', 24, 0, 48);
  const authorSectionGap = registerDial('Author Section Gap', 10, 0, 32);
  const authorSectionPad = registerDial('Author Section Pad', 0, 0, 48);
  const itemsSectionGap = registerDial('Items Section Gap', 10, 0, 32);
  const itemBorderRadius = registerDial('Item Radius', 16, 0, 32);

  return (
    <div
      className="discover-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="discover-overlay-card" style={{ borderRadius: overlayRadius }}>
        <div
          className="discover-overlay-hero"
          style={{
            backgroundImage: \url( + "$" + {card.imageUrl})\,
            backgroundPosition: card.imagePosition,
            position: 'relative',
          }}
        >
          <button type="button" className="discover-overlay-share" aria-label="Share outfit" style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(255,255,255,0.9)' }}>
            <ShareIcon />
          </button>
        </div>

        <div className="discover-overlay-body">
          <div className="discover-overlay-author-row" style={{ gap: authorSectionGap, padding: authorSectionPad }}>
            <div className="discover-author">
              <div className="discover-author-avatar" style={card.authorAvatar ? { backgroundImage: \url( + "$" + {card.authorAvatar})\ } : null} />
              <div className="discover-author-text">
                <div className="discover-author-name">{card.author}</div>
                <div className="discover-author-context">{card.context}</div>
              </div>
            </div>
            <button type="button" className="discover-overlay-follow">Follow</button>
          </div>

          <div className="discover-overlay-items-header">Items used</div>
          <div className="discover-overlay-items" style={{ gap: itemsSectionGap }}>
            {detail.items.map((item) => (
              <div key={item.id} className="discover-overlay-item-card">
                <div className="discover-overlay-item-image" style={{ backgroundImage: \url( + "$" + {item.imageUrl})\, borderRadius: itemBorderRadius }}>
                  <button type="button" className="discover-overlay-item-plus" aria-label={\Save  + "$" + {item.name}\} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ transform: 'scale(0.65)' }}>
                      <BookmarkIcon dark />
                    </div>
                  </button>
                </div>
                <div className="discover-overlay-item-brand">{item.brand}</div>
                <div className="discover-overlay-item-name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="discover-overlay-footer">
          <div className="discover-overlay-footer-copy">
            <span>{detail.includedCount} Items included</span>
            <strong>Style this Look</strong>
          </div>
          <button type="button" className="discover-overlay-cta">
            <BookmarkIcon />
            {detail.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}'''

if old_overlay in content:
    content = content.replace(old_overlay, new_overlay)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find substring")
