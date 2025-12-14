# CLAUDE.md

This file helps Claude Code understand the Push! card game project.

## What is Push!?

Push! is an awesome card game invented by a kid! Play against the computer or challenge other players online. The goal is simple: **get rid of all your cards first to win!**

## How to Play

### Getting Started
- Each player gets 26 cards from a regular deck (no Jokers!)
- There are piles in the middle where you play your cards (2, 3, or 4 piles - you pick!)
- Players take turns - you go, then your opponent, back and forth

### On Your Turn
1. Your card is drawn automatically
2. Click any pile to play your card there
3. Then it's your opponent's turn!

### The Fun Part: Special Cards!

The face cards (Jack, Queen, King, Ace) are **special cards** - they start a countdown!

| Special Card | Number Cards Needed |
|--------------|---------------------|
| Ace | 4 number cards |
| King | 3 number cards |
| Queen | 2 number cards |
| Jack | 1 number card |

**Here's the twist:** When you play the LAST number card to finish a countdown, your opponent has to take the whole pile! That's called a **PUSH!**

### Tricky Moves

**Special card on special card?** Oops! You have to take the pile yourself... UNLESS:
- **Jack on Jack** = Your opponent takes the pile instead! (This rule can be turned on/off in Settings)

**Special card on a number card?** Starts a brand new countdown - the old special card doesn't matter anymore!

## Settings (Gear Icon)

| Setting | What It Does |
|---------|--------------|
| Number of Piles | Play with 2, 3, or 4 piles (default: 3) |
| Jack-on-Jack Rule | ON = Jack on Jack pushes to opponent. OFF = you take the pile like normal |
| Skill Level | How smart the computer plays: Kid (random), Fun (basic strategy), Expert (super smart!) |
| Hints and Tips | Shows fun messages during exciting moments like "Watch out!" |

Settings are saved so they're still there next time you play!

## Pick Your Look! (Paint Palette Icon)

Tons of cool themes to choose from:

| Theme Type | What's Inside |
|------------|---------------|
| Colors | 16 pretty color combos (Sunset Orange, Ocean Blue, and more!) |
| Fun | 4 wacky themes that change the card symbols! (Bananas, Unicorns, Space, Instruments) |
| Months | 12 seasonal themes for every month |
| Holidays | 8 special holiday themes (Christmas, Halloween, etc.) |

The game even suggests themes based on the current month or upcoming holidays!

### Fun Theme Card Symbols
- **Bananas**: 🍌 🍋 🥥 🌴
- **Unicorns**: 💖 ⭐ 🌙 ✨
- **Space Adventure**: 🌟 🪐 🛸 🌌
- **Instruments**: 🎸 🎹 🎺 🥁

## Play with Friends Online!

### Getting a Name
First time playing? Pick a fun name by combining an adjective + noun (like "HappyPanda" or "SneakyNinja")! Your name is saved so you don't have to pick again.

### Finding Players
1. Click **New Game**
2. Choose **Players** (the 👥 button)
3. See who's online and click someone to invite them!
4. They have 30 seconds to accept

### How It Works
- The person who sends the invite is the "host"
- The host's pile count and Jack-on-Jack settings are used for both players
- Moves sync instantly - no waiting!
- A winner screen shows up for both players when the game ends

### Share the Game!
Click the QR code button (under the ?) to show a big QR code. Friends can scan it to find the game!

## Computer Difficulty Levels

### Kid Mode
The computer plays randomly - great for learning!

### Fun Mode
The computer uses basic strategy:
- Tries not to play special cards on special cards
- Looks for chances to push

### Expert Mode
The computer is REALLY smart! It:
1. Always plays Jack on Jack when it can (if the rule is on)
2. Finishes pushes to make you take piles
3. Plays defensively when all piles are dangerous
4. Thinks about whether it's winning or losing to decide how risky to play

## Project Files

```
index.html  - The game's structure
styles.css  - How everything looks (colors, animations, etc.)
game.js     - The brain of the game (rules, AI, online play)
```

## Technical Stuff (For Developers)

### Turn System
- `currentTurnPlayer` tracks whose turn it is
- `switchTurn()` switches players after EVERY move
- Turns always alternate no matter what happens (even after someone takes a pile)

### Online Play Uses Firebase
- Players are tracked in `users/`
- Games are stored in `games/`
- Invites go through `invites/`
- Everything syncs in real-time!

### Cookies Stored
| Cookie | What It's For |
|--------|---------------|
| `pushUserId` | Your unique player ID |
| `pushUsername` | Your display name |

### Settings Storage
All settings save to localStorage so they persist between visits.

## Live Site

Play now at: **https://kyleighscards.github.io/push/**
