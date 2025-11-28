// Push! Card Game - JavaScript Implementation

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

        this.playerDeck = [];
        this.opponentDeck = [];
        this.piles = [[], [], []];
        this.pileStates = [null, null, null]; // Tracks special card state for each pile
        this.currentCard = null;
        this.isPlayerTurn = true;  // Tracks whose turn it is
        this.currentTurnPlayer = 'player';  // Tracks who is currently playing (for turn alternation)
        this.gameActive = false;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('play-again-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('rules-btn').addEventListener('click', () => this.showRules());
        document.getElementById('close-rules').addEventListener('click', () => this.hideRules());

        // Pile click listeners
        for (let i = 0; i < 3; i++) {
            document.getElementById(`pile-${i}`).addEventListener('click', () => this.playCardOnPile(i));
        }

        // Close modal when clicking outside
        document.getElementById('rules-modal').addEventListener('click', (e) => {
            if (e.target.id === 'rules-modal') this.hideRules();
        });
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

        // Reset piles
        this.piles = [[], [], []];
        this.pileStates = [null, null, null];
        this.currentCard = null;
        this.isPlayerTurn = true;
        this.currentTurnPlayer = 'player';
        this.gameActive = true;

        // Update UI
        this.updateUI();
        this.renderPiles();
        this.renderCurrentCard();

        // Auto-draw first card for player
        setTimeout(() => this.drawCard(), 300);
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

                // Jack on Jack = the OTHER player takes pile (PUSH!)
                if (card.rank === 'J' && topCard.rank === 'J') {
                    this.showPushPopup();
                    this.setStatus(isPlayer ? "Jack on Jack! Claude takes the pile!" : "Jack on Jack! You take the pile!");

                    setTimeout(() => {
                        // isPlayer played Jack on Jack, so opponent takes pile
                        // Third param: isPlayer just played, so pass isPlayer
                        this.animatePileTake(pileIndex, !isPlayer, isPlayer);
                    }, 1500);
                    return;
                }

                // Other special on special = YOU take the pile (penalty PUSH!)
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
        const validPiles = [0, 1, 2];

        // If we have a special card, try to play it safely
        if (this.isSpecialCard(card)) {
            // Avoid playing on another special card (unless Jack on Jack for advantage)
            for (const i of validPiles) {
                const pile = this.piles[i];
                if (pile.length === 0) return i; // Empty pile is safe

                const topCard = pile[pile.length - 1];
                if (!this.isSpecialCard(topCard)) return i; // Number card is safe

                // Jack on Jack makes player take pile - good move!
                if (card.rank === 'J' && topCard.rank === 'J') return i;
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
        for (let i = 0; i < 3; i++) {
            const pile = document.getElementById(`pile-${i}`);
            if (highlight) {
                pile.classList.add('highlight');
            } else {
                pile.classList.remove('highlight');
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
        for (let i = 0; i < 3; i++) {
            const pile = this.piles[i];
            const pileState = this.pileStates[i];
            const container = document.getElementById(`pile-${i}`).querySelector('.pile-cards');
            const infoContainer = document.getElementById(`pile-${i}`).querySelector('.pile-info');

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
