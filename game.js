// Push! Card Game - JavaScript Implementation

// Theme definitions
const THEMES = {
    color: {
        'forest-deep': {
            name: 'Forest Deep',
            emoji: '🌲',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #1a5f2a 0%, #0d3318 100%)'
            }
        },
        'sunset-orange': {
            name: 'Sunset Orange',
            emoji: '🌅',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                '--gold': '#ffffff',
                '--push-shadow': '#ff4500'
            }
        },
        'hot-pink': {
            name: 'Hot Pink',
            emoji: '💗',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)',
                '--gold': '#ffffff',
                '--push-shadow': '#c71585'
            }
        },
        'coral-dream': {
            name: 'Coral Dream',
            emoji: '🪸',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff7f7f 0%, #ffb6c1 100%)',
                '--gold': '#8b0000'
            }
        },
        'golden-glow': {
            name: 'Golden Glow',
            emoji: '✨',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
                '--gold': '#8b4513',
                '--push-color': '#8b4513'
            }
        },
        'ocean-blue': {
            name: 'Ocean Blue',
            emoji: '🌊',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
                '--gold': '#ffd700'
            }
        },
        'mint-fresh': {
            name: 'Mint Fresh',
            emoji: '🍃',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #2ecc71 0%, #00d4aa 100%)',
                '--gold': '#ffffff'
            }
        },
        'royal-purple': {
            name: 'Royal Purple',
            emoji: '👑',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #7b68ee 0%, #9b59b6 100%)',
                '--gold': '#ffd700'
            }
        },
        'teal-tide': {
            name: 'Teal Tide',
            emoji: '🐚',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #008080 0%, #20b2aa 100%)',
                '--gold': '#ffd700'
            }
        },
        'bubblegum': {
            name: 'Bubblegum',
            emoji: '🫧',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff77ff 0%, #ffb6ff 100%)',
                '--gold': '#4b0082'
            }
        },
        'sky-blue': {
            name: 'Sky Blue',
            emoji: '☁️',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%)',
                '--gold': '#4169e1'
            }
        },
        'lavender-love': {
            name: 'Lavender Love',
            emoji: '💜',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #e6e6fa 0%, #dda0dd 100%)',
                '--gold': '#4b0082'
            }
        },
        'peach-perfect': {
            name: 'Peach Perfect',
            emoji: '🍑',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffdab9 0%, #ffe4e1 100%)',
                '--gold': '#8b4513'
            }
        },
        'midnight-magic': {
            name: 'Midnight Magic',
            emoji: '🌙',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #191970 0%, #483d8b 100%)',
                '--gold': '#ffd700'
            }
        },
        'charcoal-chic': {
            name: 'Charcoal Chic',
            emoji: '🖤',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #36454f 0%, #2f4f4f 100%)',
                '--gold': '#ffd700'
            }
        },
        'berry-blast': {
            name: 'Berry Blast',
            emoji: '🫐',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #8b008b 0%, #9932cc 100%)',
                '--gold': '#ffd700'
            }
        }
    },
    fun: {
        'bananas': {
            name: 'Bananas',
            emoji: '🍌',
            cardBackEmoji: '🍌',
            suitSymbols: { hearts: '🍌', diamonds: '🍋', clubs: '🥥', spades: '🌴' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffe135 0%, #ffc72c 100%)',
                '--gold': '#8b4513',
                '--push-color': '#8b4513',
                '--card-back-bg': 'linear-gradient(135deg, #ffe135 0%, #ffd700 100%)',
                '--card-back-border': '3px solid #8b4513'
            }
        },
        'unicorns': {
            name: 'Unicorns',
            emoji: '🦄',
            cardBackEmoji: '🦄',
            suitSymbols: { hearts: '💖', diamonds: '⭐', clubs: '🌙', spades: '✨' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 50%, #a29bfe 100%)',
                '--gold': '#ffffff',
                '--push-color': '#ff69b4',
                '--push-shadow': '#9b59b6',
                '--card-back-bg': 'linear-gradient(135deg, #ff9ff3 0%, #a29bfe 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'space-adventure': {
            name: 'Space Adventure',
            emoji: '🚀',
            cardBackEmoji: '🚀',
            suitSymbols: { hearts: '🌟', diamonds: '🪐', clubs: '🛸', spades: '🌌' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #0a0a20 0%, #1a1a40 50%, #0f0f30 100%)',
                '--gold': '#00ffff',
                '--push-color': '#00ffff',
                '--push-shadow': '#ff00ff',
                '--card-back-bg': 'linear-gradient(135deg, #1a1a40 0%, #0a0a30 100%)',
                '--card-back-border': '3px solid #00ffff',
                '--btn-new-game': 'linear-gradient(135deg, #00ffff, #0088ff)',
                '--btn-rules': 'linear-gradient(135deg, #ff00ff, #8800ff)',
                '--btn-settings': 'linear-gradient(135deg, #00ff88, #00aa44)',
                '--btn-theme': 'linear-gradient(135deg, #ffff00, #ff8800)'
            }
        },
        'instruments': {
            name: 'Instruments',
            emoji: '🎸',
            cardBackEmoji: '🎸',
            suitSymbols: { hearts: '🎸', diamonds: '🎹', clubs: '🎺', spades: '🥁' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
                '--gold': '#d4af37',
                '--push-color': '#d4af37',
                '--card-back-bg': 'linear-gradient(135deg, #722f37 0%, #8b4513 100%)',
                '--card-back-border': '3px solid #d4af37'
            }
        }
    },
    month: {
        'january': {
            name: 'January',
            emoji: '❄️',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
                '--gold': '#4169e1',
                '--push-color': '#4169e1'
            }
        },
        'february': {
            name: 'February',
            emoji: '💕',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)',
                '--gold': '#c71585',
                '--push-color': '#c71585'
            }
        },
        'march': {
            name: 'March',
            emoji: '☘️',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #50c878 0%, #228b22 100%)',
                '--gold': '#ffd700'
            }
        },
        'april': {
            name: 'April',
            emoji: '🌷',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #e6e6fa 0%, #add8e6 100%)',
                '--gold': '#ff69b4'
            }
        },
        'may': {
            name: 'May',
            emoji: '🌸',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffb7c5 0%, #90ee90 100%)',
                '--gold': '#ff1493'
            }
        },
        'june': {
            name: 'June',
            emoji: '☀️',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffeb3b 0%, #ff9800 100%)',
                '--gold': '#ff5722',
                '--push-color': '#ff5722'
            }
        },
        'july': {
            name: 'July',
            emoji: '🏖️',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #00bcd4 0%, #ffe4b5 100%)',
                '--gold': '#ff7f50'
            }
        },
        'august': {
            name: 'August',
            emoji: '🌴',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                '--gold': '#ffffff'
            }
        },
        'september': {
            name: 'September',
            emoji: '📚',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #2f4f4f 0%, #556b2f 100%)',
                '--gold': '#ff0000'
            }
        },
        'october': {
            name: 'October',
            emoji: '🍂',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff8c00 0%, #dc143c 100%)',
                '--gold': '#8b4513'
            }
        },
        'november': {
            name: 'November',
            emoji: '🦃',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #8b4513 0%, #daa520 100%)',
                '--gold': '#ff8c00'
            }
        },
        'december': {
            name: 'December',
            emoji: '🎄',
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #006400 0%, #8b0000 100%)',
                '--gold': '#ffd700'
            }
        }
    },
    holiday: {
        'new-years': {
            name: "New Year's",
            emoji: '🎆',
            cardBackEmoji: '🎆',
            suitSymbols: { hearts: '🎆', diamonds: '🥂', clubs: '🎉', spades: '⭐' },
            dates: { start: '12-30', end: '01-02' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
                '--gold': '#ffd700',
                '--push-color': '#ffd700',
                '--card-back-bg': 'linear-gradient(135deg, #1a1a2e 0%, #000000 100%)',
                '--card-back-border': '3px solid #ffd700'
            }
        },
        'valentines': {
            name: "Valentine's Day",
            emoji: '💝',
            cardBackEmoji: '💝',
            suitSymbols: { hearts: '❤️', diamonds: '💎', clubs: '🌹', spades: '💘' },
            dates: { start: '02-07', end: '02-15' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #c41e3a 0%, #ff69b4 100%)',
                '--gold': '#ffb6c1',
                '--push-color': '#ff1493',
                '--card-back-bg': 'linear-gradient(135deg, #ff69b4 0%, #c41e3a 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'st-patricks': {
            name: "St. Patrick's Day",
            emoji: '🍀',
            cardBackEmoji: '🍀',
            suitSymbols: { hearts: '🍀', diamonds: '🌈', clubs: '☘️', spades: '🪙' },
            dates: { start: '03-14', end: '03-18' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #009b4d 0%, #00563f 100%)',
                '--gold': '#ffd700',
                '--card-back-bg': 'linear-gradient(135deg, #00563f 0%, #003d2e 100%)',
                '--card-back-border': '3px solid #ffd700'
            }
        },
        'easter': {
            name: 'Easter',
            emoji: '🐰',
            cardBackEmoji: '🐰',
            suitSymbols: { hearts: '🐰', diamonds: '🥚', clubs: '🐣', spades: '🌷' },
            dates: { start: '03-15', end: '04-20' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #e6e6fa 0%, #98fb98 100%)',
                '--gold': '#ff69b4',
                '--card-back-bg': 'linear-gradient(135deg, #ffb6c1 0%, #98fb98 100%)',
                '--card-back-border': '3px solid #ff69b4'
            }
        },
        'independence': {
            name: '4th of July',
            emoji: '🎇',
            cardBackEmoji: '🗽',
            suitSymbols: { hearts: '🎆', diamonds: '⭐', clubs: '🗽', spades: '🦅' },
            dates: { start: '07-01', end: '07-05' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #002868 0%, #bf0a30 100%)',
                '--gold': '#ffffff',
                '--card-back-bg': 'linear-gradient(135deg, #002868 0%, #bf0a30 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'halloween': {
            name: 'Halloween',
            emoji: '🎃',
            cardBackEmoji: '🎃',
            suitSymbols: { hearts: '🎃', diamonds: '🍬', clubs: '👻', spades: '🦇' },
            dates: { start: '10-15', end: '11-01' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #4b0082 0%, #ff4500 100%)',
                '--gold': '#ff6b00',
                '--push-color': '#39ff14',
                '--push-shadow': '#ff4500',
                '--card-back-bg': 'linear-gradient(135deg, #4b0082 0%, #000000 100%)',
                '--card-back-border': '3px solid #ff6b00'
            }
        },
        'thanksgiving': {
            name: 'Thanksgiving',
            emoji: '🦃',
            cardBackEmoji: '🦃',
            suitSymbols: { hearts: '🦃', diamonds: '🍂', clubs: '🌽', spades: '🥧' },
            dates: { start: '11-20', end: '11-30' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
                '--gold': '#daa520',
                '--card-back-bg': 'linear-gradient(135deg, #8b4513 0%, #5d3a1a 100%)',
                '--card-back-border': '3px solid #daa520'
            }
        },
        'christmas': {
            name: 'Christmas',
            emoji: '🎄',
            cardBackEmoji: '🎄',
            suitSymbols: { hearts: '🎄', diamonds: '⭐', clubs: '🎁', spades: '❄️' },
            dates: { start: '12-01', end: '12-26' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #165b33 0%, #bb2528 100%)',
                '--gold': '#f8b229',
                '--card-back-bg': 'linear-gradient(135deg, #165b33 0%, #0a3d22 100%)',
                '--card-back-border': '3px solid #f8b229'
            }
        }
    }
};

// Default suit symbols
const DEFAULT_SUIT_SYMBOLS = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
};

