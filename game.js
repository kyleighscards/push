// Push! Card Game - JavaScript Implementation

// Name picker lists for username selection (20 each, all with theme suggestions)
const NAME_ADJECTIVES = [
    'Silly',      // (fun)
    'Wacky',      // (fun)
    'Sparkly',    // unicorns
    'Galactic',   // space-adventure
    'Magical',    // unicorns
    'Tropical',   // bananas
    'Robotic',    // robot
    'Wild',       // shark
    'Royal',      // girl
    'Turbo',      // video-game
    'Spooky',     // october
    'Frosty',     // december
    'Blooming',   // flower
    'Fierce',     // shark
    'Electric',   // electronics
    'Outdoor',    // outdoor
    'Musical',    // instruments
    'Brainy',     // science
    'Knightly',   // sword
    'Adventurous' // trip
];

const NAME_NOUNS = [
    'Potato',     // (fun)
    'Pancake',    // (fun)
    'Unicorn',    // unicorns
    'Astronaut',  // space-adventure
    'Banana',     // bananas
    'Robot',      // robot
    'Shark',      // shark
    'Kitten',     // cat
    'Puppy',      // dog
    'Princess',   // girl
    'Gamer',      // video-game
    'Ghost',      // october
    'Snowflake',  // december
    'Blossom',    // flower
    'Pixel',      // electronics
    'Camper',     // outdoor
    'Guitar',     // instruments
    'Beaker',     // science
    'Knight',     // sword
    'Explorer'    // trip
];

// ===== SOUND MANAGER =====
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.initialized = false;
    }

    // Initialize audio context on first user interaction
    init() {
        if (this.initialized) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.log('Web Audio not supported');
            this.enabled = false;
        }
    }

    // Resume audio context if suspended (browser autoplay policy)
    async resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    // Play a click/tap sound for UI interactions
    playClick() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = 800;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gain.gain.exponentialDecayTo = 0.01;
        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    // Play a soft sound when player plays a card (less obtrusive than click)
    playCardPlay() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = 600; // Lower frequency, softer
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.05, this.audioContext.currentTime); // Much softer volume
        gain.gain.exponentialRampToValueAtTime(0.005, this.audioContext.currentTime + 0.06);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.06);
    }

    // Play an even softer sound when opponent plays a card
    playOpponentCard() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = 500; // Even lower frequency
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.025, this.audioContext.currentTime); // Very soft
        gain.gain.exponentialRampToValueAtTime(0.003, this.audioContext.currentTime + 0.05);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.05);
    }

    // Play sound when logo fades (gentle chime)
    playLogoFade() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 chord
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'sine';

            const startTime = this.audioContext.currentTime + i * 0.1;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);

            osc.start(startTime);
            osc.stop(startTime + 0.8);
        });
    }

    // Play sound for "Jacked!" moment (dramatic horn-like)
    playJacked() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Dramatic descending tones
        const notes = [440, 349.23, 293.66]; // A4, F4, D4
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'sawtooth';

            const startTime = this.audioContext.currentTime + i * 0.15;
            gain.gain.setValueAtTime(0.15, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    // Play sound for Push! moment (exciting fanfare)
    playPush() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Ascending triumphant notes
        const notes = [392, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'square';

            const startTime = this.audioContext.currentTime + i * 0.08;
            gain.gain.setValueAtTime(0.1, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

            osc.start(startTime);
            osc.stop(startTime + 0.25);
        });
    }

    // Play card shuffle sound (for cards being pushed)
    playShuffle() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Create noise-based shuffle sound
        const bufferSize = this.audioContext.sampleRate * 0.25; // 0.25 seconds (shorter)
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate filtered noise for paper/card sound (softer)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.15;
        }

        const source = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();

        source.buffer = buffer;
        filter.type = 'bandpass';
        filter.frequency.value = 2500;
        filter.Q.value = 0.7;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, this.audioContext.currentTime + 0.25);

        source.start();
    }

    // Play individual card sound (for card-by-card animation)
    playCardFlip() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Short percussive click
        const bufferSize = this.audioContext.sampleRate * 0.05;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const t = i / this.audioContext.sampleRate;
            data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 50);
        }

        const source = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();

        source.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.value = 2000;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.value = 0.15;

        source.start();
    }

    // Play win sound (celebratory)
    playWin() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Happy ascending arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'triangle';

            const startTime = this.audioContext.currentTime + i * 0.12;
            gain.gain.setValueAtTime(0.12, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
    }

    // Play lose sound (sad trombone style)
    playLose() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Descending sad notes
        const notes = [293.66, 277.18, 261.63, 246.94]; // D4, C#4, C4, B3
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'triangle';

            const startTime = this.audioContext.currentTime + i * 0.3;
            gain.gain.setValueAtTime(0.1, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

            osc.start(startTime);
            osc.stop(startTime + 0.5);
        });
    }

    // Play "Watch out!" alert sound (quick warning beeps)
    playWatchOut() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Two quick alert beeps - rising then falling
        const beeps = [
            { freq: 880, time: 0 },      // A5
            { freq: 1100, time: 0.1 }    // C#6 (higher)
        ];

        beeps.forEach(({ freq, time }) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'square';

            const startTime = this.audioContext.currentTime + time;
            gain.gain.setValueAtTime(0.08, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);

            osc.start(startTime);
            osc.stop(startTime + 0.08);
        });
    }

    // Play invitation received sound (obvious doorbell-like chime)
    playInvite() {
        if (!this.enabled || !this.audioContext) return;
        this.resume();

        // Doorbell-style ding-dong, repeated twice for attention
        const notes = [
            { freq: 659.25, time: 0 },      // E5 (ding)
            { freq: 523.25, time: 0.2 },    // C5 (dong)
            { freq: 659.25, time: 0.5 },    // E5 (ding)
            { freq: 523.25, time: 0.7 }     // C5 (dong)
        ];

        notes.forEach(({ freq, time }) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'sine';

            const startTime = this.audioContext.currentTime + time;
            gain.gain.setValueAtTime(0.2, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.18);

            osc.start(startTime);
            osc.stop(startTime + 0.2);
        });
    }
}

// Global sound manager instance
const soundManager = new SoundManager();

