# Sound Effects Implementation

All sounds are generated using the Web Audio API - no external sound files needed!

## Sounds Implemented

| Event | Sound | Description |
|-------|-------|-------------|
| Logo fade | `playLogoFade()` | Gentle ascending chime (C-E-G chord) |
| JACKED! popup | `playJacked()` | Dramatic descending tones (horn-like) |
| PUSH! popup | `playPush()` | Exciting ascending fanfare |
| Card pile take | `playShuffle()` | Filtered noise shuffle sound |
| Each card flying | `playCardFlip()` | Short percussive click |
| Player plays card | `playCardPlay()` | Soft subtle tone (600Hz, very quiet) |
| Opponent plays card | `playOpponentCard()` | Even softer tone (500Hz, barely audible) |
| Watch out! | `playWatchOut()` | Quick alert beeps (two rising tones) |
| UI click | `playClick()` | Simple UI click sound |
| New Game button | `playClick()` | Simple UI click sound |
| Mode selection | `playClick()` | Simple UI click sound |
| You Win! | `playWin()` | Happy ascending arpeggio |
| You Lose! | `playLose()` | Sad descending tones |

## Technical Details

- Uses Web Audio API for cross-browser compatibility
- Audio context initialized on first user interaction (browser autoplay policy)
- Sounds generated programmatically using oscillators and noise buffers
- No external audio files required
- `soundManager` global instance handles all sounds

## SoundManager Class

```javascript
soundManager.init()           // Initialize audio context
soundManager.playClick()      // UI click
soundManager.playCardPlay()   // Player plays a card (soft)
soundManager.playOpponentCard() // Opponent plays (even softer)
soundManager.playLogoFade()   // Logo transition
soundManager.playJacked()     // JACKED! moment
soundManager.playPush()       // PUSH! moment
soundManager.playShuffle()    // Card shuffle
soundManager.playCardFlip()   // Individual card sound
soundManager.playWin()        // Victory sound
soundManager.playLose()       // Defeat sound
soundManager.playWatchOut()   // Warning alert beeps
```
