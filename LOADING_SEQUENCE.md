# Push! Loading Sequence Documentation

This document details all paths from page load to playing the game, with potential issues highlighted.

---

## Overview Timeline

```
T+0ms      → Page loads, DOMContentLoaded fires
T+0ms      → PushGame constructor runs
T+0-100ms  → Settings/theme loaded, event listeners set up
T+1000ms   → Theme suggestion may appear (if no saved theme)
T+1750ms   → Loading screen starts fading
T+2750ms   → Loading screen gone, mode selection appears
```

---

## Stage 1: Page Load

**Initial State (index.html):**
- Loading modal starts visible: `<div class="modal show" id="loading-modal">`
- All other modals hidden
- Firebase SDK loads before game.js

---

## Stage 2: DOMContentLoaded

**File:** `game.js` lines 3076-3110

```
DOMContentLoaded fires
    ↓
window.game = new PushGame()
    ↓
Check: hasUsername?
    ↓
YES → Schedule mode-modal for after loading screen
NO  → Show username-modal immediately
    ↓
Start loading screen fade timer (T+1750ms)
```

---

## Stage 3: PushGame Constructor

**File:** `game.js` lines 1276-1324

1. Initialize game state (cards, piles, settings defaults)
2. `loadSettings()` - Load from localStorage
3. `loadTheme()` - Load from localStorage OR schedule theme suggestion
4. `initializeEventListeners()` - Set up all button handlers
5. `initializeMultiplayer()` - Create MultiplayerManager

---

## Stage 4: MultiplayerManager Setup

**File:** `game.js` lines 772-799

```
MultiplayerManager constructor
    ↓
initializeUser()
    ↓
Check cookies: pushUserId, pushUsername
    ↓
FOUND → goOnline() [⚠️ NOT AWAITED - see Issue #1]
NOT FOUND → Early exit (new user)
```

---

## Path A: New User (First Visit)

```
1. No cookies found
2. Username modal appears
3. Loading screen fades (T+2750ms)
4. User picks adjective + noun
5. Click "Let's Play!" or "Random Name"
    ↓
6. submitUsername() runs
    ↓
7. Check for theme suggestion based on name
    ↓
   IF theme suggested → Show name-theme-modal
   ELSE → completeUsernameSubmission()
    ↓
8. Save username to cookies and Firebase
9. Mode selection modal appears
10. User picks Computer or Players
```

---

## Path B: Returning User (Cookies Exist)

```
1. Cookies found (pushUserId, pushUsername)
2. goOnline() starts [⚠️ async, not awaited]
3. hasUsername() checked immediately
4. Loading screen fades (T+2750ms)
5. Mode selection modal appears
6. User picks Computer or Players
```

---

## Path C: Play vs Computer

```
1. User clicks "Computer" button
2. Mode modal hides
3. startNewGame() runs:
   - Create and shuffle deck
   - Split 26 cards each
   - Initialize piles based on settings
   - Render game board
   - Auto-draw first card (T+300ms delay)
4. Game ready to play!
```

---

## Path D: Play vs Players (Multiplayer)

### Sending an Invite

```
1. User clicks "Players" button
2. showLobby() runs
3. getOnlinePlayers() fetches player list
4. User clicks a player name
5. sendInvite(targetUserId) runs:
   - Create invite in Firebase
   - Show waiting modal
   - Start 30-second timeout
   - Listen for response
    ↓
6. Target accepts → createGame() as host
   Target declines → Alert shown, return to lobby
   Timeout → Alert "Invite expired"
```

### Receiving an Invite

```
1. listenForInvites() running in background
2. Invite received → showInvite() runs
3. Invite modal appears with 30-second countdown
4. User clicks Accept:
   - acceptInvite() runs
   - Update invite status to "accepted"
   - waitForGame() listens for host's game
    ↓
5. Host creates game → joinGame() runs
6. Both players now in game!
```

---

## Settings Sync (Multiplayer)

When joining a multiplayer game:
- Host's `pileCount` and `jackOnJack` settings are applied to guest
- Guest's settings UI is updated to match
- Both players use identical rules

---

# ⚠️ POTENTIAL ISSUES

## Issue #1: Race Condition in initializeUser() [CRITICAL]

**Location:** `game.js` line 797

```javascript
this.goOnline();  // NOT AWAITED!
```

**Problem:**
- `goOnline()` is async but not awaited
- `hasUsername()` is checked immediately after
- For returning users, goOnline() might not complete before the check

**Impact:**
- Returning user might see username modal again
- Firebase listeners might not be set up when expected

**Suggested Fix:**
```javascript
await this.goOnline();
```