// Map themed names to theme suggestions (all 40 names have themes)
const THEME_NAME_HINTS = {
    // Adjectives
    'Silly': 'bananas',
    'Wacky': 'bananas',
    'Sparkly': 'unicorns',
    'Galactic': 'space-adventure',
    'Magical': 'unicorns',
    'Tropical': 'bananas',
    'Robotic': 'robot',
    'Wild': 'shark',
    'Royal': 'girl',
    'Turbo': 'video-game',
    'Spooky': 'october',
    'Frosty': 'december',
    'Blooming': 'flower',
    'Fierce': 'shark',
    'Electric': 'electronics',
    'Outdoor': 'outdoor',
    'Musical': 'instruments',
    'Brainy': 'science',
    'Knightly': 'sword',
    'Adventurous': 'trip',
    // Nouns
    'Potato': 'bananas',
    'Pancake': 'bananas',
    'Unicorn': 'unicorns',
    'Astronaut': 'space-adventure',
    'Banana': 'bananas',
    'Robot': 'robot',
    'Shark': 'shark',
    'Kitten': 'cat',
    'Puppy': 'dog',
    'Princess': 'girl',
    'Gamer': 'video-game',
    'Ghost': 'october',
    'Snowflake': 'december',
    'Blossom': 'flower',
    'Pixel': 'electronics',
    'Camper': 'outdoor',
    'Guitar': 'instruments',
    'Beaker': 'science',
    'Knight': 'sword',
    'Explorer': 'trip'
};

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
        },
        'robot': {
            name: 'Robot',
            emoji: '🤖',
            cardBackEmoji: '🤖',
            suitSymbols: { hearts: '🤖', diamonds: '⚙️', clubs: '🔩', spades: '🔋' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #2c3e50 0%, #4a6572 100%)',
                '--gold': '#00ff88',
                '--push-color': '#00ff88',
                '--push-shadow': '#ff0000',
                '--card-back-bg': 'linear-gradient(135deg, #4a6572 0%, #2c3e50 100%)',
                '--card-back-border': '3px solid #00ff88'
            }
        },
        'shark': {
            name: 'Shark',
            emoji: '🦈',
            cardBackEmoji: '🦈',
            suitSymbols: { hearts: '🦈', diamonds: '🐟', clubs: '🌊', spades: '🐚' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #1a5276 0%, #2980b9 100%)',
                '--gold': '#ffffff',
                '--push-color': '#ff6b6b',
                '--card-back-bg': 'linear-gradient(135deg, #2980b9 0%, #1a5276 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'cat': {
            name: 'Cat',
            emoji: '🐱',
            cardBackEmoji: '🐱',
            suitSymbols: { hearts: '🐱', diamonds: '🐾', clubs: '🧶', spades: '🐟' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                '--gold': '#ffffff',
                '--push-color': '#ff69b4',
                '--card-back-bg': 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'dog': {
            name: 'Dog',
            emoji: '🐶',
            cardBackEmoji: '🐶',
            suitSymbols: { hearts: '🐶', diamonds: '🦴', clubs: '🐾', spades: '🎾' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)',
                '--gold': '#ffd700',
                '--push-color': '#ffd700',
                '--card-back-bg': 'linear-gradient(135deg, #a0522d 0%, #8b4513 100%)',
                '--card-back-border': '3px solid #ffd700'
            }
        },
        'sword': {
            name: 'Sword',
            emoji: '⚔️',
            cardBackEmoji: '⚔️',
            suitSymbols: { hearts: '⚔️', diamonds: '🛡️', clubs: '🗡️', spades: '🏰' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%)',
                '--gold': '#c0c0c0',
                '--push-color': '#ffd700',
                '--push-shadow': '#8b0000',
                '--card-back-bg': 'linear-gradient(135deg, #5a5a5a 0%, #2c2c2c 100%)',
                '--card-back-border': '3px solid #c0c0c0'
            }
        },
        'flower': {
            name: 'Flower',
            emoji: '🌸',
            cardBackEmoji: '🌸',
            suitSymbols: { hearts: '🌸', diamonds: '🌻', clubs: '🌷', spades: '🌺' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff9ff3 0%, #98fb98 100%)',
                '--gold': '#ff1493',
                '--push-color': '#ff1493',
                '--card-back-bg': 'linear-gradient(135deg, #ffb6c1 0%, #98fb98 100%)',
                '--card-back-border': '3px solid #ff1493'
            }
        },
        'girl': {
            name: 'Girl',
            emoji: '👧',
            cardBackEmoji: '👧',
            suitSymbols: { hearts: '💖', diamonds: '👑', clubs: '💄', spades: '👗' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)',
                '--gold': '#ffffff',
                '--push-color': '#ffffff',
                '--push-shadow': '#c71585',
                '--card-back-bg': 'linear-gradient(135deg, #ff1493 0%, #c71585 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'boy': {
            name: 'Boy',
            emoji: '👦',
            cardBackEmoji: '👦',
            suitSymbols: { hearts: '⚽', diamonds: '🏀', clubs: '🎮', spades: '🚀' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                '--gold': '#f39c12',
                '--push-color': '#f39c12',
                '--card-back-bg': 'linear-gradient(135deg, #2980b9 0%, #1a5276 100%)',
                '--card-back-border': '3px solid #f39c12'
            }
        },
        'trip': {
            name: 'Trip',
            emoji: '✈️',
            cardBackEmoji: '✈️',
            suitSymbols: { hearts: '✈️', diamonds: '🗺️', clubs: '🧳', spades: '🏝️' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #87ceeb 0%, #4682b4 100%)',
                '--gold': '#ffffff',
                '--push-color': '#ffd700',
                '--card-back-bg': 'linear-gradient(135deg, #4682b4 0%, #2c5282 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'electronics': {
            name: 'Electronics',
            emoji: '💻',
            cardBackEmoji: '💻',
            suitSymbols: { hearts: '💻', diamonds: '📱', clubs: '🔌', spades: '💡' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                '--gold': '#00ff00',
                '--push-color': '#00ff00',
                '--push-shadow': '#0000ff',
                '--card-back-bg': 'linear-gradient(135deg, #16213e 0%, #0f0f23 100%)',
                '--card-back-border': '3px solid #00ff00'
            }
        },
        'outdoor': {
            name: 'Outdoor',
            emoji: '🏕️',
            cardBackEmoji: '🏕️',
            suitSymbols: { hearts: '🏕️', diamonds: '🌲', clubs: '🔥', spades: '⛰️' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #228b22 0%, #2e8b57 100%)',
                '--gold': '#ffa500',
                '--push-color': '#ffa500',
                '--card-back-bg': 'linear-gradient(135deg, #2e8b57 0%, #1a5f3c 100%)',
                '--card-back-border': '3px solid #ffa500'
            }
        },
        'video-game': {
            name: 'Video Game',
            emoji: '🎮',
            cardBackEmoji: '🎮',
            suitSymbols: { hearts: '🎮', diamonds: '👾', clubs: '🕹️', spades: '🏆' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)',
                '--gold': '#22d3ee',
                '--push-color': '#22d3ee',
                '--push-shadow': '#f43f5e',
                '--card-back-bg': 'linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)',
                '--card-back-border': '3px solid #22d3ee'
            }
        },
        'science': {
            name: 'Science',
            emoji: '🔬',
            cardBackEmoji: '🔬',
            suitSymbols: { hearts: '🔬', diamonds: '⚗️', clubs: '🧪', spades: '🧬' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
                '--gold': '#00ffcc',
                '--push-color': '#00ffcc',
                '--push-shadow': '#ff6b6b',
                '--card-back-bg': 'linear-gradient(135deg, #2d5a87 0%, #1e3a5f 100%)',
                '--card-back-border': '3px solid #00ffcc'
            }
        }
    },
    month: {
        'january': {
            name: 'January',
            emoji: '❄️',
            cardBackEmoji: '❄️',
            suitSymbols: { hearts: '❄️', diamonds: '⛷️', clubs: '🧣', spades: '☃️' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
                '--gold': '#4169e1',
                '--push-color': '#4169e1',
                '--card-back-bg': 'linear-gradient(135deg, #b2ebf2 0%, #81d4fa 100%)',
                '--card-back-border': '3px solid #4169e1'
            }
        },
        'february': {
            name: 'February',
            emoji: '💕',
            cardBackEmoji: '💕',
            suitSymbols: { hearts: '💖', diamonds: '💝', clubs: '🌹', spades: '💘' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)',
                '--gold': '#c71585',
                '--push-color': '#c71585',
                '--card-back-bg': 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'march': {
            name: 'March',
            emoji: '☘️',
            cardBackEmoji: '☘️',
            suitSymbols: { hearts: '☘️', diamonds: '🌈', clubs: '🍀', spades: '🌱' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #50c878 0%, #228b22 100%)',
                '--gold': '#ffd700',
                '--card-back-bg': 'linear-gradient(135deg, #228b22 0%, #006400 100%)',
                '--card-back-border': '3px solid #ffd700'
            }
        },
        'april': {
            name: 'April',
            emoji: '🌷',
            cardBackEmoji: '🌷',
            suitSymbols: { hearts: '🌷', diamonds: '🌧️', clubs: '🐣', spades: '🌂' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #e6e6fa 0%, #add8e6 100%)',
                '--gold': '#ff69b4',
                '--card-back-bg': 'linear-gradient(135deg, #add8e6 0%, #87ceeb 100%)',
                '--card-back-border': '3px solid #ff69b4'
            }
        },
        'may': {
            name: 'May',
            emoji: '🌸',
            cardBackEmoji: '🌸',
            suitSymbols: { hearts: '🌸', diamonds: '🌺', clubs: '🦋', spades: '🌼' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffb7c5 0%, #90ee90 100%)',
                '--gold': '#ff1493',
                '--card-back-bg': 'linear-gradient(135deg, #98fb98 0%, #90ee90 100%)',
                '--card-back-border': '3px solid #ff1493'
            }
        },
        'june': {
            name: 'June',
            emoji: '☀️',
            cardBackEmoji: '☀️',
            suitSymbols: { hearts: '☀️', diamonds: '🌻', clubs: '🍦', spades: '😎' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ffeb3b 0%, #ff9800 100%)',
                '--gold': '#ff5722',
                '--push-color': '#ff5722',
                '--card-back-bg': 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'july': {
            name: 'July',
            emoji: '🏖️',
            cardBackEmoji: '🏖️',
            suitSymbols: { hearts: '🏖️', diamonds: '🌊', clubs: '🐚', spades: '🩴' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #00bcd4 0%, #ffe4b5 100%)',
                '--gold': '#ff7f50',
                '--card-back-bg': 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
                '--card-back-border': '3px solid #ffe4b5'
            }
        },
        'august': {
            name: 'August',
            emoji: '🌴',
            cardBackEmoji: '🌴',
            suitSymbols: { hearts: '🌴', diamonds: '🍉', clubs: '🌞', spades: '🏄' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                '--gold': '#ffffff',
                '--card-back-bg': 'linear-gradient(135deg, #4ecdc4 0%, #26a69a 100%)',
                '--card-back-border': '3px solid #ffffff'
            }
        },
        'september': {
            name: 'September',
            emoji: '📚',
            cardBackEmoji: '📚',
            suitSymbols: { hearts: '📚', diamonds: '✏️', clubs: '🎒', spades: '🍎' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #2f4f4f 0%, #556b2f 100%)',
                '--gold': '#ff0000',
                '--card-back-bg': 'linear-gradient(135deg, #556b2f 0%, #2f4f4f 100%)',
                '--card-back-border': '3px solid #ff0000'
            }
        },
        'october': {
            name: 'October',
            emoji: '🍂',
            cardBackEmoji: '🍂',
            suitSymbols: { hearts: '🍂', diamonds: '🎃', clubs: '🍁', spades: '👻' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #ff8c00 0%, #dc143c 100%)',
                '--gold': '#8b4513',
                '--card-back-bg': 'linear-gradient(135deg, #dc143c 0%, #8b0000 100%)',
                '--card-back-border': '3px solid #ff8c00'
            }
        },
        'november': {
            name: 'November',
            emoji: '🦃',
            cardBackEmoji: '🦃',
            suitSymbols: { hearts: '🦃', diamonds: '🍂', clubs: '🌽', spades: '🥧' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #8b4513 0%, #daa520 100%)',
                '--gold': '#ff8c00',
                '--card-back-bg': 'linear-gradient(135deg, #daa520 0%, #8b4513 100%)',
                '--card-back-border': '3px solid #ff8c00'
            }
        },
        'december': {
            name: 'December',
            emoji: '🎄',
            cardBackEmoji: '🎄',
            suitSymbols: { hearts: '🎄', diamonds: '⭐', clubs: '🎁', spades: '❄️' },
            vars: {
                '--bg-gradient': 'linear-gradient(135deg, #006400 0%, #8b0000 100%)',
                '--gold': '#ffd700',
                '--card-back-bg': 'linear-gradient(135deg, #006400 0%, #004d00 100%)',
                '--card-back-border': '3px solid #ffd700'
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

// ===== FIREBASE CONFIGURATION =====
const firebaseConfig = {
    apiKey: "AIzaSyA973Q0OwUjbAA0mtBdz626NgmVSTo7Gh4",
    authDomain: "push-card-game.firebaseapp.com",
    databaseURL: "https://push-card-game-default-rtdb.firebaseio.com",
    projectId: "push-card-game",
    storageBucket: "push-card-game.firebasestorage.app",
    messagingSenderId: "348636248250",
    appId: "1:348636248250:web:bc74884a027f2898e8ea83"
};

// Initialize Firebase
let firebaseApp = null;
let database = null;
let firebaseReady = false;

try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    firebaseReady = true;
} catch (e) {
    console.log('Firebase initialization failed:', e);
    firebaseReady = false;
}

// Check if Firebase is available
function isFirebaseReady() {
    return firebaseReady && database !== null;
}

// ===== COOKIE HELPERS =====
function setCookie(name, value, days = 365) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)};max-age=${maxAge};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;max-age=0;path=/`;
}

// ===== MULTIPLAYER MANAGER =====
class MultiplayerManager {
    constructor(game) {
        this.game = game;
        this.userId = null;
        this.username = null;
        this.currentGameId = null;
        this.isMultiplayer = false;
        this.isHost = false;
        this.opponentId = null;
        this.opponentUsername = null;
        this.listeners = [];
        this.inviteTimeout = null;
        this.pendingInviteId = null;

        this.initPromise = this.initializeUser();
    }

    async initializeUser() {
        // Check for existing user in cookies
        const savedUserId = getCookie('pushUserId');
        const savedUsername = getCookie('pushUsername');

        if (savedUserId && savedUsername) {
            this.userId = savedUserId;
            this.username = savedUsername;
            await this.goOnline();
        }
    }

    hasUsername() {
        return this.username !== null;
    }

    // Wait for initialization to complete (for callers that need Firebase ready)
    async waitForInit() {
        return this.initPromise;
    }

    async setUsername(username) {
        // Generate unique user ID if not exists
        if (!this.userId) {
            this.userId = database.ref('users').push().key;
        }

        this.username = username;

        // Save to cookies
        setCookie('pushUserId', this.userId);
        setCookie('pushUsername', this.username);

        // Save to Firebase
        await this.goOnline();

        return true;
    }

    async goOnline() {
        if (!database || !this.userId) return;

        const userRef = database.ref(`users/${this.userId}`);

        // Set user data
        await userRef.set({
            username: this.username,
            online: true,
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
            inGame: null
        });

        // Set up disconnect handler
        userRef.onDisconnect().update({
            online: false,
            lastSeen: firebase.database.ServerValue.TIMESTAMP
        });

        // Listen for invites
        this.listenForInvites();
    }

    async goOffline() {
        if (!database || !this.userId) return;

        await database.ref(`users/${this.userId}`).update({
            online: false,
            lastSeen: firebase.database.ServerValue.TIMESTAMP
        });
    }

    listenForInvites() {
        if (!database || !this.userId) return;

        const invitesRef = database.ref('invites').orderByChild('to').equalTo(this.userId);

        invitesRef.on('child_added', (snapshot) => {
            const invite = snapshot.val();
            if (invite.status === 'pending') {
                this.showInvite(snapshot.key, invite);
            }
        });

        this.listeners.push({ ref: invitesRef, event: 'child_added' });
    }

    async showInvite(inviteId, invite) {
        // Get inviter's username
        const inviterSnap = await database.ref(`users/${invite.from}/username`).once('value');
        const inviterName = inviterSnap.val() || 'Someone';

        // Play obvious invitation sound
        soundManager.playInvite();

        document.getElementById('invite-message').textContent = `${inviterName} wants to play!`;
        document.getElementById('invite-modal').classList.add('show');

        this.pendingInviteId = inviteId;

        // Start countdown
        let timeLeft = 30;
        const timerEl = document.getElementById('invite-timer');
        timerEl.textContent = `Expires in ${timeLeft}s`;

        this.inviteTimeout = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Expires in ${timeLeft}s`;

            if (timeLeft <= 0) {
                this.declineInvite();
            }
        }, 1000);
    }

    async acceptInvite() {
        if (!this.pendingInviteId) return;

        clearInterval(this.inviteTimeout);
        document.getElementById('invite-modal').classList.remove('show');
        document.getElementById('win-modal').classList.remove('show');

        const inviteSnap = await database.ref(`invites/${this.pendingInviteId}`).once('value');
        const invite = inviteSnap.val();

        if (!invite || invite.status !== 'pending') {
            alert('Invite expired or cancelled');
            return;
        }

        // Update invite status
        await database.ref(`invites/${this.pendingInviteId}`).update({
            status: 'accepted'
        });

        // Join the game
        this.opponentId = invite.from;
        const opponentSnap = await database.ref(`users/${invite.from}/username`).once('value');
        this.opponentUsername = opponentSnap.val();

        // Wait for host to create game
        this.waitForGame(invite.from);
    }

    async declineInvite() {
        if (!this.pendingInviteId) return;

        clearInterval(this.inviteTimeout);
        document.getElementById('invite-modal').classList.remove('show');

        await database.ref(`invites/${this.pendingInviteId}`).update({
            status: 'declined'
        });

        this.pendingInviteId = null;
    }

    waitForGame(hostId) {
        // Listen for game creation by host
        const gamesRef = database.ref('games').orderByChild('player2').equalTo(this.userId);
        let hasJoined = false;

        gamesRef.on('child_added', (snapshot) => {
            if (hasJoined) return; // Prevent double-joining

            const game = snapshot.val();
            // Check it's from the right host, is currently playing, and was created recently (within last 60 seconds)
            const gameCreatedAt = game.createdAt || 0;
            const isRecentGame = (Date.now() - gameCreatedAt) < 60000;

            if (game.player1 === hostId && game.status === 'playing' && isRecentGame && !game.winner) {
                hasJoined = true;
                gamesRef.off();
                this.joinGame(snapshot.key, game);
            }
        });
    }

    async sendInvite(targetUserId) {
        if (!database || !this.userId) return;

        // Get target username
        const targetSnap = await database.ref(`users/${targetUserId}/username`).once('value');
        const targetName = targetSnap.val();

        // Create invite
        const inviteRef = database.ref('invites').push();
        await inviteRef.set({
            from: this.userId,
            to: targetUserId,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            status: 'pending'
        });

        // Show waiting modal
        document.getElementById('waiting-message').textContent = `Waiting for ${targetName} to accept...`;
        document.getElementById('waiting-modal').classList.add('show');
        document.getElementById('lobby-modal').classList.remove('show');

        this.pendingInviteId = inviteRef.key;
        this.opponentId = targetUserId;
        this.opponentUsername = targetName;

        // Auto-cancel after 30 seconds (store timeout ID so we can clear it)
        const inviteTimeoutId = setTimeout(async () => {
            const snap = await inviteRef.once('value');
            if (snap.val() && snap.val().status === 'pending') {
                await inviteRef.remove();
                document.getElementById('waiting-modal').classList.remove('show');
                alert('Invite expired');
            }
        }, 30000);

        // Listen for response
        inviteRef.on('value', async (snapshot) => {
            const invite = snapshot.val();
            if (!invite) return;

            if (invite.status === 'accepted') {
                clearTimeout(inviteTimeoutId);  // Clear timeout on accept
                inviteRef.off();
                document.getElementById('waiting-modal').classList.remove('show');
                await this.createGame();
            } else if (invite.status === 'declined') {
                clearTimeout(inviteTimeoutId);  // Clear timeout on decline
                inviteRef.off();
                document.getElementById('waiting-modal').classList.remove('show');
                alert(`${targetName} declined the invite`);
                this.opponentId = null;
                this.opponentUsername = null;
            }
        });
    }

    cancelInvite() {
        if (this.pendingInviteId) {
            database.ref(`invites/${this.pendingInviteId}`).remove();
            this.pendingInviteId = null;
        }
        document.getElementById('waiting-modal').classList.remove('show');
        this.opponentId = null;
        this.opponentUsername = null;
    }

    async createGame() {
        this.isHost = true;
        this.isMultiplayer = true;

        // Create shuffled deck
        const deck = this.game.createDeck();
        this.shuffleArray(deck);

        // Split deck
        const player1Deck = deck.slice(0, 26);
        const player2Deck = deck.slice(26);

        // Create game in Firebase
        const gameRef = database.ref('games').push();
        this.currentGameId = gameRef.key;

        const pileCount = this.game.settings.pileCount;

        await gameRef.set({
            player1: this.userId,
            player2: this.opponentId,
            player1Username: this.username,
            player2Username: this.opponentUsername,
            status: 'playing',
            currentTurn: 'player1',
            player1Deck: player1Deck,
            player2Deck: player2Deck,
            piles: Array(pileCount).fill([]),
            pileStates: Array(pileCount).fill(null),
            settings: this.game.settings,
            lastMove: null,
            messages: null,
            winner: null,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        // Update user status
        await database.ref(`users/${this.userId}`).update({ inGame: this.currentGameId });
        await database.ref(`users/${this.opponentId}`).update({ inGame: this.currentGameId });

        // Start listening to game
        this.startGameListeners();

        // Initialize local game state
        this.game.startMultiplayerGame(player1Deck, this.opponentUsername, true);
    }

    async joinGame(gameId, gameData) {
        this.currentGameId = gameId;
        this.isHost = false;
        this.isMultiplayer = true;
        this.opponentId = gameData.player1;
        this.opponentUsername = gameData.player1Username;

        // Apply host's settings (pileCount and jackOnJack) to invitee
        if (gameData.settings) {
            this.game.settings.pileCount = gameData.settings.pileCount;
            this.game.settings.jackOnJack = gameData.settings.jackOnJack;
            this.game.updateSettingsUI();
        }

        // Initialize local game state FIRST (before listeners can fire)
        this.game.startMultiplayerGame(gameData.player2Deck, this.opponentUsername, false);

        // Then start listening for moves
        this.startGameListeners();
    }

    startGameListeners() {
        if (!this.currentGameId) return;

        const gameRef = database.ref(`games/${this.currentGameId}`);

        // Listen for moves - skip initial value, only react to changes
        let moveInitialLoad = true;
        gameRef.child('lastMove').on('value', (snapshot) => {
            if (moveInitialLoad) {
                moveInitialLoad = false;
                return;
            }
            const move = snapshot.val();
            if (move && move.playerId !== this.userId) {
                this.game.processRemoteMove(move);
            }
        });

        // Listen for messages
        gameRef.child('messages').on('child_added', (snapshot) => {
            const msg = snapshot.val();
            if (msg && msg.from !== this.userId) {
                this.showToast(this.opponentUsername, msg.text);
            }
        });

        // Listen for game end - skip initial value, only react to changes
        let winnerInitialLoad = true;
        gameRef.child('winner').on('value', (snapshot) => {
            if (winnerInitialLoad) {
                winnerInitialLoad = false;
                return;
            }
            const winner = snapshot.val();
            if (winner) {
                this.game.handleMultiplayerWin(winner === this.getPlayerRole());
            }
        });

        // Listen for opponent leaving - skip initial value
        let statusInitialLoad = true;
        gameRef.child('status').on('value', (snapshot) => {
            if (statusInitialLoad) {
                statusInitialLoad = false;
                return;
            }
            const status = snapshot.val();
            if (status === 'abandoned') {
                this.game.handleOpponentLeft();
            }
        });

        // Also listen for opponent going offline
        if (this.opponentId) {
            database.ref(`users/${this.opponentId}/online`).on('value', (snapshot) => {
                const online = snapshot.val();
                if (online === false && this.currentGameId && this.game.gameActive) {
                    this.game.handleOpponentLeft();
                }
            });
        }
    }

    getPlayerRole() {
        return this.isHost ? 'player1' : 'player2';
    }

    async sendMove(card, pileIndex) {
        if (!this.currentGameId) return;

        const gameRef = database.ref(`games/${this.currentGameId}`);

        await gameRef.child('lastMove').set({
            playerId: this.userId,
            playerRole: this.getPlayerRole(),
            card: card,
            pile: pileIndex,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Switch turn
        const nextTurn = this.isHost ? 'player2' : 'player1';
        await gameRef.child('currentTurn').set(nextTurn);
    }

    async updateGameState(piles, pileStates, playerDeck, opponentDeck) {
        if (!this.currentGameId) return;

        const gameRef = database.ref(`games/${this.currentGameId}`);
        const playerRole = this.getPlayerRole();

        const updates = {
            piles: piles,
            pileStates: pileStates
        };

        if (playerRole === 'player1') {
            updates.player1Deck = playerDeck;
            updates.player2Deck = opponentDeck;
        } else {
            updates.player2Deck = playerDeck;
            updates.player1Deck = opponentDeck;
        }

        await gameRef.update(updates);
    }

    showToast(sender, message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-sender">${sender}</div>
            <div class="toast-message">${message}</div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    async setWinner(isPlayerWinner) {
        if (!this.currentGameId) return;

        const winner = isPlayerWinner ? this.getPlayerRole() : (this.isHost ? 'player2' : 'player1');
        await database.ref(`games/${this.currentGameId}/winner`).set(winner);
    }

    async endGame(keepRematchInfo = false) {
        if (!this.currentGameId) return;

        // Store info for potential rematch before clearing
        const rematchOpponentId = this.opponentId;
        const rematchOpponentUsername = this.opponentUsername;
        const rematchGameId = this.currentGameId;

        // Mark game as abandoned so opponent knows
        if (this.game.gameActive) {
            await database.ref(`games/${this.currentGameId}/status`).set('abandoned');
        }

        // Update user status
        if (this.userId) {
            await database.ref(`users/${this.userId}`).update({ inGame: null });
        }

        // Clean up listeners
        database.ref(`games/${this.currentGameId}`).off();
        if (this.opponentId) {
            database.ref(`users/${this.opponentId}/online`).off();
        }

        this.currentGameId = null;
        this.isMultiplayer = false;
        this.isHost = false;

        // Keep opponent info for rematch if requested
        if (keepRematchInfo) {
            this.rematchOpponentId = rematchOpponentId;
            this.rematchOpponentUsername = rematchOpponentUsername;
            this.lastGameId = rematchGameId;
        } else {
            this.opponentId = null;
            this.opponentUsername = null;
            this.rematchOpponentId = null;
            this.rematchOpponentUsername = null;
            this.lastGameId = null;
        }
    }

    async requestRematch() {
        if (!this.rematchOpponentId || !this.lastGameId) return false;

        try {
            // Create rematch request in Firebase
            await database.ref(`games/${this.lastGameId}/rematch/${this.userId}`).set({
                requested: true,
                timestamp: Date.now()
            });

            // Listen for opponent's rematch response
            return new Promise((resolve) => {
                const rematchRef = database.ref(`games/${this.lastGameId}/rematch`);

                const checkRematch = (snapshot) => {
                    const rematchData = snapshot.val();
                    if (rematchData && rematchData[this.rematchOpponentId]?.requested) {
                        // Both players want rematch!
                        rematchRef.off('value', checkRematch);
                        resolve(true);
                    }
                };

                rematchRef.on('value', checkRematch);

                // Timeout after 30 seconds
                setTimeout(() => {
                    rematchRef.off('value', checkRematch);
                    resolve(false);
                }, 30000);
            });
        } catch (e) {
            console.log('Rematch request failed:', e);
            return false;
        }
    }

    async startRematch() {
        if (!this.rematchOpponentId) return;

        // Restore opponent info
        this.opponentId = this.rematchOpponentId;
        this.opponentUsername = this.rematchOpponentUsername;

        // Create new game as host (whoever requested first becomes host based on alphabetical order)
        const amHost = this.userId < this.opponentId;

        if (amHost) {
            await this.createRematchGame();
        } else {
            // Wait for opponent to create the game
            await this.waitForRematchGame();
        }
    }

    async createRematchGame() {
        const pileCount = this.game.settings.pileCount;
        const fullDeck = this.createFullDeck();
        this.shuffleArray(fullDeck);
        const player1Deck = fullDeck.slice(0, 26);
        const player2Deck = fullDeck.slice(26, 52);

        const gameRef = database.ref('games').push();
        this.currentGameId = gameRef.key;
        this.isHost = true;
        this.isMultiplayer = true;

        await gameRef.set({
            player1: this.userId,
            player1Username: this.username,
            player2: this.opponentId,
            player2Username: this.opponentUsername,
            status: 'active',
            currentTurn: 'player1',
            player1Deck: player1Deck,
            player2Deck: player2Deck,
            piles: Array(pileCount).fill([]),
            pileStates: Array(pileCount).fill(null),
            settings: this.game.settings,
            lastMove: null,
            messages: null,
            winner: null,
            isRematch: true
        });

        // Update both users' inGame status
        await database.ref(`users/${this.userId}`).update({ inGame: this.currentGameId });
        await database.ref(`users/${this.opponentId}`).update({ inGame: this.currentGameId });

        // Notify via old game channel
        if (this.lastGameId) {
            await database.ref(`games/${this.lastGameId}/rematchGameId`).set(this.currentGameId);
        }

        this.game.startMultiplayerGame(this.currentGameId, true);
        this.startGameListeners();
    }

    async waitForRematchGame() {
        return new Promise((resolve) => {
            const rematchRef = database.ref(`games/${this.lastGameId}/rematchGameId`);

            rematchRef.on('value', async (snapshot) => {
                const newGameId = snapshot.val();
                if (newGameId) {
                    rematchRef.off();
                    this.currentGameId = newGameId;
                    this.isHost = false;
                    this.isMultiplayer = true;

                    // Join the new game
                    const gameSnapshot = await database.ref(`games/${newGameId}`).once('value');
                    const gameData = gameSnapshot.val();

                    if (gameData) {
                        this.game.startMultiplayerGame(newGameId, false, gameData);
                        this.startGameListeners();
                    }
                    resolve();
                }
            });

            // Timeout
            setTimeout(() => {
                rematchRef.off();
                resolve();
            }, 10000);
        });
    }

    createFullDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push({ suit, rank });
            }
        }
        return deck;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async getOnlinePlayers() {
        if (!database) return [];

        const snapshot = await database.ref('users')
            .orderByChild('online')
            .equalTo(true)
            .once('value');

        const players = [];
        snapshot.forEach((child) => {
            if (child.key !== this.userId) {
                players.push({
                    id: child.key,
                    ...child.val()
                });
            }
        });

        return players;
    }
}

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
            jackOnJack: true,
            skillLevel: 'expert',  // 'kid', 'fun', 'expert'
            hintsAndTips: true,    // Show fun hints during special moments
            soundEffects: true     // Play sound effects
        };

        // Status messages (for easy customization)
        this.messages = {
            clickPile: "Click a pile to play your card!",
            yourTurn: "Your turn!",
            opponentTurn: "{name}'s turn...",
            opponentThinking: "Opponent is thinking...",
            opponentPlayed: "Opponent played {card}",
            youGotJacked: "You got JACKED! Opponent takes the pile!",
            opponentGotJacked: "You got JACKED! You take the pile!",
            specialOnSpecialYou: "Special on special! You take the pile!",
            specialOnSpecialOpp: "Special on special! Opponent takes the pile.",
            pushYouTake: "PUSH! You take the pile!",
            pushOppTake: "PUSH! Opponent takes the pile!",
            watchOut: "Watch out!"
        };

        // For Expert mode status display
        this.lastExpertRule = '';

        // For hints system
        this.poisonHintShown = false;

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

        // Multiplayer state
        this.multiplayer = null;
        this.isMultiplayerGame = false;
        this.isMyTurn = true;

        this.loadSettings();
        this.loadTheme();
        this.initializeEventListeners();
        this.initializeMultiplayer();
    }

    initializeMultiplayer() {
        this.multiplayer = new MultiplayerManager(this);
        this.initializeMultiplayerUI();
    }

    initializeMultiplayerUI() {
        // Populate name picker dropdowns
        this.populateNamePicker();

        // Username modal - name picker change handlers
        const adjSelect = document.getElementById('name-adjective');
        const nounSelect = document.getElementById('name-noun');

        adjSelect.addEventListener('change', () => this.updateNamePreview());
        nounSelect.addEventListener('change', () => this.updateNamePreview());

        document.getElementById('username-submit').addEventListener('click', () => this.submitUsername());

        // Theme suggestion modal buttons
        document.getElementById('accept-name-theme-btn').addEventListener('click', async () => {
            if (this.pendingThemeSuggestion) {
                const setId = this.getThemeSetForTheme(this.pendingThemeSuggestion);
                this.applyTheme(setId, this.pendingThemeSuggestion);
                this.pendingThemeSuggestion = null;
            }
            document.getElementById('name-theme-modal').classList.remove('show');
            await this.completeUsernameSubmission();
        });

        document.getElementById('decline-name-theme-btn').addEventListener('click', async () => {
            this.pendingThemeSuggestion = null;
            document.getElementById('name-theme-modal').classList.remove('show');
            await this.completeUsernameSubmission();
        });

        // Mode selection
        document.getElementById('play-ai-btn').addEventListener('click', () => {
            soundManager.playClick();
            document.getElementById('mode-modal').classList.remove('show');
            this.startNewGame();
        });

        document.getElementById('play-friend-btn').addEventListener('click', () => {
            soundManager.playClick();
            if (!isFirebaseReady()) {
                alert('Online play is not available right now. Please try again later or play against the computer!');
                return;
            }
            document.getElementById('mode-modal').classList.remove('show');
            this.showLobby();
        });

        // Lobby
        document.getElementById('close-lobby').addEventListener('click', () => {
            document.getElementById('lobby-modal').classList.remove('show');
        });

        // Invite responses
        document.getElementById('accept-invite-btn').addEventListener('click', () => {
            this.multiplayer.acceptInvite();
        });

        document.getElementById('decline-invite-btn').addEventListener('click', () => {
            this.multiplayer.declineInvite();
        });

        // Cancel invite
        document.getElementById('cancel-invite-btn').addEventListener('click', () => {
            this.multiplayer.cancelInvite();
        });
    }

    populateNamePicker() {
        const adjSelect = document.getElementById('name-adjective');
        const nounSelect = document.getElementById('name-noun');

        // Sort alphabetically for easier finding
        const sortedAdj = [...NAME_ADJECTIVES].sort();
        const sortedNouns = [...NAME_NOUNS].sort();

        sortedAdj.forEach(adj => {
            const option = document.createElement('option');
            option.value = adj;
            option.textContent = adj;
            adjSelect.appendChild(option);
        });

        sortedNouns.forEach(noun => {
            const option = document.createElement('option');
            option.value = noun;
            option.textContent = noun;
            nounSelect.appendChild(option);
        });
    }

    updateNamePreview() {
        const adj = document.getElementById('name-adjective').value;
        const noun = document.getElementById('name-noun').value;
        const preview = document.getElementById('name-preview');
        const submitBtn = document.getElementById('username-submit');

        if (adj && noun) {
            preview.textContent = `${adj} ${noun}`;
            preview.classList.add('has-name');
            submitBtn.textContent = "Let's Play!";
        } else if (adj) {
            preview.textContent = `${adj} ...`;
            preview.classList.remove('has-name');
            submitBtn.textContent = 'Random Name';
        } else if (noun) {
            preview.textContent = `... ${noun}`;
            preview.classList.remove('has-name');
            submitBtn.textContent = 'Random Name';
        } else {
            preview.textContent = 'Your name will appear here';
            preview.classList.remove('has-name');
            submitBtn.textContent = 'Random Name';
        }
    }

    getNameThemeSuggestion(adj, noun) {
        // Check if either word suggests a theme based on name selection
        const adjTheme = THEME_NAME_HINTS[adj];
        const nounTheme = THEME_NAME_HINTS[noun];

        // Prefer noun theme, fall back to adjective theme
        return nounTheme || adjTheme || null;
    }

    getThemeDisplayName(themeId) {
        // Find the theme name across all theme sets
        for (const setId of ['fun', 'month', 'color']) {
            if (THEMES[setId] && THEMES[setId][themeId]) {
                const theme = THEMES[setId][themeId];
                // Ensure we return a string, not an object
                if (typeof theme.name === 'string') {
                    return theme.name;
                }
            }
        }
        // Fallback: capitalize the themeId
        return String(themeId).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    getThemeSetForTheme(themeId) {
        // Find which set contains this theme
        for (const setId of ['fun', 'month', 'color']) {
            if (THEMES[setId] && THEMES[setId][themeId]) {
                return setId;
            }
        }
        return 'fun'; // default
    }

    async submitUsername() {
        let adj = document.getElementById('name-adjective').value;
        let noun = document.getElementById('name-noun').value;
        const error = document.getElementById('username-error');
        let wasRandom = false;

        // If either is missing, select random values and apply matching theme
        if (!adj || !noun) {
            wasRandom = true;
            const adjSelect = document.getElementById('name-adjective');
            const nounSelect = document.getElementById('name-noun');

            // Select random values for any missing selections
            if (!adj) {
                const randomAdj = NAME_ADJECTIVES[Math.floor(Math.random() * NAME_ADJECTIVES.length)];
                adjSelect.value = randomAdj;
                adj = randomAdj;
            }
            if (!noun) {
                const randomNoun = NAME_NOUNS[Math.floor(Math.random() * NAME_NOUNS.length)];
                nounSelect.value = randomNoun;
                noun = randomNoun;
            }

            // Update the preview
            this.updateNamePreview();

            // Auto-apply matching theme (no confirmation prompt for random)
            const suggestedTheme = this.getNameThemeSuggestion(adj, noun);
            if (suggestedTheme && typeof suggestedTheme === 'string') {
                const setId = this.getThemeSetForTheme(suggestedTheme);
                this.applyTheme(setId, suggestedTheme);
            }
        }

        error.textContent = '';
        this.pendingUsername = `${adj} ${noun}`;

        // For random names, skip the theme suggestion prompts entirely
        if (wasRandom) {
            await this.completeUsernameSubmission();
            return;
        }

        // Check for theme suggestion based on name (only for manual selections)
        const suggestedTheme = this.getNameThemeSuggestion(adj, noun);

        if (suggestedTheme && typeof suggestedTheme === 'string') {
            if (suggestedTheme === this.currentTheme.id) {
                // Theme already matches - show confirmation message
                document.getElementById('name-theme-message').innerHTML =
                    `<strong>That name matches your theme perfectly!</strong>`;
                document.getElementById('accept-name-theme-btn').style.display = 'none';
                document.getElementById('decline-name-theme-btn').textContent = 'Awesome!';
                document.getElementById('name-theme-modal').classList.add('show');
            } else {
                // Suggest theme switch
                const themeName = this.getThemeDisplayName(suggestedTheme);
                this.pendingThemeSuggestion = suggestedTheme;
                document.getElementById('name-theme-message').innerHTML =
                    `Your name "<strong>${this.pendingUsername}</strong>" matches the <strong>${themeName}</strong> theme! Want to switch to it?`;
                document.getElementById('accept-name-theme-btn').style.display = '';
                document.getElementById('decline-name-theme-btn').textContent = 'No thanks';
                document.getElementById('name-theme-modal').classList.add('show');
            }
        } else {
            await this.completeUsernameSubmission();
        }
    }

    async completeUsernameSubmission() {
        const error = document.getElementById('username-error');

        try {
            await this.multiplayer.setUsername(this.pendingUsername);
            document.getElementById('username-modal').classList.remove('show');
            this.pendingUsername = null;
        } catch (e) {
            error.textContent = 'Error saving username. Try again.';
        }
    }

    async showLobby() {
        document.getElementById('lobby-modal').classList.add('show');
        document.getElementById('lobby-status').textContent = 'Looking for players...';
        document.getElementById('online-players').innerHTML = '';

        const players = await this.multiplayer.getOnlinePlayers();

        if (players.length === 0) {
            document.getElementById('online-players').innerHTML = '<div class="no-players">No other players online right now</div>';
            document.getElementById('lobby-status').textContent = 'Share the link to invite friends!';
        } else {
            document.getElementById('lobby-status').textContent = `${players.length} player${players.length > 1 ? 's' : ''} online`;
            const html = players.map(p => `
                <div class="player-item ${p.inGame ? 'in-game' : ''}" data-userid="${p.id}">
                    <div class="player-status-dot"></div>
                    <span class="player-username">${p.username}</span>
                    <span class="player-status-text">${p.inGame ? 'In game' : 'Available'}</span>
                </div>
            `).join('');
            document.getElementById('online-players').innerHTML = html;

            // Add click handlers
            document.querySelectorAll('.player-item:not(.in-game)').forEach(el => {
                el.addEventListener('click', () => {
                    const userId = el.dataset.userid;
                    this.multiplayer.sendInvite(userId);
                });
            });
        }
    }

    startMultiplayerGame(myDeck, opponentName, isHost) {
        this.isMultiplayerGame = true;
        this.isMyTurn = isHost; // Host (player1) goes first
        this.isPlayerTurn = isHost; // Also set isPlayerTurn for consistency

        // Set up decks
        this.playerDeck = [...myDeck];
        this.opponentDeck = Array(26).fill(null); // Opponent has 26 cards (placeholder for count display)

        // Initialize piles - ensure completely fresh arrays
        const pileCount = this.settings.pileCount;
        this.piles = [];
        this.pileStates = [];
        for (let i = 0; i < pileCount; i++) {
            this.piles.push([]);
            this.pileStates.push(null);
        }

        this.currentCard = null;
        this.gameActive = true;
        this.currentTurnPlayer = isHost ? 'player' : 'opponent';
        this.poisonHintShown = false;

        // Close all modals
        document.getElementById('mode-modal').classList.remove('show');
        document.getElementById('lobby-modal').classList.remove('show');
        document.getElementById('waiting-modal').classList.remove('show');
        document.getElementById('invite-modal').classList.remove('show');
        document.getElementById('win-modal').classList.remove('show');

        // Update opponent name display
        document.querySelector('.player-info.opponent .player-name').innerHTML =
            `<span class="opponent-username">${opponentName}</span>'s Cards`;

        this.renderPilesHTML();
        this.renderPiles();
        this.updateUI();
        this.setStatus(this.isMyTurn ? this.messages.yourTurn : this.messages.opponentTurn.replace('{name}', opponentName));

        if (this.isMyTurn) {
            this.drawCard();
        }
    }

    processRemoteMove(move) {
        if (!this.isMultiplayerGame || this.isMyTurn) return;
        if (!this.gameActive) return; // Game not ready yet

        const card = move.card;
        const pileIndex = move.pile;

        // Validate pile index
        if (pileIndex < 0 || pileIndex >= this.piles.length) return;

        // Mark opponent as playing and decrement their deck count
        this.currentTurnPlayer = 'opponent';
        if (this.opponentDeck.length > 0) {
            this.opponentDeck.pop(); // Decrement opponent deck count
        }
        this.updateUI();

        // Play soft opponent card sound
        soundManager.playOpponentCard();

        // Animate the opponent's card
        this.animateCardToPlay(card, pileIndex, 'opponent', () => {
            this.processCardPlay(card, pileIndex, 'opponent');
        });
    }

    handleMultiplayerWin(didIWin) {
        // Prevent showing duplicate win modals
        if (document.getElementById('win-modal').classList.contains('show')) return;

        this.gameActive = false;

        const modal = document.getElementById('win-modal');
        const content = document.getElementById('win-content');
        const message = document.getElementById('win-message');
        const trophy = document.getElementById('win-trophy');
        const subtitle = document.getElementById('win-subtitle');
        const confettiContainer = document.getElementById('win-confetti');

        // Clear previous confetti
        confettiContainer.innerHTML = '';

        // Remove previous classes and apply correct one
        content.classList.remove('victory', 'defeat');

        if (didIWin) {
            soundManager.playWin();
            content.classList.add('victory');
            message.textContent = "You Win!";
            trophy.textContent = "🏆";
            subtitle.textContent = "Congratulations, Champion!";
            this.createConfetti(confettiContainer);
        } else {
            soundManager.playLose();
            content.classList.add('defeat');
            message.textContent = "You Lose!";
            trophy.textContent = "😢";
            subtitle.textContent = "Better luck next time!";
        }

        // Show rematch button for multiplayer games
        const rematchBtn = document.getElementById('rematch-btn');
        const rematchStatus = document.getElementById('rematch-status');
        rematchBtn.style.display = 'inline-block';
        rematchBtn.disabled = false;
        rematchBtn.textContent = 'Rematch?';
        rematchStatus.style.display = 'none';

        modal.classList.add('show');

        // End the multiplayer game but keep rematch info
        this.multiplayer.endGame(true);
    }

    handleOpponentLeft() {
        if (!this.isMultiplayerGame || !this.gameActive) return;

        this.gameActive = false;

        const opponentName = this.multiplayer.opponentUsername || 'Opponent';
        document.getElementById('win-message').textContent = `${opponentName} left the game`;
        document.getElementById('win-modal').classList.add('show');

        // Show departure animation
        const animationEl = document.getElementById('win-animation');
        animationEl.innerHTML = '';
        const symbols = ['👋', '🚪', '💨', '🏃'];
        for (let i = 0; i < 15; i++) {
            const span = document.createElement('span');
            span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            span.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 20}px;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 2 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            animationEl.appendChild(span);
        }

        // End the multiplayer game (no rematch option when opponent left)
        document.getElementById('rematch-btn').style.display = 'none';
        this.multiplayer.endGame();
    }

    async handleRematchRequest() {
        const rematchBtn = document.getElementById('rematch-btn');
        const rematchStatus = document.getElementById('rematch-status');
        const opponentName = this.multiplayer.rematchOpponentUsername || 'Opponent';

        // Disable button and show waiting status
        rematchBtn.disabled = true;
        rematchBtn.textContent = 'Waiting...';
        rematchStatus.style.display = 'block';
        rematchStatus.textContent = `Waiting for ${opponentName}...`;

        // Request rematch
        const bothWantRematch = await this.multiplayer.requestRematch();

        if (bothWantRematch) {
            rematchStatus.textContent = 'Starting rematch!';

            // Close win modal
            document.getElementById('win-modal').classList.remove('show');

            // Reset UI
            rematchBtn.style.display = 'none';
            rematchStatus.style.display = 'none';

            // Start the rematch
            await this.multiplayer.startRematch();
        } else {
            rematchStatus.textContent = `${opponentName} didn't respond`;
            rematchBtn.textContent = 'Rematch?';
            rematchBtn.disabled = false;

            // Hide after a moment
            setTimeout(() => {
                rematchStatus.style.display = 'none';
            }, 3000);
        }
    }

    showModeSelection() {
        // Close win modal if open
        document.getElementById('win-modal').classList.remove('show');

        // End any existing multiplayer game
        if (this.isMultiplayerGame && this.multiplayer) {
            this.multiplayer.endGame();
        }

        // Reset multiplayer state
        this.isMultiplayerGame = false;

        // Reset opponent name display
        document.querySelector('.player-info.opponent .player-name').textContent = "Opponent's Cards";

        // Update Players button based on Firebase availability
        const playersBtn = document.getElementById('play-friend-btn');
        if (!isFirebaseReady()) {
            playersBtn.classList.add('disabled');
            playersBtn.title = 'Online play unavailable';
        } else {
            playersBtn.classList.remove('disabled');
            playersBtn.title = '';
        }

        // Show mode selection
        document.getElementById('mode-modal').classList.add('show');
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
        const skillLevelSelect = document.getElementById('skill-level');
        const hintsToggle = document.getElementById('hints-and-tips');
        const soundToggle = document.getElementById('sound-effects');

        if (pileCountSelect) {
            pileCountSelect.value = this.settings.pileCount.toString();
        }
        if (jackOnJackToggle) {
            jackOnJackToggle.checked = this.settings.jackOnJack;
        }
        if (skillLevelSelect) {
            skillLevelSelect.value = this.settings.skillLevel;
        }
        if (hintsToggle) {
            hintsToggle.checked = this.settings.hintsAndTips;
        }
        if (soundToggle) {
            soundToggle.checked = this.settings.soundEffects;
        }
        // Apply sound setting to sound manager
        soundManager.enabled = this.settings.soundEffects;
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
            // Show suggestion after loading screen is gone (loads at T+2750ms)
            setTimeout(() => {
                this.showThemeSuggestion(suggestion);
            }, 3000);
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

        // Add click handlers - apply theme immediately
        grid.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                const setId = card.dataset.set;
                const themeId = card.dataset.theme;
                // Apply theme immediately
                this.applyTheme(setId, themeId);
                // Update visual selection state
                grid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                // Close modal
                document.getElementById('theme-modal').classList.remove('show');
            });
        });
    }

    cancelThemeSelection() {
        document.getElementById('theme-modal').classList.remove('show');
    }

    initializeEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => {
            soundManager.playClick();
            this.showModeSelection();
        });
        document.getElementById('play-again-btn').addEventListener('click', () => {
            soundManager.playClick();
            // Hide rematch button when going back to mode selection
            document.getElementById('rematch-btn').style.display = 'none';
            document.getElementById('rematch-status').style.display = 'none';
            this.showModeSelection();
        });

        document.getElementById('rematch-btn').addEventListener('click', async () => {
            soundManager.playClick();
            await this.handleRematchRequest();
        });
        document.getElementById('rules-btn').addEventListener('click', () => {
            soundManager.playClick();
            this.showRules();
        });
        document.getElementById('close-rules').addEventListener('click', () => this.hideRules());

        // Share QR modal listeners
        document.getElementById('share-btn').addEventListener('click', () => this.showQRModal());
        document.getElementById('close-qr').addEventListener('click', () => this.hideQRModal());

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

        document.getElementById('skill-level').addEventListener('change', (e) => {
            this.settings.skillLevel = e.target.value;
            this.saveSettings();
        });

        document.getElementById('hints-and-tips').addEventListener('change', (e) => {
            this.settings.hintsAndTips = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('sound-effects').addEventListener('change', (e) => {
            this.settings.soundEffects = e.target.checked;
            soundManager.enabled = this.settings.soundEffects;
            this.saveSettings();
        });

        // Close modals when clicking outside
        document.getElementById('rules-modal').addEventListener('click', (e) => {
            if (e.target.id === 'rules-modal') this.hideRules();
        });

        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') this.hideSettings();
        });

        document.getElementById('qr-modal').addEventListener('click', (e) => {
            if (e.target.id === 'qr-modal') this.hideQRModal();
        });

        // Change name button
        document.getElementById('change-name-btn').addEventListener('click', () => this.showChangeNameModal());

        // Theme modal listeners
        document.getElementById('theme-btn').addEventListener('click', () => this.showThemeModal());
        document.getElementById('theme-cancel-btn').addEventListener('click', () => this.cancelThemeSelection());
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

    showChangeNameModal() {
        // Reset the dropdowns to show current name if we have one
        const currentName = this.multiplayer?.username;
        if (currentName) {
            const parts = currentName.split(' ');
            if (parts.length >= 2) {
                const adjSelect = document.getElementById('name-adjective');
                const nounSelect = document.getElementById('name-noun');
                // Try to set the values if they exist in the lists
                if (NAME_ADJECTIVES.includes(parts[0])) {
                    adjSelect.value = parts[0];
                }
                if (NAME_NOUNS.includes(parts[1])) {
                    nounSelect.value = parts[1];
                }
            }
        }
        this.updateNamePreview();
        document.getElementById('username-modal').classList.add('show');
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

        // Reload settings from localStorage to ensure we have the latest
        this.loadSettings();

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
        this.poisonHintShown = false;

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
        // Check turn based on game mode
        const canDraw = this.isMultiplayerGame ? this.isMyTurn : this.isPlayerTurn;
        if (!this.gameActive || !canDraw || this.currentCard) return;

        if (this.playerDeck.length === 0) {
            this.checkWinCondition();
            return;
        }

        this.currentCard = this.playerDeck.pop();
        this.renderCurrentCard();
        this.updateUI();
        this.setStatus(this.messages.clickPile);
        this.highlightPiles(true);
    }

    playCardOnPile(pileIndex) {
        // In multiplayer, check if it's my turn
        if (this.isMultiplayerGame) {
            if (!this.gameActive || !this.isMyTurn || !this.currentCard) return;
        } else {
            if (!this.gameActive || !this.isPlayerTurn || !this.currentCard) return;
        }

        // Play soft card sound
        soundManager.playCardPlay();

        const card = this.currentCard;
        this.currentCard = null;
        this.highlightPiles(false);

        // Mark that player is currently playing
        this.currentTurnPlayer = 'player';

        // In multiplayer, send move to Firebase
        if (this.isMultiplayerGame && this.multiplayer) {
            this.multiplayer.sendMove(card, pileIndex);
            this.isMyTurn = false;
        }

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
                    // Jack on Jack = the OTHER player takes pile (JACKED!)
                    this.showPushPopup('JACKED!');
                    this.setStatus(isPlayer ? this.messages.youGotJacked : this.messages.opponentGotJacked);

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
                this.setStatus(isPlayer ? this.messages.specialOnSpecialYou : this.messages.specialOnSpecialOpp);

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
                this.setStatus(this.messages.opponentPlayed.replace('{card}', `${card.rank}${this.suitSymbols[card.suit]}`));
            }
        } else if (pileState) {
            // Number card played on a pile with an active special card
            pileState.count++;

            if (pileState.count >= pileState.targetCount) {
                // Push! The player who completed the push forces their OPPONENT to take the pile
                // isPlayer = true means player completed the push, so opponent takes pile
                // isPlayer = false means opponent completed the push, so player takes pile
                this.renderPiles();
                this.updateUI();
                this.showPushPopup();
                this.setStatus(isPlayer ? this.messages.pushOppTake : this.messages.pushYouTake);

                setTimeout(() => {
                    // Third param: isPlayer just played, so pass isPlayer
                    this.animatePileTake(pileIndex, !isPlayer, isPlayer);
                }, 1500);
                return;
            } else if (!isPlayer) {
                this.setStatus(this.messages.opponentPlayed.replace('{card}', `${card.rank}${this.suitSymbols[card.suit]}`));
            }
        } else if (!isPlayer) {
            this.setStatus(this.messages.opponentPlayed.replace('{card}', `${card.rank}${this.suitSymbols[card.suit]}`));
        }

        this.renderPiles();
        this.updateUI();

        // Check win condition
        if (this.checkWinCondition()) return;

        // Switch turns - strictly alternate
        this.switchTurn();

        // Check for hints AFTER turn switches (so we warn the player whose turn it now is)
        if (this.checkAllPilesAtTwoToPush()) {
            this.showWatchOutHint();
        }
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

        // Log Expert rule to console if applicable
        if (this.settings.skillLevel === 'expert' && this.lastExpertRule) {
            console.log(this.lastExpertRule);
        }

        // Play soft opponent card sound
        soundManager.playOpponentCard();

        // Animate card moving to pile, then process the play
        this.animateCardToPlay(card, pileIndex, 'opponent', () => {
            this.processCardPlay(card, pileIndex, 'opponent');
        });
    }

    // Calculate pile score using scoring system: J=10, K=5, A=2, Q=2, numbers=1
    calculatePileScore(pileIndex) {
        const scoreValues = { 'J': 10, 'K': 5, 'A': 2, 'Q': 2 };
        return this.piles[pileIndex].reduce((sum, card) => {
            return sum + (scoreValues[card.rank] || 1);
        }, 0);
    }

    // Main AI dispatcher - chooses strategy based on skill level
    chooseOpponentPile(card) {
        switch (this.settings.skillLevel) {
            case 'kid':
                this.lastExpertRule = '';
                return this.chooseRandomPile();
            case 'fun':
                this.lastExpertRule = '';
                return this.chooseFunPile(card);
            case 'expert':
            default:
                const result = this.chooseExpertPile(card);
                this.lastExpertRule = result.rule;
                return result.pile;
        }
    }

    // Kid strategy - completely random
    chooseRandomPile() {
        const pileCount = this.settings.pileCount;
        return Math.floor(Math.random() * pileCount);
    }

    // Fun strategy - original basic AI logic
    chooseFunPile(card) {
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

        // Number card: try to complete a push (forces player to take pile)
        for (const i of validPiles) {
            const state = this.pileStates[i];
            if (state && state.targetCount > 0) {
                if (state.count + 1 >= state.targetCount) {
                    return i; // This will complete the push!
                }
            }
        }

        // Try to play on empty pile or pile without countdown
        for (const i of validPiles) {
            const state = this.pileStates[i];
            if (!state || state.targetCount === 0) {
                return i;
            }
        }

        // Play on pile with most progress (closest to pushing)
        let bestPile = 0;
        let bestProgress = -1;
        for (const i of validPiles) {
            const state = this.pileStates[i];
            if (state && state.targetCount > 0) {
                const progress = state.count / state.targetCount;
                if (progress > bestProgress) {
                    bestProgress = progress;
                    bestPile = i;
                }
            }
        }

        return bestPile;
    }

    // Expert strategy - applies 6 rules in priority order
    chooseExpertPile(card) {
        const pileCount = this.settings.pileCount;
        const validPiles = Array.from({ length: pileCount }, (_, i) => i);

        // Rule 1: Jack-on-Jack opportunity
        if (this.settings.jackOnJack && card.rank === 'J') {
            for (const i of validPiles) {
                const pile = this.piles[i];
                if (pile.length > 0) {
                    const topCard = pile[pile.length - 1];
                    if (topCard.rank === 'J') {
                        return { pile: i, rule: 'Rule #1 | Condition: Jack-on-Jack opportunity | Action: Play Jack on Jack' };
                    }
                }
            }
        }

        // Rule 2: Push opportunity (number card, can complete push, pick highest score)
        // When AI completes a push, the PLAYER takes the pile - always good for AI!
        if (!this.isSpecialCard(card)) {
            let bestPile = -1;
            let bestScore = -1;
            for (const i of validPiles) {
                const state = this.pileStates[i];
                if (state && state.targetCount > 0) {
                    const remaining = state.targetCount - state.count;
                    if (remaining === 1) {
                        const score = this.calculatePileScore(i);
                        if (score > bestScore) {
                            bestScore = score;
                            bestPile = i;
                        }
                    }
                }
            }
            if (bestPile >= 0) {
                return { pile: bestPile, rule: `Rule #2 | Condition: Push opportunity (1 card remaining) | Action: Push pile for ${bestScore} points` };
            }
        }

        // Rule 3: Defensive play
        // Check if ALL piles with active countdowns need exactly 2 cards to push
        // (and there are no "safe" piles - empty or without countdown)
        const pilesWithCountdown = validPiles.filter(i => {
            const state = this.pileStates[i];
            return state && state.targetCount > 0;
        });
        const pilesWithoutCountdown = validPiles.filter(i => {
            const state = this.pileStates[i];
            return !state || state.targetCount === 0;
        });
        // All piles dangerous = all have countdown AND all need exactly 2, AND no safe piles
        const allPilesHave2 = pilesWithCountdown.length > 0 &&
            pilesWithoutCountdown.length === 0 &&
            pilesWithCountdown.every(i => {
                const state = this.pileStates[i];
                return (state.targetCount - state.count) === 2;
            });

        // OR if Jack and any pile has number on top
        const jackOnNumber = card.rank === 'J' && validPiles.some(i => {
            const pile = this.piles[i];
            return pile.length > 0 && !this.isSpecialCard(pile[pile.length - 1]);
        });

        if ((!this.isSpecialCard(card) && allPilesHave2) || jackOnNumber) {
            // Find pile with lowest score
            let lowestPile = validPiles[0];
            let lowestScore = Infinity;
            for (const i of validPiles) {
                // For Jack, prefer piles with number cards on top
                if (card.rank === 'J') {
                    const pile = this.piles[i];
                    if (pile.length > 0 && !this.isSpecialCard(pile[pile.length - 1])) {
                        const score = this.calculatePileScore(i);
                        if (score < lowestScore) {
                            lowestScore = score;
                            lowestPile = i;
                        }
                    }
                } else {
                    const score = this.calculatePileScore(i);
                    if (score < lowestScore) {
                        lowestScore = score;
                        lowestPile = i;
                    }
                }
            }
            return { pile: lowestPile, rule: 'Rule #3 | Condition: All piles at 2 OR Jack on number | Action: Play on lowest-scoring pile' };
        }

        // Rule 4: Number card - favor safe piles, then large piles
        if (!this.isSpecialCard(card)) {
            // First priority: empty piles (safest)
            const emptyPiles = validPiles.filter(i => this.piles[i].length === 0);
            if (emptyPiles.length > 0) {
                return { pile: emptyPiles[0], rule: 'Rule #4 | Condition: Number card, empty pile available | Action: Play on empty pile' };
            }

            // Second priority: piles without countdown (just number cards, no special)
            const safePiles = validPiles.filter(i => {
                const state = this.pileStates[i];
                return !state || state.targetCount === 0;
            });
            if (safePiles.length > 0) {
                // Pick the largest safe pile
                let bestPile = safePiles[0];
                let maxCards = this.piles[safePiles[0]].length;
                for (const i of safePiles) {
                    if (this.piles[i].length > maxCards) {
                        maxCards = this.piles[i].length;
                        bestPile = i;
                    }
                }
                return { pile: bestPile, rule: 'Rule #4 | Condition: Number card, safe pile available | Action: Play on largest safe pile' };
            }

            // Third priority: piles with most cards remaining to push (least dangerous)
            let bestPile = validPiles[0];
            let mostRemaining = -1;
            for (const i of validPiles) {
                const state = this.pileStates[i];
                const remaining = state ? (state.targetCount - state.count) : 0;
                if (remaining > mostRemaining) {
                    mostRemaining = remaining;
                    bestPile = i;
                }
            }
            return { pile: bestPile, rule: 'Rule #4 | Condition: Number card, no safe pile | Action: Play on least dangerous pile' };
        }

        // Rule 5: Special card strategy
        if (this.isSpecialCard(card)) {
            const aiCards = this.opponentDeck.length;
            const playerCards = this.playerDeck.length;

            // Find piles with number cards on top (for "reset")
            const pilesWithNumbers = validPiles.filter(i => {
                const pile = this.piles[i];
                return pile.length > 0 && !this.isSpecialCard(pile[pile.length - 1]);
            });

            // Find empty piles
            const emptyPiles = validPiles.filter(i => this.piles[i].length === 0);

            if (aiCards < playerCards) {
                // Losing: reset largest pile
                if (pilesWithNumbers.length > 0) {
                    let largestPile = pilesWithNumbers[0];
                    let maxCards = this.piles[pilesWithNumbers[0]].length;
                    for (const i of pilesWithNumbers) {
                        if (this.piles[i].length > maxCards) {
                            maxCards = this.piles[i].length;
                            largestPile = i;
                        }
                    }
                    return { pile: largestPile, rule: 'Rule #5 | Condition: Special card, AI behind | Action: Reset largest pile' };
                }
            } else {
                // Winning or tied: use empty pile or reset smallest
                if (emptyPiles.length > 0) {
                    return { pile: emptyPiles[0], rule: 'Rule #5 | Condition: Special card, AI ahead/tied | Action: Start fresh pile' };
                }
                if (pilesWithNumbers.length > 0) {
                    let smallestPile = pilesWithNumbers[0];
                    let minCards = this.piles[pilesWithNumbers[0]].length;
                    for (const i of pilesWithNumbers) {
                        if (this.piles[i].length < minCards) {
                            minCards = this.piles[i].length;
                            smallestPile = i;
                        }
                    }
                    return { pile: smallestPile, rule: 'Rule #5 | Condition: Special card, AI ahead/tied, no empty | Action: Reset smallest pile' };
                }
            }
        }

        // Rule 6: Fallback to Fun strategy
        return { pile: this.chooseFunPile(card), rule: 'Rule #6 | Condition: No other rule applies | Action: Use Fun strategy' };
    }

    isSpecialCard(card) {
        return this.specialCards.includes(card.rank);
    }

    checkWinCondition() {
        if (this.playerDeck.length === 0 && !this.currentCard) {
            this.gameActive = false;
            if (this.isMultiplayerGame) {
                // In multiplayer, show win locally AND notify Firebase
                this.handleMultiplayerWin(true);
                this.multiplayer.setWinner(true);
            } else {
                this.showWinModal(true);
            }
            return true;
        }
        if (this.opponentDeck.length === 0) {
            this.gameActive = false;
            if (this.isMultiplayerGame) {
                // In multiplayer, show loss locally AND notify Firebase
                this.handleMultiplayerWin(false);
                this.multiplayer.setWinner(false);
            } else {
                this.showWinModal(false);
            }
            return true;
        }
        return false;
    }

    showWinModal(playerWon) {
        const modal = document.getElementById('win-modal');
        const content = document.getElementById('win-content');
        const message = document.getElementById('win-message');
        const trophy = document.getElementById('win-trophy');
        const subtitle = document.getElementById('win-subtitle');
        const confettiContainer = document.getElementById('win-confetti');

        // Clear previous confetti
        confettiContainer.innerHTML = '';

        // Hide rematch button for AI games
        document.getElementById('rematch-btn').style.display = 'none';
        document.getElementById('rematch-status').style.display = 'none';

        // Remove previous classes
        content.classList.remove('victory', 'defeat');

        if (playerWon) {
            soundManager.playWin();
            content.classList.add('victory');
            message.textContent = "You Win!";
            trophy.textContent = "🏆";
            subtitle.textContent = "Congratulations, Champion!";
            // Create confetti
            this.createConfetti(confettiContainer);
        } else {
            soundManager.playLose();
            content.classList.add('defeat');
            message.textContent = "You Lose!";
            trophy.textContent = "😢";
            subtitle.textContent = "Better luck next time!";
        }

        modal.classList.add('show');
    }

    createConfetti(container) {
        const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22'];
        const shapes = ['▲', '●', '■', '★', '♦'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.fontSize = (Math.random() * 10 + 8) + 'px';
            confetti.style.animationDelay = (Math.random() * 2) + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
        }
    }

    showRules() {
        document.getElementById('rules-modal').classList.add('show');
    }

    hideRules() {
        document.getElementById('rules-modal').classList.remove('show');
    }

    showQRModal() {
        document.getElementById('qr-modal').classList.add('show');
    }

    hideQRModal() {
        document.getElementById('qr-modal').classList.remove('show');
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

    showPushPopup(message = 'PUSH!') {
        const popup = document.createElement('div');
        popup.className = 'push-popup';

        // Play appropriate sound
        if (message === 'JACKED!') {
            soundManager.playJacked();
        } else {
            soundManager.playPush();
        }

        // Create logo-style letters
        const letters = message.split('');
        letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.className = letter === '!' ? 'push-exclaim' : 'push-letter';
            span.style.setProperty('--i', i);
            span.textContent = letter;
            popup.appendChild(span);
        });

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 1500);
    }

    // Check if all piles are at "2 to push" and player should be warned
    checkAllPilesAtTwoToPush() {
        if (!this.settings.hintsAndTips) return false;

        // Only show to the player whose turn it is
        const isMyTurn = this.isMultiplayerGame ? this.isMyTurn : this.isPlayerTurn;
        if (!isMyTurn) return false;

        // Only show if the player does NOT have a special card
        if (this.currentCard && this.isSpecialCard(this.currentCard)) return false;

        const pileCount = this.settings.pileCount;
        let pilesAtTwo = 0;
        let activePiles = 0;

        for (let i = 0; i < pileCount; i++) {
            const pileState = this.pileStates[i];
            if (pileState) {
                activePiles++;
                const remaining = pileState.targetCount - pileState.count;
                if (remaining === 2) {
                    pilesAtTwo++;
                }
            }
        }

        // All piles must be active AND all at exactly 2 to push
        return activePiles === pileCount && pilesAtTwo === pileCount;
    }

    // Show "Watch out!" hint with slam effect
    showWatchOutHint() {
        // Prevent showing multiple times in a row
        if (this.poisonHintShown) return;
        this.poisonHintShown = true;

        // Create container
        const container = document.createElement('div');
        container.className = 'watchout-hint-container';

        // Create slam burst lines
        for (let i = 0; i < 12; i++) {
            const line = document.createElement('div');
            line.className = 'slam-line';
            line.style.transform = `rotate(${i * 30}deg)`;
            container.appendChild(line);
        }

        // Create text
        const text = document.createElement('div');
        text.className = 'watchout-hint-text';
        text.textContent = 'Watch out!';
        container.appendChild(text);

        document.body.appendChild(container);

        // Remove after animation
        setTimeout(() => {
            container.remove();
            this.poisonHintShown = false;
        }, 2000);
    }

    animatePileTake(pileIndex, toPlayer, playerJustPlayed) {
        const pile = this.piles[pileIndex];
        const pileEl = document.getElementById(`pile-${pileIndex}`);
        const pileRect = pileEl.getBoundingClientRect();
        const cardCount = pile.length;

        // Play shuffle sound at start
        soundManager.playShuffle();

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
                // Play card flip sound for each card
                soundManager.playCardFlip();

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
        // In multiplayer, handle turn switching differently
        if (this.isMultiplayerGame) {
            if (this.currentTurnPlayer === 'player') {
                // I just finished, opponent's turn
                this.currentTurnPlayer = 'opponent';
                this.isMyTurn = false;
                this.isPlayerTurn = false;
                const oppName = this.multiplayer.opponentUsername || 'Opponent';
                this.setStatus(this.messages.opponentTurn.replace('{name}', oppName));
                // Don't call opponentTurn() - wait for Firebase update
            } else {
                // Opponent just finished, my turn
                this.currentTurnPlayer = 'player';
                this.isMyTurn = true;
                this.isPlayerTurn = true;
                this.setStatus(this.messages.yourTurn);
                setTimeout(() => this.drawCard(), 300);
            }
        } else {
            // AI mode - original logic
            if (this.currentTurnPlayer === 'player') {
                // Player just finished, opponent's turn
                this.currentTurnPlayer = 'opponent';
                this.isPlayerTurn = false;
                this.setStatus(this.messages.opponentThinking);
                setTimeout(() => this.opponentTurn(), 300);
            } else {
                // Opponent just finished, player's turn
                this.currentTurnPlayer = 'player';
                this.isPlayerTurn = true;
                setTimeout(() => this.drawCard(), 300);
            }
        }
    }

    updateUI() {
        // Card count includes current card (drawn but not yet played)
        const playerCount = this.playerDeck.length + (this.currentCard ? 1 : 0);
        document.getElementById('player-count').textContent = playerCount;
        document.getElementById('opponent-count').textContent = this.opponentDeck.length;

        // Update deck visibility
        const playerDeckEl = document.getElementById('player-deck');
        const opponentDeckEl = document.getElementById('opponent-deck');

        playerDeckEl.style.opacity = playerCount > 0 ? '1' : '0.3';
        opponentDeckEl.style.opacity = this.opponentDeck.length > 0 ? '1' : '0.3';
    }

    renderCurrentCard() {
        const container = document.getElementById('current-card');

        if (!this.currentCard) {
            container.innerHTML = `
                <div class="card placeholder">
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

                // Show pile state info (always include card count)
                if (pileState) {
                    const remaining = pileState.targetCount - pileState.count;
                    const owner = pileState.playedBy === 'player' ? 'Your' : "Opponent's";
                    infoContainer.innerHTML = `${pile.length} cards<br>${owner} ${pileState.specialCard}: ${remaining} to push`;
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
document.addEventListener('DOMContentLoaded', async () => {
    window.game = new PushGame();

    // Wait for multiplayer initialization to complete (Firebase connection)
    await window.game.multiplayer.waitForInit();

    // Check if user needs to set username
    const hasUsername = window.game.multiplayer.hasUsername();

    if (!hasUsername) {
        // Show username modal first
        document.getElementById('username-modal').classList.add('show');
    }

    // Handle loading modal - auto fade after 1.75 seconds
    const loadingModal = document.getElementById('loading-modal');
    setTimeout(() => {
        loadingModal.classList.add('fading');

        // Play logo fade sound and initialize audio context
        soundManager.init();
        soundManager.playLogoFade();

        setTimeout(() => {
            loadingModal.classList.remove('show');
            loadingModal.classList.remove('fading');

            // If user already has username, show mode selection
            if (hasUsername) {
                document.getElementById('mode-modal').classList.add('show');
            }
        }, 1000); // 1 second fade duration
    }, 1750); // 1.75 second delay before fade

    // When username is submitted, show mode selection
    const originalSubmit = window.game.submitUsername.bind(window.game);
    window.game.submitUsername = async function() {
        await originalSubmit();
        if (window.game.multiplayer.hasUsername()) {
            document.getElementById('mode-modal').classList.add('show');
        }
    };
});
