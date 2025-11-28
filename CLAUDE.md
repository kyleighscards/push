# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Push! is a card game invented by a young girl. This project is a web-based implementation where players can play against an AI opponent.

## Game Rules

### Setup
- Two players split a standard 52-card deck (26 cards each, no Jokers)
- Three shared piles in the middle for playing cards
- Goal: Be the first to get rid of all your cards

### Gameplay
- Players **strictly alternate turns** - one player, then the other, regardless of what happens
- On your turn, draw a card from your deck and play it on any of the 3 piles
- After ANY play, the turn passes to the other player
- The game tracks `currentTurnPlayer` and simply switches after each action
- Push outcomes (who takes a pile) do NOT affect turn order - turns always alternate

### Special Cards and Push Mechanics
Special cards (J, Q, K, A) trigger a "push" countdown. When a special card is played, a total number of **number cards** (from either player) must be played on that pile:

- **Ace**: 4 number cards to complete the push
- **King**: 3 number cards to complete the push
- **Queen**: 2 number cards to complete the push
- **Jack**: 1 number card to complete the push

**Important**: The count is the TOTAL number cards played by BOTH players combined, not per-player.

**When the push completes**: The player who plays the final number card (completes the push) forces their **OPPONENT** to take the pile. So if YOU complete the push, the Opponent takes the pile. If the Opponent completes the push, YOU take the pile. Either way, turns then alternate to the other player.

### Special Card on Special Card Rules (All trigger PUSH! animation)
1. Playing a special card directly on another special card = YOU take the pile (penalty)
2. **Exception** (if Jack-on-Jack rule enabled): Jack on Jack = your OPPONENT takes the pile (reverse penalty)
3. Playing a special card on a number card starts a new push count (previous special card no longer matters)

**Turn order is simple**: After ANY play, it becomes the other player's turn. Period.

## Settings

The game includes a Settings page accessible via a gear icon button. Settings are saved to localStorage and persist across sessions.

### Available Settings

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Number of Piles | 2, 3, or 4 | 3 | Changes the number of discard piles in the middle of the game board |
| Jack-on-Jack Rule | On/Off | On | When ON: Jacks played on a Jack push to the other player (reverse penalty). When OFF: Jacks on Jack are treated like any other special card on special card (you take the pile) |

### Implementation Notes
- Settings changes take effect on the next new game
- `game.settings` object stores current settings
- `loadSettings()` loads from localStorage on startup
- `saveSettings()` persists to localStorage when changed
- Number of piles affects: pile array initialization, HTML rendering, AI pile selection

## Themes

The game includes a comprehensive theming system accessible via the "Theme" button. Themes are organized into 4 sets and saved to localStorage.

### Theme Sets

| Set | Count | Description |
|-----|-------|-------------|
| Color | 16 | Background color gradients (Sunset Orange, Ocean Blue, etc.) |
| Fun | 4 | Creative themes with custom suit symbols (Bananas, Unicorns, Space Adventure, Instruments) |
| Month | 12 | Seasonal themes for each month |
| Holiday | 8 | Holiday-specific themes (Christmas, Halloween, etc.) |

### Fun Theme Suit Symbols
Fun themes replace standard suit symbols with themed emojis:
- **Bananas**: 🍌 🍋 🥥 🌴
- **Unicorns**: 💖 ⭐ 🌙 ✨
- **Space Adventure**: 🌟 🪐 🛸 🌌
- **Instruments**: 🎸 🎹 🎺 🥁

### Auto-Detection
On startup, the game suggests seasonal themes:
- Detects current month and upcoming holidays
- Shows suggestion popup: "🎄 It's December! Try the Christmas theme?"
- User can accept or dismiss; respects saved preferences

### Implementation Notes
- Themes stored in `THEMES` constant object
- `applyTheme(set, themeId)` applies CSS variables to `:root`
- `autoDetectTheme()` checks month/holiday dates
- Theme preference saved to localStorage key `pushGameTheme`
- Card readability maintained: white/light card faces, high-contrast text

## Project Structure

```
index.html  - Game layout and structure
styles.css  - Visual styling, card designs, animations
game.js     - Game logic, AI opponent, state management
```

## Development

Static web project - open `index.html` directly in a browser. No build system required.

## Deployment

See [DEPLOY.md](DEPLOY.md) for instructions on deploying to GitHub Pages.

**Live site:** https://kyleighscards.github.io/push/

## Current Features

- Auto-start game on page load
- Auto-draw cards on player's turn (no Draw Card button needed)
- "Play Again" button for new rounds
- **Card play animation** - cards fly from hand/deck to the target pile
- **Push! popup animation** - shown for ALL pushes:
  - When number card count is reached on a special card
  - When special card is played on special card (penalty)
  - When Jack is played on Jack (reverse penalty)
- **Card-by-card flying animation** when taking piles (with incrementing card count) - used for ALL push scenarios
- **Strictly alternating turns** - tracks `currentTurnPlayer` and uses `switchTurn()` method after ANY action
- AI opponent with basic strategy
- Visual card designs with suit symbols
- Responsive layout

## Skill Level

A setting in the Settings modal with three AI difficulty options. Default: Expert.

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Skill Level | Kid, Fun, Expert | Expert | Controls AI opponent difficulty |

### Kid Skill
Plays cards completely at random on any pile.

### Fun Skill
Uses basic strategy (the original AI logic):
- Avoids playing special cards on special cards
- Tries to complete pushes when possible
- Plays Jack on Jack when advantageous

### Expert Skill
Applies rules in priority order. The rule number is shown in the status message.

**Scoring System** (used for pile evaluation):
| Card | Points |
|------|--------|
| Jack | 10 |
| King | 5 |
| Ace | 2 |
| Queen | 2 |
| Number (2-10) | 1 |

**Rules (evaluated in order):**

| Rule | Condition | Action |
|------|-----------|--------|
| #1 | Jack-on-Jack setting ON, AI has Jack, pile has Jack on top | Play Jack on Jack |
| #2 | AI has number card, can complete push (1 card needed) | Push pile with highest score |
| #3 | AI has number card AND all piles need exactly 2 cards, OR AI has Jack AND pile has number on top | Play on pile with lowest score |
| #4 | AI has number card, no other rule applies | Play on pile with most cards |
| #5 | AI has special card, no other rule applies | If losing: reset largest pile. If winning: use empty pile or reset smallest |
| #6 | Fallback | Use Fun Skill logic |

**Rule Details:**
- "Reset" means playing a special card on top of a number card to start a new push sequence
- Rule #3 is defensive: when all piles are dangerous (2 away from pushing), minimize loss
- Rule #5 considers card count: AI plays more aggressively when behind, more conservatively when ahead

## Implementation Details

### Turn Tracking
The game uses a simple turn alternation system:
- `currentTurnPlayer` variable tracks whose turn it is ('player' or 'opponent')
- `switchTurn()` method switches to the other player after any action completes
- This ensures turns ALWAYS alternate regardless of push outcomes or pile takes

### Example Turn Sequence
1. Player plays Jack on Pile 1 → turn switches to Opponent
2. Opponent plays Queen on Pile 1 (special on special) → Opponent takes pile → turn switches to Player
3. Player plays next card → turn switches to Opponent
4. And so on...
