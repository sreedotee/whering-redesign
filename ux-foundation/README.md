# UX & Motion Foundation
**Project**: Whering Redesign
**Source**: Atelia Prototype

This folder contains the "tweaked" physics and measurements that provide the premium app feel. **Colors have been intentionally excluded** to allow for a fresh design system while maintaining established mechanics.

## Contents

- `motion.css`: Timing functions (cubic-beziers), spring scales for buttons, and 3D transition logic.
- `mechanics.js`: JavaScript helpers for iOS-style edge swipe-back, tab indicator sliding, and interaction management.
- `layout.css`: The Phone Shell container and responsive scaling logic for different desktop heights.

## Implementation Tips

1. **The Tactile Feel**: Apply `.tap-tactile` to buttons and `.card-tactile` to cards. Avoid using normal `:active` styles.
2. **The Drawer**: Use the `.drawer-container` and `.drawer-sheet` classes for bottom sheets. They use `translate3d` and `var(--ease-drawer)` for a native-mobile feel.
3. **Hardware Acceleration**: All transitions use `translate3d(0,0,0)` to ensure they remain smooth even with heavy image content.

## Key Performance Token
Use `var(--ease-spring)` for any "pop" or "success" state. It has a subtle overshoot tuned for fashion-consumer apps.
