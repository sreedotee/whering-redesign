import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { loadAnnotations } from 'agentation';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';
import { initSwipeBack } from '../ux-foundation/mechanics.js';

const Agentation = lazy(() =>
  import('agentation').then((module) => ({ default: module.Agentation })),
);

const discoverCards = [
  {
    id: 'discover-1',
    column: 0,
    type: 'outfit',
    height: 286,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: 'center top',
    author: 'Sophie',
    context: "in Summer '26",
    count: '1.2k',
  },
  {
    id: 'discover-2',
    column: 1,
    type: 'item',
    height: 196,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '50% 22%',
    author: 'Lina',
    context: 'item inspo',
    title: 'Butter Set',
    subtitle: '2 pieces',
    count: '842',
  },
  {
    id: 'discover-3',
    column: 0,
    type: 'item',
    height: 172,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '55% 14%',
    author: 'Mia',
    context: 'item inspo',
    title: 'Airport Knit',
    subtitle: 'saved by 986',
    count: '986',
  },
  {
    id: 'discover-4',
    column: 1,
    type: 'outfit',
    height: 258,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '56% 10%',
    author: 'Jules',
    context: 'weekend edit',
    count: '1.4k',
  },
  {
    id: 'discover-5',
    column: 1,
    type: 'item',
    height: 164,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '60% 8%',
    author: 'Noor',
    context: 'item inspo',
    title: 'Cloud Hoodie',
    subtitle: 'saved by 1.1k',
    count: '1.1k',
  },
  {
    id: 'discover-6',
    column: 0,
    type: 'outfit',
    height: 326,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '52% center',
    author: 'Mia',
    context: 'airport look',
    count: '713',
  },
  {
    id: 'discover-7',
    column: 1,
    type: 'outfit',
    height: 314,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '58% center',
    author: 'Noor',
    context: 'monochrome edit',
    count: '904',
  },
  {
    id: 'discover-8',
    column: 0,
    type: 'outfit',
    height: 238,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '57% 6%',
    author: 'Leah',
    context: 'denim core',
    count: '1.6k',
  },
  {
    id: 'discover-9',
    column: 1,
    type: 'item',
    height: 188,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '50% 12%',
    author: 'Aya',
    context: 'item inspo',
    title: 'White Boots',
    subtitle: 'saved by 2.1k',
    count: '2.1k',
  },
  {
    id: 'discover-10',
    column: 0,
    type: 'item',
    height: 206,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '50% 12%',
    author: 'Leah',
    context: 'item inspo',
    title: 'Soft Knit',
    subtitle: 'saved by 632',
    count: '632',
  },
  {
    id: 'discover-11',
    column: 1,
    type: 'outfit',
    height: 248,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '54% 8%',
    author: 'Aya',
    context: 'city layers',
    count: '488',
  },
  {
    id: 'discover-12',
    column: 0,
    type: 'item',
    height: 182,
    imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0MQFX9J40QEVTKRGZ2G6WBYFMX.jpg',
    imagePosition: '52% 14%',
    author: 'Jules',
    context: 'item inspo',
    title: 'Street Tote',
    subtitle: 'saved by 1.3k',
    count: '1.3k',
  },
];

const discoverOutfitDetails = {
  default: {
    title: 'Curated Look',
    includedCount: 3,
    ctaLabel: 'Save outfit',
    items: [
      {
        id: 'detail-item-1',
        brand: 'Stussy',
        name: 'Yellow Hoodie',
        imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/090GKJ4QA8ZEV32K3FX9JN08ZY.jpg',
      },
      {
        id: 'detail-item-2',
        brand: 'Stussy',
        name: 'Yellow Pants',
        imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/5F80RX5MY4RP33FT6SVAXJSVDE.jpg',
      },
      {
        id: 'detail-item-3',
        brand: 'Nike',
        name: 'Air Force 1 Low',
        imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/7W1X36JM3KBAYG8NZEP7W1QGN5.jpg',
      },
    ],
  },
  'discover-1': {
    title: 'Yellow Co-Ord Fit',
    includedCount: 3,
    ctaLabel: 'Save outfit',
    items: [
      {
        id: 'detail-item-1',
        brand: 'Stussy',
        name: 'Yellow Hoodie',
        imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/090GKJ4QA8ZEV32K3FX9JN08ZY.jpg',
      },
      {
        id: 'detail-item-2',
        brand: 'Stussy',
        name: 'Yellow Pants',
        imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/5F80RX5MY4RP33FT6SVAXJSVDE.jpg',
      },
      {
        id: 'detail-item-3',
        brand: 'Nike',
        name: 'Air Force 1 Low',
        imageUrl: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/7W1X36JM3KBAYG8NZEP7W1QGN5.jpg',
      },
    ],
  },
};