---

## Issue #2: Modal Overlap at T+1000ms [HIGH]

**Problem:**
- Theme suggestion scheduled at T+1000ms (if no saved theme)
- Loading screen doesn't hide until T+2750ms
- Mode modal appears at T+2750ms
- Theme suggestion modal could overlap with either

**Timeline Conflict:**
```
T+1000ms: Theme suggestion appears (z-index: 1000)
T+2750ms: Mode modal appears (z-index: 1000)
RESULT: Both visible, same z-index!
```

**Suggested Fix:**
- Delay theme suggestion until after loading screen (T+3000ms+)
- Or use different z-index values

---

## Issue #3: completeUsernameSubmission() Not Awaited [HIGH]

**Location:** `game.js` lines 1345-1358

```javascript
document.getElementById('accept-name-theme-btn').addEventListener('click', () => {
    // ... theme applied ...
    this.completeUsernameSubmission();  // ASYNC - NOT AWAITED!
});
```

**Problem:**
- Function is async but called without await
- Modal closes immediately
- Firebase save might not complete
- Mode modal appears before username saved

**Impact:**
- Username might not be saved to Firebase
- Multiplayer features could fail

**Suggested Fix:**
```javascript
document.getElementById('accept-name-theme-btn').addEventListener('click', async () => {
    // ... theme applied ...
    await this.completeUsernameSubmission();
});
```

---

## Issue #4: Invite Timeout Still Fires After Accept [MEDIUM]

**Location:** `game.js` lines 1002-1009

**Problem:**
- 30-second setTimeout created when invite sent
- If accepted at T+29s, createGame() starts
- At T+30s, timeout still fires
- Checks status !== 'pending' so doesn't break, but wasteful

**Impact:**
- Unnecessary Firebase read after game already started
- Could cause confusion in edge cases

**Suggested Fix:**
- Store timeout ID and clearTimeout() on accept/decline

---

## Issue #5: Settings Changes Not Immediately Applied [MEDIUM]

**Problem:**
- Settings loaded from localStorage in constructor
- User can change settings in modal
- New game uses cached settings, not current UI values

**Scenario:**
1. Game loads with pileCount: 3
2. User changes to 4 piles in settings
3. User clicks New Game
4. Game might still use 3 piles!

**Suggested Fix:**
- Read settings from UI elements when starting new game
- Or save settings to localStorage on every change (already done, but reload needed)

---

## Issue #6: No Firebase Error Feedback [MEDIUM]

**Location:** `game.js` line 753

```javascript
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} catch (e) {
    console.log('Firebase initialization failed:', e);
    // No UI feedback!
}
```

**Problem:**
- Firebase failure only logged to console
- User sees no error message
- Multiplayer silently broken

**Suggested Fix:**
- Show error toast or disable multiplayer button with message

---

## Issue #7: Event Listener Cleanup [LOW]

**Problem:**
- Multiple invites can create multiple Firebase listeners
- Old listeners from failed/expired invites might persist
- Memory leak over long sessions

**Suggested Fix:**
- Track all listeners and clean up on invite cancel/timeout

---

## Issue #8: localStorage Corruption [LOW]

**Problem:**
- No validation of localStorage values
- Malformed JSON causes silent fallback to defaults
- User loses settings without knowing why

**Suggested Fix:**
- Validate parsed values against expected types
- Show message if settings were reset

---

# Modal Z-Index Reference

All modals use z-index: 1000 except:
- Win modal: Higher (to appear over game)
- Loading modal: Same level

**Risk:** Multiple modals can stack unpredictably when shown simultaneously.

---

# Cookie Reference

| Cookie | Purpose | Set In | Read In |
|--------|---------|--------|---------|
| pushUserId | Firebase user ID | setUsername() | initializeUser() |
| pushUsername | Display name | setUsername() | initializeUser() |

Both cookies required - if one missing, treated as new user.

---

# localStorage Reference

| Key | Purpose | Default |
|-----|---------|---------|
| pushGameSettings | Pile count, Jack-on-Jack, Skill, Hints | See defaults in constructor |
| pushGameTheme | Current theme set and ID | forest-deep |

---

# Summary

**Most Likely Problems:**
1. **Race condition in goOnline()** - Returning users might see username modal
2. **Modal overlap** - Theme suggestion vs mode selection timing
3. **Missing await** - Username might not save before proceeding

**To Test:**
1. Clear cookies and localStorage, reload - verify new user flow
2. With existing cookies, reload quickly - check for username modal flash
3. With no saved theme, watch for modal overlap at ~1-3 seconds
4. Send invite, have it accepted at 29 seconds - check for double alerts