class PushGame {
    constructor() {
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.suitSymbols = {
            hearts: '♥',
            diamonds: '♦',
            clubs: '♣',
            spades: '♠'
        };
        this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.specialCards = ['J', 'Q', 'K', 'A'];
        this.pushCounts = { 'A': 4, 'K': 3, 'Q': 2, 'J': 1 };

        // Settings with defaults
        this.settings = {
            pileCount: 3,
            jackOnJack: true
        };

        this.playerDeck = [];
        this.opponentDeck = [];
        this.piles = [];
        this.pileStates = [];
        this.currentCard = null;
        this.isPlayerTurn = true;  // Tracks whose turn it is
        this.currentTurnPlayer = 'player';  // Tracks who is currently playing (for turn alternation)
        this.gameActive = false;

        // Theme state
        this.currentTheme = { set: 'color', id: 'forest-deep' };
        this.themeSuggestionShown = false;

        this.loadSettings();
        this.loadTheme();
        this.initializeEventListeners();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('pushGameSettings');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
            }
        } catch (e) {
            console.log('Could not load settings, using defaults');
        }

        // Update UI to reflect loaded settings
        this.updateSettingsUI();
    }

    saveSettings() {
        try {
            localStorage.setItem('pushGameSettings', JSON.stringify(this.settings));
        } catch (e) {
            console.log('Could not save settings');
        }
    }

    updateSettingsUI() {
        const pileCountSelect = document.getElementById('pile-count');
        const jackOnJackToggle = document.getElementById('jack-on-jack');

        if (pileCountSelect) {
            pileCountSelect.value = this.settings.pileCount.toString();
        }
        if (jackOnJackToggle) {
            jackOnJackToggle.checked = this.settings.jackOnJack;
        }
    }

    // Theme methods
    loadTheme() {
        try {
            const saved = localStorage.getItem('pushGameTheme');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.currentTheme = parsed;
                this.applyTheme(parsed.set, parsed.id);
            } else {
                // Check for auto-detect suggestion
                this.checkThemeSuggestion();
            }
        } catch (e) {
            console.log('Could not load theme, using default');
        }
    }

    saveTheme() {
        try {
            localStorage.setItem('pushGameTheme', JSON.stringify(this.currentTheme));
        } catch (e) {
            console.log('Could not save theme');
        }
    }

    applyTheme(setId, themeId) {
        const set = THEMES[setId];
        if (!set) return false;

        const theme = set[themeId];
        if (!theme) return false;

        // Apply CSS variables
        const root = document.documentElement;

        // First reset to defaults
        this.resetThemeVars();

        // Apply theme-specific variables
        for (const [variable, value] of Object.entries(theme.vars || {})) {
            root.style.setProperty(variable, value);
        }

        // Update suit symbols for Fun themes
        if (theme.suitSymbols) {
            this.suitSymbols = { ...theme.suitSymbols };
        } else {
            this.suitSymbols = { ...DEFAULT_SUIT_SYMBOLS };
        }

        // Update card back emoji
        this.updateCardBackEmoji(theme.cardBackEmoji || '🃏');

        // Store current theme
        this.currentTheme = { set: setId, id: themeId };
        this.saveTheme();

        // Update any rendered cards if game is active
        if (this.gameActive) {
            this.renderPiles();
            this.renderCurrentCard();
        }

        return true;
    }

    resetThemeVars() {
        const root = document.documentElement;
        // Reset to default values
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1a5f2a 0%, #0d3318 100%)');
        root.style.setProperty('--gold', '#f1c40f');
        root.style.setProperty('--push-color', 'var(--gold)');
        root.style.setProperty('--push-shadow', '#e74c3c');
        root.style.setProperty('--card-back-bg', 'linear-gradient(135deg, #3498db 0%, #2980b9 50%, #1a5276 100%)');
        root.style.setProperty('--card-back-border', '3px solid var(--gold)');
        root.style.setProperty('--btn-new-game', 'linear-gradient(135deg, #27ae60, #2ecc71)');
        root.style.setProperty('--btn-rules', 'linear-gradient(135deg, #3498db, #2980b9)');
        root.style.setProperty('--btn-settings', 'linear-gradient(135deg, #9b59b6, #8e44ad)');
        root.style.setProperty('--btn-theme', 'linear-gradient(135deg, #e67e22, #d35400)');
    }

    updateCardBackEmoji(emoji) {
        // Update CSS for card back emoji
        const style = document.getElementById('theme-card-back-style') || document.createElement('style');
        style.id = 'theme-card-back-style';
        style.textContent = `.card.back::before { content: "${emoji}"; }`;
        if (!document.getElementById('theme-card-back-style')) {
            document.head.appendChild(style);
        }
    }

    checkThemeSuggestion() {
        if (this.themeSuggestionShown) return;

        const suggestion = this.getThemeSuggestion();
        if (suggestion) {
            // Show suggestion after a short delay
            setTimeout(() => {
                this.showThemeSuggestion(suggestion);
            }, 1000);
        }
    }

    getThemeSuggestion() {
        const today = new Date();
        const month = today.getMonth();
        const dateStr = this.getDateString(today);

        // Check holidays first
        for (const [id, theme] of Object.entries(THEMES.holiday)) {
            if (theme.dates && this.isDateInRange(dateStr, theme.dates)) {
                return { set: 'holiday', id, theme };
            }
        }

        // Fall back to month
        const monthIds = ['january', 'february', 'march', 'april', 'may', 'june',
                          'july', 'august', 'september', 'october', 'november', 'december'];
        const monthId = monthIds[month];
        return { set: 'month', id: monthId, theme: THEMES.month[monthId] };
    }

    getDateString(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }

    isDateInRange(dateStr, range) {
        // Handle year wrap (e.g., New Year's Dec 30 - Jan 2)
        if (range.start > range.end) {
            return dateStr >= range.start || dateStr <= range.end;
        }
        return dateStr >= range.start && dateStr <= range.end;
    }

    showThemeSuggestion(suggestion) {
        this.themeSuggestionShown = true;
        const modal = document.getElementById('theme-suggestion-modal');
        if (!modal) return;

        const message = document.getElementById('theme-suggestion-message');
        const emoji = suggestion.theme.emoji || '🎨';
        message.textContent = `${emoji} It's ${suggestion.theme.name}! Try the ${suggestion.theme.name} theme?`;

        modal.classList.add('show');
    }

    acceptThemeSuggestion() {
        const suggestion = this.getThemeSuggestion();
        if (suggestion) {
            this.applyTheme(suggestion.set, suggestion.id);
        }
        this.hideThemeSuggestion();
    }

    hideThemeSuggestion() {
        const modal = document.getElementById('theme-suggestion-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    showThemeModal() {
        this.renderThemeModal();
        document.getElementById('theme-modal').classList.add('show');
    }

    hideThemeModal() {
        document.getElementById('theme-modal').classList.remove('show');
    }

    renderThemeModal() {
        // Render set tabs
        const setsContainer = document.getElementById('theme-sets');
        const sets = [
            { id: 'color', name: 'Color', emoji: '🎨' },
            { id: 'fun', name: 'Fun', emoji: '🎉' },
            { id: 'month', name: 'Month', emoji: '📅' },
            { id: 'holiday', name: 'Holiday', emoji: '🎁' }
        ];

        setsContainer.innerHTML = sets.map(set => `
            <button class="theme-set-btn ${this.currentTheme.set === set.id ? 'active' : ''}"
                    data-set="${set.id}">
                <span class="set-emoji">${set.emoji}</span>
                <span class="set-name">${set.name}</span>
            </button>
        `).join('');

        // Add click handlers for set tabs
        setsContainer.querySelectorAll('.theme-set-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const setId = btn.dataset.set;
                this.renderThemeGrid(setId);
                // Update active state
                setsContainer.querySelectorAll('.theme-set-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Render current set's themes
        this.renderThemeGrid(this.currentTheme.set);
    }

    renderThemeGrid(setId) {
        const grid = document.getElementById('theme-grid');
        const themes = THEMES[setId];

        grid.innerHTML = Object.entries(themes).map(([id, theme]) => `
            <div class="theme-card ${this.currentTheme.set === setId && this.currentTheme.id === id ? 'selected' : ''}"
                 data-set="${setId}" data-theme="${id}">
                <div class="theme-preview" style="background: ${theme.vars['--bg-gradient'] || '#333'}"></div>
                <span class="theme-emoji">${theme.emoji || '🎨'}</span>
                <span class="theme-name">${theme.name}</span>
            </div>
        `).join('');

        // Add click handlers
        grid.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                const setId = card.dataset.set;
                const themeId = card.dataset.theme;
                this.applyTheme(setId, themeId);
                // Update selection state
                grid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });
    }

    initializeEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('play-again-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('rules-btn').addEventListener('click', () => this.showRules());
        document.getElementById('close-rules').addEventListener('click', () => this.hideRules());

        // Settings modal listeners
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('close-settings').addEventListener('click', () => this.hideSettings());

        // Settings change listeners
        document.getElementById('pile-count').addEventListener('change', (e) => {
            this.settings.pileCount = parseInt(e.target.value);
            this.saveSettings();
        });

        document.getElementById('jack-on-jack').addEventListener('change', (e) => {
            this.settings.jackOnJack = e.target.checked;
            this.saveSettings();
        });

        // Close modals when clicking outside
        document.getElementById('rules-modal').addEventListener('click', (e) => {
            if (e.target.id === 'rules-modal') this.hideRules();
        });

        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') this.hideSettings();
        });

        // Theme modal listeners
        document.getElementById('theme-btn').addEventListener('click', () => this.showThemeModal());
        document.getElementById('close-theme').addEventListener('click', () => this.hideThemeModal());
        document.getElementById('theme-modal').addEventListener('click', (e) => {
            if (e.target.id === 'theme-modal') this.hideThemeModal();
        });

        // Theme suggestion modal listeners
        document.getElementById('accept-theme-btn').addEventListener('click', () => this.acceptThemeSuggestion());
        document.getElementById('decline-theme-btn').addEventListener('click', () => this.hideThemeSuggestion());
    }

    showSettings() {
        this.updateSettingsUI();
        document.getElementById('settings-modal').classList.add('show');
    }

    hideSettings() {
        document.getElementById('settings-modal').classList.remove('show');
    }

    createDeck() {
        const deck = [];
        for (const suit of this.suits) {
            for (const rank of this.ranks) {
                deck.push({ suit, rank });
            }
        }
        return deck;
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    startNewGame() {
        // Hide win modal if showing
        document.getElementById('win-modal').classList.remove('show');

        // Create and shuffle deck
        const fullDeck = this.shuffleDeck(this.createDeck());

        // Split deck between players
        this.playerDeck = fullDeck.slice(0, 26);
        this.opponentDeck = fullDeck.slice(26);

        // Reset piles based on settings
        const pileCount = this.settings.pileCount;
        this.piles = Array(pileCount).fill(null).map(() => []);
        this.pileStates = Array(pileCount).fill(null);
        this.currentCard = null;
        this.isPlayerTurn = true;
        this.currentTurnPlayer = 'player';
        this.gameActive = true;

        // Render piles HTML based on pile count
        this.renderPilesHTML();

        // Update UI
        this.updateUI();
        this.renderPiles();
        this.renderCurrentCard();

        // Auto-draw first card for player
        setTimeout(() => this.drawCard(), 300);
    }

    renderPilesHTML() {
        const pilesArea = document.querySelector('.piles-area');
        const pileCount = this.settings.pileCount;

        // Create pile HTML
        let html = '';
        for (let i = 0; i < pileCount; i++) {
            html += `
                <div class="pile" id="pile-${i}" data-pile="${i}">
                    <div class="pile-label">Pile ${i + 1}</div>
                    <div class="pile-cards"></div>
                    <div class="pile-info"></div>
                </div>
            `;
        }
        pilesArea.innerHTML = html;

        // Re-attach click listeners
        for (let i = 0; i < pileCount; i++) {
            document.getElementById(`pile-${i}`).addEventListener('click', () => this.playCardOnPile(i));
        }
    }

    drawCard() {
        if (!this.gameActive || !this.isPlayerTurn || this.currentCard) return;

        if (this.playerDeck.length === 0) {
            this.checkWinCondition();
            return;
        }

        this.currentCard = this.playerDeck.pop();
        this.renderCurrentCard();
        this.updateUI();
        this.setStatus("Click a pile to play your card!");
        this.highlightPiles(true);
    }

    playCardOnPile(pileIndex) {
        if (!this.gameActive || !this.isPlayerTurn || !this.currentCard) return;

        const card = this.currentCard;
        this.currentCard = null;
        this.highlightPiles(false);

        // Mark that player is currently playing
        this.currentTurnPlayer = 'player';

        // Animate card moving to pile, then process the play
        this.animateCardToPlay(card, pileIndex, 'player', () => {
            this.processCardPlay(card, pileIndex, 'player');
        });
    }

    processCardPlay(card, pileIndex, playedBy) {
        const pile = this.piles[pileIndex];
        const pileState = this.pileStates[pileIndex];
        const isPlayer = playedBy === 'player';

        // Check if playing special card on special card
        if (this.isSpecialCard(card) && pile.length > 0) {
            const topCard = pile[pile.length - 1];
            if (this.isSpecialCard(topCard)) {
                pile.push(card);
                this.renderPiles();
                this.updateUI();

                // Jack on Jack special rule (if enabled)
                if (card.rank === 'J' && topCard.rank === 'J' && this.settings.jackOnJack) {
                    // Jack on Jack = the OTHER player takes pile (PUSH!)
                    this.showPushPopup();
                    this.setStatus(isPlayer ? "Jack on Jack! Claude takes the pile!" : "Jack on Jack! You take the pile!");

                    setTimeout(() => {
                        // isPlayer played Jack on Jack, so opponent takes pile
                        // Third param: isPlayer just played, so pass isPlayer
                        this.animatePileTake(pileIndex, !isPlayer, isPlayer);
                    }, 1500);
                    return;
                }

                // Special on special = YOU take the pile (penalty PUSH!)
                // (This also handles Jack on Jack when setting is OFF)
                this.showPushPopup();
                this.setStatus(isPlayer ? "Special on special! You take the pile!" : "Special on special! Claude takes the pile.");

                setTimeout(() => {
                    // isPlayer played special on special, so isPlayer takes pile
                    // Third param: isPlayer just played, so pass isPlayer
                    this.animatePileTake(pileIndex, isPlayer, isPlayer);
                }, 1500);
                return;
            }
        }

        // Add card to pile
        pile.push(card);

        // Handle special card played on number (or empty pile)
        if (this.isSpecialCard(card)) {
            this.pileStates[pileIndex] = {
                specialCard: card.rank,
                count: 0,
                targetCount: this.pushCounts[card.rank],
                playedBy: playedBy
            };
            if (!isPlayer) {
                this.setStatus(`Claude played ${card.rank}${this.suitSymbols[card.suit]} - ${this.pushCounts[card.rank]} number cards to push!`);
            }
        } else if (pileState) {
            // Number card played on a pile with an active special card
            pileState.count++;

            if (pileState.count >= pileState.targetCount) {
                // Push! The player who completed the push forces their OPPONENT to take the pile
                // isPlayer = true means player completed the push, so opponent (Claude) takes pile
                // isPlayer = false means Claude completed the push, so player takes pile
                this.renderPiles();
                this.updateUI();
                this.showPushPopup();
                this.setStatus(isPlayer ? "PUSH! Claude takes the pile!" : "PUSH! You take the pile!");

                setTimeout(() => {
                    // Third param: isPlayer just played, so pass isPlayer
                    this.animatePileTake(pileIndex, !isPlayer, isPlayer);
                }, 1500);
                return;
            } else if (!isPlayer) {
                const remaining = pileState.targetCount - pileState.count;
                this.setStatus(`Claude played ${card.rank}${this.suitSymbols[card.suit]} - ${remaining} more to push!`);
            }
        } else if (!isPlayer) {
            this.setStatus(`Claude played ${card.rank}${this.suitSymbols[card.suit]} on Pile ${pileIndex + 1}`);
        }

        this.renderPiles();
        this.updateUI();

        // Check win condition
        if (this.checkWinCondition()) return;

        // Switch turns - strictly alternate
        this.switchTurn();
    }

    animateCardToPlay(card, pileIndex, fromWho, callback) {
        // Get source position
        const sourceEl = fromWho === 'player'
            ? document.getElementById('current-card')
            : document.getElementById('opponent-deck');
        const sourceRect = sourceEl.getBoundingClientRect();

        // Get target pile position
        const pileEl = document.getElementById(`pile-${pileIndex}`).querySelector('.pile-cards');
        const pileRect = pileEl.getBoundingClientRect();

        // Create flying card
        const flyingCard = document.createElement('div');
        flyingCard.className = 'flying-card to-pile';
        flyingCard.innerHTML = this.createCardHTML(card);
        flyingCard.style.left = `${sourceRect.left}px`;
        flyingCard.style.top = `${sourceRect.top}px`;
        document.body.appendChild(flyingCard);

        // Clear the source display immediately for player
        if (fromWho === 'player') {
            this.renderCurrentCard();
        }

        // Animate to pile
        requestAnimationFrame(() => {
            flyingCard.style.left = `${pileRect.left}px`;
            flyingCard.style.top = `${pileRect.top}px`;
        });

        // After animation, remove flying card and call callback
        setTimeout(() => {
            flyingCard.remove();
            callback();
        }, 400);
    }

    opponentTurn() {
        if (!this.gameActive) return;

        if (this.opponentDeck.length === 0) {
            this.checkWinCondition();
            return;
        }

        // Mark that opponent is currently playing
        this.currentTurnPlayer = 'opponent';

        // Draw card
        const card = this.opponentDeck.pop();
        this.updateUI();

        // AI: Choose best pile
        const pileIndex = this.chooseOpponentPile(card);

        // Animate card moving to pile, then process the play
        this.animateCardToPlay(card, pileIndex, 'opponent', () => {
            this.processCardPlay(card, pileIndex, 'opponent');
        });
    }

    chooseOpponentPile(card) {
        // AI Strategy
        const pileCount = this.settings.pileCount;
        const validPiles = Array.from({ length: pileCount }, (_, i) => i);

        // If we have a special card, try to play it safely
        if (this.isSpecialCard(card)) {
            // Avoid playing on another special card (unless Jack on Jack for advantage when setting is ON)
            for (const i of validPiles) {
                const pile = this.piles[i];
                if (pile.length === 0) return i; // Empty pile is safe

                const topCard = pile[pile.length - 1];
                if (!this.isSpecialCard(topCard)) return i; // Number card is safe

                // Jack on Jack makes player take pile - good move! (only if setting is ON)
                if (card.rank === 'J' && topCard.rank === 'J' && this.settings.jackOnJack) return i;
            }

            // Have to play on a special card - pick the smallest pile
            return validPiles.reduce((best, i) =>
                this.piles[i].length < this.piles[best].length ? i : best, 0);
        }

        // Number card: try to complete a push against player
        for (const i of validPiles) {
            const state = this.pileStates[i];
            if (state && state.playedBy === 'player') {
                if (state.count + 1 >= state.targetCount) {
                    return i; // This will complete the push!
                }
            }
        }

        // Try to play on a pile where opponent doesn't have active special
        for (const i of validPiles) {
            const state = this.pileStates[i];
            if (!state || state.playedBy === 'opponent') {
                return i;
            }
        }

        // Play on pile with most progress (closest to pushing)
        let bestPile = 0;
        let bestProgress = -1;
        for (const i of validPiles) {
            const state = this.pileStates[i];
            if (state && state.playedBy === 'player') {
                const progress = state.count / state.targetCount;
                if (progress > bestProgress) {
                    bestProgress = progress;
                    bestPile = i;
                }
            }
        }

        return bestPile;
    }

    isSpecialCard(card) {
        return this.specialCards.includes(card.rank);
    }

    checkWinCondition() {
        if (this.playerDeck.length === 0 && !this.currentCard) {
            this.gameActive = false;
            this.showWinModal(true);
            return true;
        }
        if (this.opponentDeck.length === 0) {
            this.gameActive = false;
            this.showWinModal(false);
            return true;
        }
        return false;
    }

    showWinModal(playerWon) {
        const modal = document.getElementById('win-modal');
        const message = document.getElementById('win-message');
        const animation = document.getElementById('win-animation');

        if (playerWon) {
            message.textContent = "🎉 You Win! 🎉";
            message.style.color = '#f1c40f';
            animation.textContent = "🏆";
        } else {
            message.textContent = "Claude Wins!";
            message.style.color = '#e74c3c';
            animation.textContent = "🤖";
        }

        modal.classList.add('show');
    }

    showRules() {
        document.getElementById('rules-modal').classList.add('show');
    }

    hideRules() {
        document.getElementById('rules-modal').classList.remove('show');
    }

    highlightPiles(highlight) {
        const pileCount = this.settings.pileCount;
        for (let i = 0; i < pileCount; i++) {
            const pile = document.getElementById(`pile-${i}`);
            if (pile) {
                if (highlight) {
                    pile.classList.add('highlight');
                } else {
                    pile.classList.remove('highlight');
                }
            }
        }
    }

    setStatus(message) {
        document.getElementById('status').textContent = message;
    }

    showPushPopup() {
        const popup = document.createElement('div');
        popup.className = 'push-popup';
        popup.textContent = 'PUSH!';
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 1500);
    }

    animatePileTake(pileIndex, toPlayer, playerJustPlayed) {
        const pile = this.piles[pileIndex];
        const pileEl = document.getElementById(`pile-${pileIndex}`);
        const pileRect = pileEl.getBoundingClientRect();
        const cardCount = pile.length;

        // Get target position
        const targetEl = toPlayer
            ? document.getElementById('player-deck')
            : document.getElementById('opponent-deck');
        const targetRect = targetEl.getBoundingClientRect();

        // Store cards to transfer
        const cardsToTransfer = [...pile];

        // Clear the pile visually
        this.piles[pileIndex] = [];
        this.pileStates[pileIndex] = null;
        this.renderPiles();

        // Animate each card one by one
        let delay = 0;
        const animationDuration = 300;
        const delayBetweenCards = 150;

        cardsToTransfer.forEach((card, index) => {
            setTimeout(() => {
                // Create flying card element
                const flyingCard = document.createElement('div');
                flyingCard.className = `flying-card ${toPlayer ? 'to-player' : 'to-opponent'}`;
                flyingCard.innerHTML = this.createCardHTML(card);
                flyingCard.style.left = `${pileRect.left + pileRect.width / 2 - 40}px`;
                flyingCard.style.top = `${pileRect.top + pileRect.height / 2 - 56}px`;
                document.body.appendChild(flyingCard);

                // Remove flying card after animation
                setTimeout(() => {
                    flyingCard.remove();

                    // Add card to player's deck and update count
                    if (toPlayer) {
                        this.playerDeck.unshift(card);
                    } else {
                        this.opponentDeck.unshift(card);
                    }
                    this.updateUI();
                }, animationDuration);
            }, delay);

            delay += delayBetweenCards;
        });

        // After all animations complete, continue the game
        const totalAnimationTime = delay + animationDuration;
        setTimeout(() => {
            if (this.checkWinCondition()) return;

            // Switch to the next player (whoever just played, the OTHER player goes next)
            this.switchTurn();
        }, totalAnimationTime);
    }

    // Switch to the other player's turn
    switchTurn() {
        if (this.currentTurnPlayer === 'player') {
            // Player just finished, opponent's turn
            this.currentTurnPlayer = 'opponent';
            this.isPlayerTurn = false;
            this.setStatus("Claude is thinking...");
            setTimeout(() => this.opponentTurn(), 300);
        } else {
            // Opponent just finished, player's turn
            this.currentTurnPlayer = 'player';
            this.isPlayerTurn = true;
            setTimeout(() => this.drawCard(), 300);
        }
    }

    updateUI() {
        document.getElementById('player-count').textContent = this.playerDeck.length;
        document.getElementById('opponent-count').textContent = this.opponentDeck.length;

        // Update deck visibility
        const playerDeckEl = document.getElementById('player-deck');
        const opponentDeckEl = document.getElementById('opponent-deck');

        playerDeckEl.style.opacity = this.playerDeck.length > 0 ? '1' : '0.3';
        opponentDeckEl.style.opacity = this.opponentDeck.length > 0 ? '1' : '0.3';
    }

    renderCurrentCard() {
        const container = document.getElementById('current-card');

        if (!this.currentCard) {
            container.innerHTML = `
                <div class="card placeholder">
                    <span>Draw a card!</span>
                </div>
            `;
            return;
        }

        container.innerHTML = this.createCardHTML(this.currentCard);
    }

    renderPiles(animatePileIndex = -1) {
        const pileCount = this.settings.pileCount;
        for (let i = 0; i < pileCount; i++) {
            const pile = this.piles[i];
            const pileState = this.pileStates[i];
            const pileEl = document.getElementById(`pile-${i}`);
            if (!pileEl) continue;
            const container = pileEl.querySelector('.pile-cards');
            const infoContainer = pileEl.querySelector('.pile-info');

            if (pile.length === 0) {
                container.innerHTML = '<div class="card empty-pile"></div>';
                infoContainer.textContent = '';
            } else {
                // Show top few cards
                const visibleCards = pile.slice(-3);
                container.innerHTML = visibleCards.map((card, idx) => {
                    const html = this.createCardHTML(card);
                    // Only animate the top card of the pile that was just played to
                    if (i === animatePileIndex && idx === visibleCards.length - 1) {
                        return html.replace('class="card', 'class="card new-card');
                    }
                    return html;
                }).join('');

                // Show pile state info
                if (pileState) {
                    const remaining = pileState.targetCount - pileState.count;
                    const owner = pileState.playedBy === 'player' ? 'Your' : "Claude's";
                    infoContainer.textContent = `${owner} ${pileState.specialCard}: ${remaining} to push`;
                } else {
                    infoContainer.textContent = `${pile.length} cards`;
                }
            }
        }
    }

    createCardHTML(card) {
        const symbol = this.suitSymbols[card.suit];
        const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
        const isFace = ['J', 'Q', 'K'].includes(card.rank);

        let centerContent = '';

        if (card.rank === 'A') {
            centerContent = `<span style="font-size: 2.5rem;">${symbol}</span>`;
        } else if (isFace) {
            const faceEmoji = card.rank === 'J' ? '🤴' : card.rank === 'Q' ? '👸' : '🤴';
            centerContent = `<span class="face-symbol">${faceEmoji}</span><span style="font-size: 1rem;">${symbol}</span>`;
        } else {
            // Number cards - create suit pattern
            const num = parseInt(card.rank);
            centerContent = this.createSuitPattern(num, symbol);
        }

        return `
            <div class="card ${card.suit} ${isFace ? 'face-card' : ''}">
                <div class="card-corner top">
                    <span class="card-rank">${card.rank}</span>
                    <span class="card-suit-small">${symbol}</span>
                </div>
                <div class="card-center" data-suit="${symbol}">
                    ${centerContent}
                </div>
                <div class="card-corner bottom">
                    <span class="card-rank">${card.rank}</span>
                    <span class="card-suit-small">${symbol}</span>
                </div>
            </div>
        `;
    }

    createSuitPattern(num, symbol) {
        // Create patterns similar to real playing cards
        const patterns = {
            2: [4, 10],
            3: [4, 7, 10],
            4: [1, 3, 10, 12],
            5: [1, 3, 7, 10, 12],
            6: [1, 3, 4, 10, 12, 9],
            7: [1, 3, 4, 5.5, 10, 12, 9],
            8: [1, 3, 4, 5.5, 7, 10, 12, 9],
            9: [1, 3, 4, 5.5, 7, 8.5, 10, 12, 9],
            10: [1, 3, 2, 4, 5.5, 7, 8.5, 10, 12, 9]
        };

        // Simple approach: just show the symbols
        return Array(num).fill(symbol).map(s => `<span>${s}</span>`).join('');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new PushGame();
    // Auto-start game on page load
    window.game.startNewGame();
});