const profileGridImages = [
    { id: 'pg1', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/7QRG0MDTVR6PD6ZQ0SKT1Z1KCJ.jpg', height: 260 },
    { id: 'pg2', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/07JKEK4CWG967CZF35K9XVGCAP.jpg', height: 210 },
    { id: 'pg3', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/71AR1PGS8T6ZPFJKKVC0ES4BT4.jpg', height: 210 },
    { id: 'pg4', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/665YP1TGMBQ3MGX5VMRNN1785H.jpg', height: 260 },
];

const studioItems = [
  { id: 's1', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/090GKJ4QA8ZEV32K3FX9JN08ZY.jpg' },
  { id: 's2', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/3R9W71BZ7KA9WN09R6HNA6PTGH.jpg' },
  { id: 's3', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/5DGAVH8PFY2FR0BPGF9K8VDTS8.jpg' },
  { id: 's4', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/6T0PMEQDJ18KBJ4BEG6EF0JK4Z.jpg' },
  { id: 's5', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/7QWK2RNATR35Q4ZQ2XCA1Z1C96.jpg' },
  { id: 's6', url: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0P4Q226RN1C07JXQCWVCDDKY17.jpg' },
];



function StudioScreen({ activeScreen }) {
  const [activeCategory, setActiveCategory] = useState('Tops');

  return (
    <main id="studio-screen" className={`screen${activeScreen === 'studio' ? ' active' : ''}`} data-tab="studio">
        <div className="studio-container">
            <header className="studio-header">
                <button className="icon-action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 8v4l3 3M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                </button>
                <div className="studio-credits">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF9A00" stroke="#FF9A00" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" stroke="#FFFFFF" strokeWidth="2" /></svg>
                    <span>3 credits</span>
                </div>
            </header>

            <div className="studio-canvas">
                <div className="studio-canvas-placeholder">
                    Tap items below to build your outfit
                </div>
            </div>

            <div className="studio-categories-bar" style={{ gap: 'var(--studio-pill-gap)' }}>
                {['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'].map(cat => (
                    <button 
                        key={cat} 
                        className={`studio-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="studio-recent-filter">
                <span>Recently Added</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
            </div>

            <div className="studio-grid-scroll">
                <div className="studio-grid" style={{ gridTemplateColumns: `repeat(var(--studio-grid-cols), 1fr)` }}>
                    {studioItems.map((item) => (
                        <div key={item.id} className="studio-item-card" style={{ backgroundImage: `url(${item.url})` }} />
                    ))}
                </div>
            </div>

            <div className="studio-footer-actions">
                <button className="studio-create-btn shadow-lg">
                    Create outfit
                </button>
            </div>
        </div>
    </main>
  );
}

const plannerDays = [
  { day: 'MON', date: 12 },
  { day: 'TUE', date: 13 },
  { day: 'WED', date: 14 },
  { day: 'THU', date: 15 },
  { day: 'FRI', date: 16 },
  { day: 'SAT', date: 17 },
];

const weeklyUsageByRange = {
  Week: [0.16, 0.58, 0.9, 0.36, 0.46, 0.8, 0.22],
  Month: [0.44, 0.62, 0.3, 0.78, 0.54, 0.68, 0.48],
  Year: [0.72, 0.42, 0.6, 0.33, 0.85, 0.57, 0.5],
};

const yearlyConsistencyCells = [
  'solid', 'mid', 'off', 'soft', 'solid',
  'solid', 'off', 'solid', 'mid', 'off',
  'soft', 'solid', 'solid', 'off', 'solid',
  'mid', 'off', 'soft', 'solid', 'solid',
];

const detectedOutfitItems = [
  {
    id: 'detected-1',
    title: 'Denim Jacket',
    imageUrl: profileGridImages[0].url,
    tags: ['Blue', 'Outerwear'],
  },
  {
    id: 'detected-2',
    title: 'White Tee',
    imageUrl: profileGridImages[2].url,
    tags: ['Cotton', 'Essentials'],
  },
];

function BackChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ProfileFabMenuOverlay({ open, onClose, onUpload }) {
  return (
    <div
      className={`profile-menu-overlay${open ? ' active' : ''}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="profile-menu-card">
        <button type="button" className="profile-menu-item" onClick={onUpload}>
          <span className="profile-menu-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <circle cx="8.5" cy="10" r="1.3" />
              <path d="M21 15l-5.2-5.2a1 1 0 0 0-1.4 0L8 16.2" />
            </svg>
          </span>
          <span className="profile-menu-label">Upload image</span>
        </button>
        <div className="profile-menu-divider" />
        <button type="button" className="profile-menu-item" onClick={onClose}>
          <span className="profile-menu-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
              <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
            </svg>
          </span>
          <span className="profile-menu-label">Paste link</span>
        </button>
      </div>

      <button type="button" className="profile-menu-close" onClick={onClose} aria-label="Close add menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function ProfilePlannerView({ onBack }) {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="profile-planner-view">
      <header className="planner-header">
        <button type="button" className="profile-back-button profile-back-button--ghost" onClick={onBack} aria-label="Back to profile">
          <BackChevronIcon />
        </button>
        <h1 className="planner-title">Planner</h1>
        <button type="button" className="planner-month-button">
          <span>April '26</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </header>

      <div className="planner-days-row">
        {plannerDays.map((entry, index) => (
          <button
            key={entry.day}
            type="button"
            className={`planner-day-chip${selectedDay === index ? ' active' : ''}`}
            onClick={() => setSelectedDay(index)}
          >
            <span className="planner-day-label">{entry.day}</span>
            <span className="planner-day-date">{entry.date}</span>
          </button>
        ))}
      </div>

      <section className="planner-section">
        <div className="planner-section-header">
          <h2>Today's Look</h2>
          <span className="planner-weather">65°F • Sunny</span>
        </div>

        <div className="planner-look-card">
          <div className="planner-look-image" style={{ backgroundImage: `url(${profileGridImages[0].url})` }} />
          <div className="planner-look-overlay">
            <div className="planner-look-title">Spring Gallery Opening</div>
            <div className="planner-look-subtitle">White Denim + Silk Top</div>
            <div className="planner-look-actions">
              <button type="button" className="planner-action planner-action--filled">Edit</button>
              <button type="button" className="planner-action">Log as Worn</button>
            </div>
          </div>
        </div>
      </section>

      <section className="planner-section planner-section--items">
        <div className="planner-section-header">
          <h2>Items</h2>
        </div>

        <div className="planner-items-rail">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`planner-item-${index}`}
              className="planner-item-thumb"
              style={{ backgroundImage: `url(${profileGridImages[2].url})` }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileStatsView({ onBack }) {
  const [activeRange, setActiveRange] = useState('Week');
  const bars = weeklyUsageByRange[activeRange];

  return (
    <div className="profile-subscreen profile-stats-view">
      <header className="profile-stats-header">
        <button type="button" className="profile-back-button" onClick={onBack} aria-label="Back to profile">
          <BackChevronIcon />
        </button>
        <h1 className="profile-stats-title">Wardrobe Habits</h1>
        <div className="profile-stats-spacer" />
      </header>

      <div className="stats-range-switch" role="tablist" aria-label="Wardrobe habits range">
        {['Week', 'Month', 'Year'].map((range) => (
          <button
            key={range}
            type="button"
            className={`stats-range-option${activeRange === range ? ' active' : ''}`}
            onClick={() => setActiveRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      <section className="stats-section">
        <div className="stats-section-header">
          <h2>Weekly Usage</h2>
          <span>Avg: 1.4 Items/Day</span>
        </div>

        <div className="stats-chart">
          {bars.map((value, index) => (
            <div key={`bar-${index}`} className="stats-bar-column">
              <div className="stats-bar-track">
                <div
                  className={`stats-bar-fill${index === 2 ? ' highlight' : ''}`}
                  style={{ height: `${Math.max(18, value * 100)}%` }}
                />
              </div>
              <span className={`stats-bar-label${index === 2 ? ' highlight' : ''}`}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-summary-card">
        <h2>Yearly Consistency</h2>
        <div className="stats-consistency-grid">
          {yearlyConsistencyCells.map((tone, index) => (
            <span key={`consistency-${index}`} className={`consistency-cell consistency-cell--${tone}`} />
          ))}
        </div>
        <div className="stats-summary-footer">
          <span>284 Active Days in 2026</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </div>
      </section>
    </div>
  );
}

function ProfileAiEnhancerView({ onBack, onComplete }) {
  return (
    <div className="profile-subscreen profile-enhancer-view">
      <header className="enhancer-header">
        <button type="button" className="profile-back-button profile-back-button--dark" onClick={onBack} aria-label="Back to profile">
          <BackChevronIcon />
        </button>
        <h1 className="enhancer-title">AI ENHANCER</h1>
        <button type="button" className="enhancer-skip" onClick={onBack}>Skip</button>
      </header>

      <div className="enhancer-stage">
        <div className="enhancer-frame">
          <div className="enhancer-image" style={{ backgroundImage: `url(${profileGridImages[0].url})` }} />
          <span className="enhancer-corner enhancer-corner--tl" />
          <span className="enhancer-corner enhancer-corner--tr" />
          <span className="enhancer-corner enhancer-corner--bl" />
          <span className="enhancer-corner enhancer-corner--br" />
          <div className="enhancer-scan-line" />
          <div className="enhancer-badge enhancer-badge--top">EXTRACTING TEXTURE...</div>
          <div className="enhancer-badge enhancer-badge--bottom">ALBEDO NORMALIZED</div>
        </div>
      </div>

      <footer className="enhancer-footer">
        <div className="enhancer-progress-copy">
          <span>EDGE SMOOTHING</span>
          <span>84%</span>
        </div>
        <div className="enhancer-progress-track">
          <div className="enhancer-progress-fill" style={{ width: '84%' }} />
        </div>
        <button type="button" className="enhancer-complete-button" onClick={onComplete}>
          Complete Processing
        </button>
      </footer>
    </div>
  );
}

function ProfileOutfitBreakdownView({ onBack, onSave }) {
  return (
    <div className="profile-subscreen profile-breakdown-view">
      <header className="profile-breakdown-header">
        <button type="button" className="profile-back-button profile-back-button--ghost" onClick={onBack} aria-label="Back to profile">
          <BackChevronIcon />
        </button>
        <h1 className="profile-breakdown-title">Outfit Breakdown</h1>
        <div className="profile-breakdown-spacer" />
      </header>

      <section className="profile-breakdown-hero">
        <div className="profile-breakdown-image" style={{ backgroundImage: `url(${profileGridImages[0].url})` }} />
        <span className="profile-breakdown-badge">OUTFIT</span>
      </section>

      <section className="profile-breakdown-summary">
        <h2>Denim Weekend</h2>
      </section>

      <section className="profile-breakdown-items">
        <div className="profile-breakdown-label">Items Detected</div>
        <div className="profile-breakdown-cards">
          {detectedOutfitItems.map((item) => (
            <article key={item.id} className="profile-breakdown-card">
              <div className="profile-breakdown-card-image" style={{ backgroundImage: `url(${item.imageUrl})` }} />
              <div className="profile-breakdown-card-title">{item.title}</div>
              <div className="profile-breakdown-tags">
                {item.tags.map((tag) => (
                  <span key={`${item.id}-${tag}`} className="profile-breakdown-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}

          <article className="profile-breakdown-card profile-breakdown-card--add">
            <div className="profile-breakdown-add-box">
              <span className="profile-breakdown-add-plus">+</span>
            </div>
            <div className="profile-breakdown-add-text">Add Item</div>
          </article>
        </div>
      </section>

      <footer className="profile-breakdown-footer">
        <button type="button" className="profile-breakdown-save" onClick={onSave}>
          Save to wardrobe
        </button>
      </footer>
    </div>
  );
}

function ProfileMainView({
  activeTab,
  activeFilter,
  isFabOpen,
  onTabChange,
  onFilterChange,
  onCalendarOpen,
  onStatsOpen,
  onFabToggle,
}) {
  return (
    <>
      <div className={`profile-scroll-container${isFabOpen ? ' is-dimmed' : ''}`}>
        <header className="profile-top-actions">
          <button type="button" className="icon-action-btn shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          </button>
          <div className="right-group">
            <button type="button" className="icon-action-btn shadow-sm" onClick={onCalendarOpen} aria-label="Open planner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </button>
            <button type="button" className="icon-action-btn shadow-sm" onClick={onStatsOpen} aria-label="Open stats">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>
            </button>
          </div>
        </header>

        <div className="profile-identity-section">
          <div className="profile-large-avatar shadow-lg">
            <img src="https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/7E4YC2J4MVNKPTCFTG47ND6175.jpg" alt="Profile" />
          </div>
          <div className="profile-info-stack">
            <h1 className="profile-name">sree</h1>
            <span className="profile-handle">@sreedotee</span>
          </div>
        </div>

        <div className="profile-action-row">
          <button type="button" className="profile-edit-btn">Edit Profile</button>
          <button type="button" className="icon-btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
          </button>
          <button type="button" className="icon-btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </button>
        </div>

        <div className="profile-tabs-section">
          <div className="profile-tabs">
            <button type="button" className={`profile-tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => onTabChange('All')}>All</button>
            <button type="button" className={`profile-tab ${activeTab === 'Clusters' ? 'active' : ''}`} onClick={() => onTabChange('Clusters')}>Clusters</button>
          </div>
          <button type="button" className="grid-toggle-btn" aria-label="Grid view">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
          </button>
        </div>

        <div className="profile-filters-scroll">
          <div className="profile-filter-segmented" role="tablist" aria-label="Profile content filter">
            <button type="button" className={`pill-filter ${activeFilter === 'Items' ? 'active' : ''}`} onClick={() => onFilterChange('Items')}>Items</button>
            <button type="button" className={`pill-filter ${activeFilter === 'Outfits' ? 'active' : ''}`} onClick={() => onFilterChange('Outfits')}>Outfits</button>
          </div>
        </div>

        <div className="profile-masonry-grid">
          <div className="masonry-col">
            <div className="masonry-item" style={{ height: `${profileGridImages[0].height}px`, backgroundImage: `url(${profileGridImages[0].url})` }} />
            <div className="masonry-item" style={{ height: `${profileGridImages[2].height}px`, backgroundImage: `url(${profileGridImages[2].url})` }} />
          </div>
          <div className="masonry-col profile-masonry-offset">
            <div className="masonry-item" style={{ height: `${profileGridImages[1].height}px`, backgroundImage: `url(${profileGridImages[1].url})` }} />
            <div className="masonry-item masonry-item-placeholder" style={{ height: `${profileGridImages[3].height}px` }} />
          </div>
        </div>
      </div>

      <button id="main-fab" className={`fab profile-fab shadow-xl ${isFabOpen ? 'fab-active' : ''}`} type="button" onClick={onFabToggle} aria-label="Add item">
        <span className="icon-plus">+</span>
      </button>
    </>
  );
}

function ProfileScreen({ activeScreen }) {
  const [activeTab, setActiveTab] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Items');
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [profileView, setProfileView] = useState('main');

  useEffect(() => {
    if (activeScreen !== 'profile') {
      setIsFabOpen(false);
      setProfileView('main');
    }
  }, [activeScreen]);

  return (
    <main id="profile-screen" className={`screen${activeScreen === 'profile' ? ' active' : ''}`} data-tab="profile">
      {profileView === 'main' && (
        <>
          <ProfileMainView
            activeTab={activeTab}
            activeFilter={activeFilter}
            isFabOpen={isFabOpen}
            onTabChange={setActiveTab}
            onFilterChange={setActiveFilter}
            onCalendarOpen={() => setProfileView('planner')}
            onStatsOpen={() => setProfileView('stats')}
            onFabToggle={() => setIsFabOpen((open) => !open)}
          />
          <ProfileFabMenuOverlay
            open={isFabOpen}
            onClose={() => setIsFabOpen(false)}
            onUpload={() => {
              setIsFabOpen(false);
              setProfileView('ai-enhancer');
            }}
          />
        </>
      )}

      {profileView === 'planner' && <ProfilePlannerView onBack={() => setProfileView('main')} />}
      {profileView === 'stats' && <ProfileStatsView onBack={() => setProfileView('main')} />}
      {profileView === 'ai-enhancer' && (
        <ProfileAiEnhancerView
          onBack={() => setProfileView('main')}
          onComplete={() => setProfileView('outfit-breakdown')}
        />
      )}
      {profileView === 'outfit-breakdown' && (
        <ProfileOutfitBreakdownView
          onBack={() => setProfileView('main')}
          onSave={() => setProfileView('main')}
        />
      )}
    </main>
  );
}


const SHOW_DISCOVER_FOLLOW_CHIP = false;
const SHOW_DISCOVER_SECONDARY_ACTION = false;
const AGENTATION_SYNC_URL = 'http://localhost:4747/annotations';

const screens = [
  { id: 'home', label: 'Discover' },
  { id: 'explore', label: 'Search' },
  { id: 'studio', label: 'Create' },
  { id: 'inbox', label: 'Notifications' },
  { id: 'profile', label: 'Profile' },
];

function GlobeIcon({ active = false }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D0D0D' : '#C4C4C4'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function SearchIcon({ active = false }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D0D0D' : '#C4C4C4'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.6" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function BellIcon({ active = false }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D0D0D' : '#C4C4C4'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ProfileIcon({ active = false }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D0D0D' : '#C4C4C4'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function AppStatusBar() {
  return (
    <div className="app-status-bar" aria-hidden="true">
      <div className="app-status-time">9:41</div>
      <div className="app-status-icons">
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="20" width="8" height="12" rx="2" fill="#000000" />
          <rect x="12" y="14" width="8" height="18" rx="2" fill="#000000" />
          <rect x="24" y="8" width="8" height="24" rx="2" fill="#000000" />
          <rect x="36" y="0" width="8" height="32" rx="2" fill="#0000004D" />
        </svg>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 30C26.209 30 28 28.209 28 26C28 23.791 26.209 22 24 22C21.791 22 20 23.791 20 26C20 28.209 21.791 30 24 30Z" fill="#000000" />
          <path d="M36 20C32.024 16.024 27.976 14 24 14C20.024 14 15.976 16.024 12 20" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M44 12C38.036 6.036 30.964 3 24 3C17.036 3 9.964 6.036 4 12" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="app-battery">
          <div className="app-battery-level" />
          <div className="app-battery-cap" />
        </div>
      </div>
    </div>
  );
}

function AppBottomNav({ activeScreen, onScreenChange }) {
  return (
    <div className="app-bottom-nav" aria-label="Primary">
      <button className={`discover-nav-button${activeScreen === 'home' ? ' discover-nav-active' : ''}`} type="button" aria-label="Discover" onClick={() => onScreenChange('home')}>
        <GlobeIcon active={activeScreen === 'home'} />
      </button>
      <button className={`discover-nav-button${activeScreen === 'explore' ? ' discover-nav-active' : ''}`} type="button" aria-label="Search" onClick={() => onScreenChange('explore')}>
        <SearchIcon active={activeScreen === 'explore'} />
      </button>
      <button className={`discover-nav-button discover-nav-center${activeScreen === 'studio' ? ' discover-nav-active' : ''}`} type="button" aria-label="Create" onClick={() => onScreenChange('studio')}>
        <span className="discover-nav-center-ring">
          <PlusIcon />
        </span>
      </button>
      <button className={`discover-nav-button${activeScreen === 'inbox' ? ' discover-nav-active' : ''}`} type="button" aria-label="Notifications" onClick={() => onScreenChange('inbox')}>
        <BellIcon active={activeScreen === 'inbox'} />
      </button>
      <button className={`discover-nav-button${activeScreen === 'profile' ? ' discover-nav-active' : ''}`} type="button" aria-label="Profile" onClick={() => onScreenChange('profile')}>
        <ProfileIcon active={activeScreen === 'profile'} />
      </button>
    </div>
  );
}

function DialKitCopyButton() {
  const copyDialKitSnapshot = async () => {
    const panels = DialStore.getPanels();
    const payload = panels.reduce((accumulator, panel) => {
      accumulator[panel.name] = DialStore.getValues(panel.id);
      return accumulator;
    }, {});

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      window.__dialkitSnapshot = payload;
    } catch (error) {
      console.warn('Failed to copy DialKit values', error);
    }
  };

  return (
    <button type="button" className="dialkit-copy-button" onClick={copyDialKitSnapshot}>
      Copy Dial
    </button>
  );
}

function BookmarkIcon({ dark = false }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dark ? '#0D0D0D' : '#FAFAFA'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51 15.42 17.49" />
      <path d="M15.41 6.51 8.59 10.49" />
    </svg>
  );
}

function DiscoverCard({ card, onOpen }) {
  const cardClassName = [
    'discover-card',
    `discover-card--${card.type}`,
    onOpen ? 'discover-card--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={cardClassName}
      aria-label={`${card.type} inspiration card`}
      onClick={onOpen}
    >
      <div
        className="discover-card-media"
        style={{
          '--discover-card-height': `${card.height}px`,
        }}
      >
        <div
          className="discover-card-image"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0) 42%), url(${card.imageUrl})`,
            backgroundPosition: `0% 0%, ${card.imagePosition}`,
          }}
        />
        <div className="discover-card-top">
          <div className="discover-author">
            <div className="discover-author-avatar" />
            <div className="discover-author-text">
              <div className="discover-author-name">{card.author}</div>
              <div className="discover-author-context">{card.context}</div>
            </div>
          </div>
          {SHOW_DISCOVER_FOLLOW_CHIP ? (
            <button className="discover-follow-chip" type="button">Follow</button>
          ) : null}
        </div>
        {card.type === 'item' ? (
          <div className="discover-item-meta">
            <div className="discover-item-title">{card.title}</div>
            <div className="discover-item-subtitle">{card.subtitle}</div>
          </div>
        ) : null}
        <div className="discover-card-actions discover-card-actions-overlay">
          <button
            className="discover-save-pill"
            type="button"
            aria-label="Save count"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <BookmarkIcon />
            <span>{card.count}</span>
          </button>
        </div>
      </div>
      {SHOW_DISCOVER_SECONDARY_ACTION ? (
        <div className="discover-card-actions">
          <button className="discover-save-icon" type="button" aria-label="Save outfit">
            <ShareIcon />
          </button>
        </div>
      ) : null}
    </article>
  );
}

function DiscoverOutfitOverlay({ card, onClose }) {
  const detail = discoverOutfitDetails[card.id] ?? discoverOutfitDetails.default;
  const { overlayRadius, authorGap, authorPad, itemsGap, itemRadius } = useDialKit('Discover Overlay', {
    overlayRadius: [12, 0, 48],
    authorGap:     [8,  0, 32],
    authorPad:     [0,  0, 24],
    itemsGap:      [8,  0, 32],
    itemRadius:    [4,  0, 32],
  });

  return (
    <div
      className="discover-overlay"
      style={{ borderRadius: overlayRadius }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="discover-overlay-card" style={{ borderRadius: overlayRadius, overflow: 'hidden' }}>
        <div
          className="discover-overlay-hero"
          style={{
            backgroundImage: `url(${card.imageUrl})`,
            backgroundPosition: card.imagePosition,
            position: 'relative',
          }}
        >
          <button type="button" className="discover-overlay-share" aria-label="Share outfit" style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(255,255,255,0.9)', zIndex: 10 }}>
            <ShareIcon />
          </button>
        </div>

        <div className="discover-overlay-body">
          <div className="discover-overlay-author-row" style={{ gap: authorGap, padding: authorPad }}>
            <div className="discover-author">
              <div className="discover-author-avatar" style={card.authorAvatar ? { backgroundImage: `url(${card.authorAvatar})` } : undefined} />
              <div className="discover-author-text">
                <div className="discover-author-name">{card.author}</div>
                <div className="discover-author-context">{card.context}</div>
              </div>
            </div>
            <button type="button" className="discover-overlay-follow">Follow</button>
          </div>
          <div className="discover-overlay-items-header">Items used</div>
          <div className="discover-overlay-items" style={{ gap: itemsGap }}>
            {detail.items.map((item) => (
              <div key={item.id} className="discover-overlay-item-card">
                <div className="discover-overlay-item-image" style={{ backgroundImage: `url(${item.imageUrl})`, borderRadius: itemRadius }}>
                  <button type="button" className="discover-overlay-item-plus" aria-label={`Save ${item.name}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ transform: 'scale(0.65)', display: 'flex' }}><BookmarkIcon dark /></div>
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
}

function DiscoverScreen({ activeDiscoverTab, onDiscoverTabChange, activeScreen }) {
  const [activeOutfitCard, setActiveOutfitCard] = useState(null);
  const leftColumnCards = discoverCards.filter((card) => card.column === 0);
  const rightColumnCards = discoverCards.filter((card) => card.column === 1);

  useEffect(() => {
    if (activeScreen !== 'home') {
      setActiveOutfitCard(null);
    }
  }, [activeScreen]);

  return (
    <main id="home-screen" className={`screen${activeScreen === 'home' ? ' active' : ''}`} data-tab="home" aria-label="Discover feed">
      <div className="discover-top-nav">
        <div className="discover-tabs" role="tablist" aria-label="Discover tabs">
          <button className={`discover-tab${activeDiscoverTab === 'featured' ? ' is-active' : ''}`} type="button" onClick={() => onDiscoverTabChange('featured')}>
            Featured
          </button>
          <button className={`discover-tab${activeDiscoverTab === 'following' ? ' is-active' : ''}`} type="button" onClick={() => onDiscoverTabChange('following')}>
            Following
          </button>
        </div>
      </div>

      <div className="discover-feed">
      <div className="discover-grid">
        <div className="discover-column">
          {leftColumnCards.map((card) => (
            <DiscoverCard
              key={card.id}
              card={card}
              onOpen={card.type === 'outfit' ? () => setActiveOutfitCard(card) : undefined}
            />
          ))}
        </div>

        <div className="discover-column discover-column-offset">
          {rightColumnCards.map((card) => (
            <DiscoverCard
              key={card.id}
              card={card}
              onOpen={card.type === 'outfit' ? () => setActiveOutfitCard(card) : undefined}
            />
          ))}
        </div>
      </div>
      </div>

      {activeOutfitCard ? <DiscoverOutfitOverlay card={activeOutfitCard} onClose={() => setActiveOutfitCard(null)} /> : null}
    </main>
  );
}

const exploreCategories = ['All', 'Streetwear', 'Archive', 'Y2K', 'Office'];
const exploreHeroByCategory = {
  All: {
    tag: 'Trending Edit',
    title: "Summer '26 Minimalism",
    image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/665YP1TGMBQ3MGX5VMRNN1785H.jpg',
  },
  Streetwear: {
    tag: 'Streetwear Radar',
    title: 'Utility Layers & Sport Codes',
    image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/3EM6C87RG55K3MCP8G3CD9V95Z.jpg',
  },
  Archive: {
    tag: 'Archive Focus',
    title: 'Collectors Saving Sharp Classics',
    image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/63AKWZN3SG6NK7PV7HABKPGKBY.jpg',
  },
  Y2K: {
    tag: 'Y2K Selects',
    title: 'Gloss, Contrast, and Throwback Shapes',
    image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/3EM6C87RG55K3MCP8G3CD9V95Z.jpg',
  },
  Office: {
    tag: 'Office Edit',
    title: 'Tailored Uniforms for the Week',
    image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/63AKWZN3SG6NK7PV7HABKPGKBY.jpg',
  },
};

const topBrands = [
  { name: 'Prada', letter: 'P', category: 'All', style: { backgroundColor: '#0D0D0D', color: '#FFFFFF', fontFamily: 'serif' } },
  { name: 'Nike', letter: 'N', category: 'Streetwear', style: { backgroundColor: '#F5F5F5', color: '#0D0D0D', border: '2px solid #EAEAEA', fontWeight: 900 } },
  { name: 'Stüssy', letter: 'S', type: 'text', style: { backgroundColor: '#0D0D0D', color: '#FFFFFF', fontStyle: 'italic', fontFamily: 'serif' } },
  { name: 'Balenciaga', letter: 'B', category: 'Archive', style: { backgroundColor: '#F5F5F5', color: '#0D0D0D', border: '2px solid #EAEAEA', fontWeight: 800 } },
  { name: 'Carhartt', letter: 'C', category: 'Streetwear', style: { backgroundColor: '#B38645', color: '#FFFFFF', fontWeight: 900 } },
  { name: 'Miu Miu', letter: 'M', category: 'Y2K', style: { backgroundColor: '#F3E4EB', color: '#0D0D0D', border: '2px solid #E7D6DE', fontWeight: 800 } },
  { name: 'Acne', letter: 'A', category: 'Office', style: { backgroundColor: '#CDB38D', color: '#FFFFFF', fontWeight: 900 } }
];

const featuredCurators = [
  { name: 'Elena R.', category: 'Streetwear', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0TK6E061QN92FS4WCMBFZ6T84Q.jpg' },
  { name: 'Sam T.', category: 'All', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/464X8926HVCK2WWBTR75HE6K0D.jpg' },
  { name: 'Marcus V.', category: 'Office', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/6AFQP7ZDH931DK59DMCZFB3033.jpg' },
  { name: 'Sofia D.', category: 'Archive', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/3JW400Y7PDBHDZMA98TXK3BH13.jpg' },
  { name: 'David L.', category: 'Streetwear', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/28AFFD2V1Q4A2G0TXPD524ZYHX.jpg' },
  { name: 'Maya P.', category: 'Y2K', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0TK6E061QN92FS4WCMBFZ6T84Q.jpg' },
  { name: 'Theo K.', category: 'Office', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/464X8926HVCK2WWBTR75HE6K0D.jpg' }
];

const trendingOutfits = [
  { title: 'Street Style', category: 'Streetwear', bg: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%), #888888' },
  { title: 'Office Core', category: 'Office', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/63AKWZN3SG6NK7PV7HABKPGKBY.jpg' },
  { title: 'Evening Wear', category: 'Y2K', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/3EM6C87RG55K3MCP8G3CD9V95Z.jpg' }
];

const inboxItems = [
  {
    id: 1,
    title: 'New today',
    items: [
      { id: 'n1', type: 'follow', name: 'Emma Rose', action: 'started following you.', time: '2 hours ago', avatar: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/464X8926HVCK2WWBTR75HE6K0D.jpg', hasButton: true },
      { id: 'n2', type: 'save', name: 'Liam_O and 4 others', action: 'saved your Utility Jacket to their Wardrobe.', time: '5 hours ago', avatar: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/6AFQP7ZDH931DK59DMCZFB3033.jpg', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/665YP1TGMBQ3MGX5VMRNN1785H.jpg' },
      { id: 'n3', type: 'stat', name: 'System', action: 'Your curated cluster "Autumn Core" reached 1k saves!', time: 'Yesterday', avatar: 'star', image: null }
    ]
  },
  {
    id: 2,
    title: 'This week',
    items: [
      { id: 'n4', type: 'cluster', name: 'Sarah Chen', action: 'curated a new cluster "Minimalist Essentials" matching your style profile.', time: 'Tuesday', avatar: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/0TK6E061QN92FS4WCMBFZ6T84Q.jpg', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/63AKWZN3SG6NK7PV7HABKPGKBY.jpg' },
      { id: 'n5', type: 'wishlist', name: 'David Mills', action: 'added your item to his cluster Wishlist 2026.', time: 'Monday', avatar: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/28AFFD2V1Q4A2G0TXPD524ZYHX.jpg', image: 'https://app.paper.design/file-assets/01KPAP3TXNQJ89SHJ3P0WDMA3F/3EM6C87RG55K3MCP8G3CD9V95Z.jpg' }
    ]
  }
];

function InboxScreen({ activeScreen }) {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <main id="inbox-screen" className={`screen${activeScreen === 'inbox' ? ' active' : ''}`} data-tab="inbox">
      <div className="inbox-container">
        <header className="inbox-header">
          <h1 className="inbox-title">Updates</h1>
          <div className="inbox-tabs">
            {['All', 'Saves', 'Follows'].map(tab => (
              <button key={tab} className={`inbox-tab-chip ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
        </header>

        <section className="inbox-scroll">
          {inboxItems.map(section => (
            <div key={section.id} className="inbox-section">
              <h2 className="inbox-section-title">{section.title}</h2>
              <div className="inbox-list">
                {section.items.map(item => (
                  <div key={item.id} className="inbox-row">
                    <div className={`inbox-avatar ${item.avatar === 'star' ? 'star-avatar' : ''}`}>
                      {item.avatar === 'star' ? <span className="icon">★</span> : <img src={item.avatar} alt="" />}
                    </div>
                    <div className="inbox-content-text">
                      <div className="inbox-action-line">
                        <span className="name">{item.name}</span> {item.action}
                      </div>
                      <div className="inbox-time-code">{item.time}</div>
                    </div>
                    <div className="inbox-meta-col">
                      {item.hasButton && <button className="inbox-follow-btn">Follow</button>}
                      {item.image && <div className="inbox-thumbnail" style={{ backgroundImage: `url(${item.image})` }}></div>}
                      {!item.hasButton && !item.image && <div className="inbox-placeholder-meta"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}


function ExploreScreen({ activeScreen }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroContent = exploreHeroByCategory[activeCategory] ?? exploreHeroByCategory.All;
  const filteredBrands = activeCategory === 'All'
    ? topBrands
    : topBrands.filter((brand) => brand.category === activeCategory);
  const filteredCurators = activeCategory === 'All'
    ? featuredCurators
    : featuredCurators.filter((curator) => curator.category === activeCategory);
  const filteredOutfitsBase = activeCategory === 'All'
    ? trendingOutfits
    : trendingOutfits.filter((outfit) => outfit.category === activeCategory);
  const filteredOutfits = filteredOutfitsBase.length > 0 ? filteredOutfitsBase : trendingOutfits;

  return (
    <main id="explore-screen" className={`screen${activeScreen === 'explore' ? ' active' : ''}`} data-tab="explore">
      <div className="explore-container">
        
        <div className="explore-top-search">
          <div className="search-input-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="search-input-placeholder">Search styles, creators, brands...</span>
            <div className="search-input-icon"></div>
          </div>
        </div>

        <div className="explore-content">
          <div className="explore-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%), url(${heroContent.image})` }}>
            <div className="explore-hero-tag">{heroContent.tag}</div>
            <div className="explore-hero-title">{heroContent.title}</div>
          </div>

          <div className="horizontal-scroll-container">
            {exploreCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="explore-section">
            <div className="explore-section-header">
              <div className="explore-section-title">Top Brands</div>
              <div className="explore-section-action">See All</div>
            </div>
            <div className="horizontal-scroll-container">
              {filteredBrands.map((brand, idx) => (
                <div key={idx} className="circle-item">
                  <div className="circle-avatar" style={brand.style}>
                    {brand.letter}
                  </div>
                  <div className="circle-name">{brand.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="explore-section">
            <div className="explore-section-header">
              <div className="explore-section-title">Featured Curators</div>
              <div className="explore-section-action">See All</div>
            </div>
            <div className="horizontal-scroll-container">
              {filteredCurators.map((curator, idx) => (
                <div key={idx} className="circle-item">
                  <div className="circle-avatar" style={{ backgroundImage: `url(${curator.image})` }}></div>
                  <div className="circle-name">{curator.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="explore-section">
            <div className="explore-section-header">
              <div className="explore-section-title">Trending Outfits</div>
              <div className="explore-section-action">See All</div>
            </div>
            <div className="horizontal-scroll-container pb-xl">
              {filteredOutfits.map((outfit, idx) => (
                <div key={idx} className="trending-outfit-card" style={ outfit.image ? { backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%), url(${outfit.image})` } : { background: outfit.bg } }>
                  <div className="trending-outfit-title">{outfit.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeDiscoverTab, setActiveDiscoverTab] = useState('featured');
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [globalDial, setGlobalDial] = useState({ radius: 20, gutter: 16, appScale: 1 });
  const screenHistoryRef = useRef(['home']);

  const syncAnnotations = (annotations) => {
    fetch(AGENTATION_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(annotations),
    }).catch(() => {});
  };

  const activeScreenMeta = useMemo(
    () => screens.find((screen) => screen.id === activeScreen) ?? screens[0],
    [activeScreen],
  );

  const handleScreenChange = (nextScreen) => {
    if (nextScreen === activeScreen) return;
    screenHistoryRef.current.push(nextScreen);
    setActiveScreen(nextScreen);
  };

  return (
    <>
      <div className="device-presentation">
        <div className="iphone-frame" aria-hidden="true">
          <div className="iphone-frame-camera" />
          <div className="iphone-frame-buttons iphone-frame-buttons--left">
            <span />
            <span />
            <span />
          </div>
          <div className="iphone-frame-buttons iphone-frame-buttons--right">
            <span />
          </div>
          <div className="iphone-frame-bezel">
            <div id="app-container" data-active-screen={activeScreenMeta.id}>
              <DiscoverScreen
                activeDiscoverTab={activeDiscoverTab}
                onDiscoverTabChange={setActiveDiscoverTab}
                activeScreen={activeScreen}
              />

              <ExploreScreen activeScreen={activeScreen} />

              <StudioScreen activeScreen={activeScreen} />

              <InboxScreen activeScreen={activeScreen} />

              <ProfileScreen activeScreen={activeScreen} />

              <AppStatusBar />
              <AppBottomNav activeScreen={activeScreen} onScreenChange={handleScreenChange} />
            </div>
            <div className="iphone-home-indicator" />
          </div>
        </div>
      </div>

      <div id="agentation-root">
        <Suspense fallback={null}>
          <Agentation
            webhookUrl={AGENTATION_SYNC_URL}
            onAnnotationAdd={() => syncAnnotations(loadAnnotations(window.location.pathname))}
            onAnnotationUpdate={() => syncAnnotations(loadAnnotations(window.location.pathname))}
            onAnnotationDelete={() => syncAnnotations(loadAnnotations(window.location.pathname))}
            onAnnotationsClear={() => syncAnnotations([])}
          />
        </Suspense>
      </div>
      <DialRoot position="bottom-left" defaultOpen={false} />
    </>
  );
}

export default App;
