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

try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} catch (e) {
    console.log('Firebase initialization failed:', e);
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

        this.initializeUser();
    }

    initializeUser() {
        // Check for existing user in cookies
        const savedUserId = getCookie('pushUserId');
        const savedUsername = getCookie('pushUsername');

        if (savedUserId && savedUsername) {
            this.userId = savedUserId;
            this.username = savedUsername;
            this.goOnline();
        }
    }

    hasUsername() {
        return this.username !== null;
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
        const waitStartTime = Date.now();

        gamesRef.on('child_added', (snapshot) => {
            const game = snapshot.val();
            // Check it's from the right host, is currently playing, and was created recently (within last 60 seconds)
            const gameCreatedAt = game.createdAt || 0;
            const isRecentGame = (Date.now() - gameCreatedAt) < 60000;

            if (game.player1 === hostId && game.status === 'playing' && isRecentGame && !game.winner) {
                this.joinGame(snapshot.key, game);
                gamesRef.off();
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

        // Listen for response
        inviteRef.on('value', async (snapshot) => {
            const invite = snapshot.val();
            if (!invite) return;

            if (invite.status === 'accepted') {
                inviteRef.off();
                document.getElementById('waiting-modal').classList.remove('show');
                await this.createGame();
            } else if (invite.status === 'declined') {
                inviteRef.off();
                document.getElementById('waiting-modal').classList.remove('show');
                alert(`${targetName} declined the invite`);
                this.opponentId = null;
                this.opponentUsername = null;
            }
        });

        // Auto-cancel after 30 seconds
        setTimeout(async () => {
            const snap = await inviteRef.once('value');
            if (snap.val() && snap.val().status === 'pending') {
                await inviteRef.remove();
                document.getElementById('waiting-modal').classList.remove('show');
                alert('Invite expired');
            }
        }, 30000);
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

        // Show message bar
        document.getElementById('message-bar').style.display = 'block';
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

    async sendMessage(text) {
        if (!this.currentGameId) return;

        await database.ref(`games/${this.currentGameId}/messages`).push({
            from: this.userId,
            text: text,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
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

    async endGame() {
        if (!this.currentGameId) return;

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

        // Hide message bar
        document.getElementById('message-bar').style.display = 'none';

        this.currentGameId = null;
        this.isMultiplayer = false;
        this.isHost = false;
        this.opponentId = null;
        this.opponentUsername = null;
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
            skillLevel: 'expert'  // 'kid', 'fun', 'expert'
        };

        // For Expert mode status display
        this.lastExpertRule = '';

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
        // Username modal
        document.getElementById('username-submit').addEventListener('click', () => this.submitUsername());
        document.getElementById('username-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitUsername();
        });

        // Mode selection
        document.getElementById('play-ai-btn').addEventListener('click', () => {
            document.getElementById('mode-modal').classList.remove('show');
            this.startNewGame();
        });

        document.getElementById('play-friend-btn').addEventListener('click', () => {
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

        // Message sending
        document.getElementById('message-select').addEventListener('change', (e) => {
            if (e.target.value) {
                this.multiplayer.sendMessage(e.target.value);
                e.target.value = '';
            }
        });
    }

    async submitUsername() {
        const input = document.getElementById('username-input');
        const error = document.getElementById('username-error');
        const username = input.value.trim();

        // Validate
        if (username.length < 3) {
            error.textContent = 'Username must be at least 3 characters';
            return;
        }

        if (username.length > 15) {
            error.textContent = 'Username must be 15 characters or less';
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            error.textContent = 'Only letters, numbers, and underscore allowed';
            return;
        }

        error.textContent = '';

        try {
            await this.multiplayer.setUsername(username);
            document.getElementById('username-modal').classList.remove('show');
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

        // Initialize piles
        const pileCount = this.settings.pileCount;
        this.piles = Array.from({ length: pileCount }, () => []);
        this.pileStates = Array.from({ length: pileCount }, () => null);

        this.currentCard = null;
        this.gameActive = true;
        this.currentTurnPlayer = isHost ? 'player' : 'opponent';

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
        this.setStatus(this.isMyTurn ? 'Your turn!' : `${opponentName}'s turn...`);

        if (this.isMyTurn) {
            this.drawCard();
        }
    }

    processRemoteMove(move) {
        if (!this.isMultiplayerGame || this.isMyTurn) return;

        const card = move.card;
        const pileIndex = move.pile;

        // Mark opponent as playing and decrement their deck count
        this.currentTurnPlayer = 'opponent';
        if (this.opponentDeck.length > 0) {
            this.opponentDeck.pop(); // Decrement opponent deck count
        }
        this.updateUI();

        // Animate the opponent's card
        this.animateCardToPlay(card, pileIndex, 'opponent', () => {
            this.processCardPlay(card, pileIndex, 'opponent');
        });
    }

    handleMultiplayerWin(didIWin) {
        // Don't show win modal if game isn't active (prevents stale Firebase data)
        if (!this.gameActive) return;

        this.gameActive = false;

        const message = didIWin ? 'You Win!' : 'You Lose!';
        document.getElementById('win-message').textContent = message;
        document.getElementById('win-modal').classList.add('show');

        // Create celebration or commiseration animation
        const animationEl = document.getElementById('win-animation');
        animationEl.innerHTML = '';

        const symbols = didIWin ? ['🎉', '🏆', '⭐', '🎊'] : ['😢', '💔', '🙁', '😞'];
        for (let i = 0; i < 20; i++) {
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

        // End the multiplayer game
        this.multiplayer.endGame();
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

        // End the multiplayer game
        this.multiplayer.endGame();
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

        if (pileCountSelect) {
            pileCountSelect.value = this.settings.pileCount.toString();
        }
        if (jackOnJackToggle) {
            jackOnJackToggle.checked = this.settings.jackOnJack;
        }
        if (skillLevelSelect) {
            skillLevelSelect.value = this.settings.skillLevel;
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
        document.getElementById('new-game-btn').addEventListener('click', () => this.showModeSelection());
        document.getElementById('play-again-btn').addEventListener('click', () => this.showModeSelection());
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

        document.getElementById('skill-level').addEventListener('change', (e) => {
            this.settings.skillLevel = e.target.value;
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
        this.setStatus("Click a pile to play your card!");
        this.highlightPiles(true);
    }

    playCardOnPile(pileIndex) {
        // In multiplayer, check if it's my turn
        if (this.isMultiplayerGame) {
            if (!this.gameActive || !this.isMyTurn || !this.currentCard) return;
        } else {
            if (!this.gameActive || !this.isPlayerTurn || !this.currentCard) return;
        }

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
                    // Jack on Jack = the OTHER player takes pile (PUSH!)
                    this.showPushPopup();
                    this.setStatus(isPlayer ? "Jack on Jack! Opponent takes the pile!" : "Jack on Jack! You take the pile!");

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
                this.setStatus(isPlayer ? "Special on special! You take the pile!" : "Special on special! Opponent takes the pile.");

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
                this.setStatus(`Opponent played ${card.rank}${this.suitSymbols[card.suit]} - ${this.pushCounts[card.rank]} number cards to push!`);
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
                this.setStatus(isPlayer ? "PUSH! Opponent takes the pile!" : "PUSH! You take the pile!");

                setTimeout(() => {
                    // Third param: isPlayer just played, so pass isPlayer
                    this.animatePileTake(pileIndex, !isPlayer, isPlayer);
                }, 1500);
                return;
            } else if (!isPlayer) {
                const remaining = pileState.targetCount - pileState.count;
                this.setStatus(`Opponent played ${card.rank}${this.suitSymbols[card.suit]} - ${remaining} more to push!`);
            }
        } else if (!isPlayer) {
            this.setStatus(`Opponent played ${card.rank}${this.suitSymbols[card.suit]} on Pile ${pileIndex + 1}`);
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

        // Log Expert rule to console if applicable
        if (this.settings.skillLevel === 'expert' && this.lastExpertRule) {
            console.log(this.lastExpertRule);
        }

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
        if (!this.isSpecialCard(card)) {
            let bestPile = -1;
            let bestScore = -1;
            for (const i of validPiles) {
                const state = this.pileStates[i];
                if (state && state.playedBy === 'player') {
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
                // In multiplayer, notify Firebase that I won
                this.multiplayer.setWinner(true);
            } else {
                this.showWinModal(true);
            }
            return true;
        }
        if (this.opponentDeck.length === 0) {
            this.gameActive = false;
            if (this.isMultiplayerGame) {
                // In multiplayer, notify Firebase that opponent won
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
        const message = document.getElementById('win-message');
        const animation = document.getElementById('win-animation');

        if (playerWon) {
            message.textContent = "🎉 You Win! 🎉";
            message.style.color = '#f1c40f';
            animation.textContent = "🏆";
        } else {
            message.textContent = "Opponent Wins!";
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
        // In multiplayer, handle turn switching differently
        if (this.isMultiplayerGame) {
            if (this.currentTurnPlayer === 'player') {
                // I just finished, opponent's turn
                this.currentTurnPlayer = 'opponent';
                this.isMyTurn = false;
                this.isPlayerTurn = false;
                this.setStatus(`${this.multiplayer.opponentUsername}'s turn...`);
                // Don't call opponentTurn() - wait for Firebase update
            } else {
                // Opponent just finished, my turn
                this.currentTurnPlayer = 'player';
                this.isMyTurn = true;
                this.isPlayerTurn = true;
                this.setStatus('Your turn!');
                setTimeout(() => this.drawCard(), 300);
            }
        } else {
            // AI mode - original logic
            if (this.currentTurnPlayer === 'player') {
                // Player just finished, opponent's turn
                this.currentTurnPlayer = 'opponent';
                this.isPlayerTurn = false;
                this.setStatus("Opponent is thinking...");
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
document.addEventListener('DOMContentLoaded', () => {
    window.game = new PushGame();

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
