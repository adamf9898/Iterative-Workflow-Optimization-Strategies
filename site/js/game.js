/**
 * 9898-MTG League - Game JavaScript
 * Handles all game mechanics, API calls, and interactivity
 */

// ============================================
// Global Game State
// ============================================
const gameState = {
    playerGold: 1000,
    deck: [],
    hand: [],
    board: [],
    life: 20,
    opponentLife: 20,
    manaPool: { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 },
    gameActive: false,
    loadingProgress: 0
};

// ============================================
// Loading Screen with Percentage
// ============================================
function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        simulateLoading();
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

function simulateLoading() {
    const percentageEl = document.querySelector('.loading-percentage');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(hideLoading, 500);
        }
        if (percentageEl) {
            percentageEl.textContent = Math.floor(progress) + '%';
        }
    }, 200);
}

// ============================================
// Scryfall API Integration
// ============================================
async function fetchRandomCard() {
    showLoading();
    try {
        const response = await fetch('https://api.scryfall.com/cards/random');
        const card = await response.json();
        hideLoading();
        return card;
    } catch (error) {
        console.error('Error fetching random card:', error);
        hideLoading();
        return null;
    }
}

async function searchCards(query) {
    showLoading();
    try {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        hideLoading();
        return data.data || [];
    } catch (error) {
        console.error('Error searching cards:', error);
        hideLoading();
        return [];
    }
}

function displayCard(card, container) {
    const cardEl = document.createElement('div');
    cardEl.className = 'mtg-card';
    cardEl.draggable = true;
    
    const cardHTML = `
        <div class="card-name">${card.name}</div>
        <div class="card-mana-cost">${card.mana_cost || ''}</div>
        <div class="card-type-line">${card.type_line}</div>
        <div class="card-text-box">${card.oracle_text || 'No text'}</div>
        ${card.power && card.toughness ? `<div class="card-pt">${card.power}/${card.toughness}</div>` : ''}
    `;
    
    cardEl.innerHTML = cardHTML;
    cardEl.dataset.cardData = JSON.stringify(card);
    
    // Add drag and drop handlers
    addCardDragHandlers(cardEl);
    
    container.appendChild(cardEl);
    return cardEl;
}

// ============================================
// Card Drag and Drop
// ============================================
function addCardDragHandlers(cardEl) {
    cardEl.addEventListener('dragstart', handleDragStart);
    cardEl.addEventListener('dragend', handleDragEnd);
}

function handleDragStart(e) {
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('cardData', this.dataset.cardData);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

// ============================================
// Canvas Game Board
// ============================================
function initializeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Draw initial board
    drawBoard(ctx, canvas);
    
    // Add click and drag support
    let isDragging = false;
    let draggedCard = null;
    let dragStartPos = { x: 0, y: 0 };
    
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicking on a card on the board
        const card = getCardAtPosition(x, y);
        if (card) {
            isDragging = true;
            draggedCard = card;
            dragStartPos = { x, y };
        }
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isDragging && draggedCard) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            draggedCard.x = x - 50;
            draggedCard.y = y - 35;
            
            drawBoard(ctx, canvas);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        draggedCard = null;
    });
}

function drawBoard(ctx, canvas) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background zones
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw opponent zone
    ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
    ctx.fillRect(10, 10, canvas.width - 20, 180);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, 180);
    
    // Draw player zone
    ctx.fillStyle = 'rgba(74, 158, 255, 0.1)';
    ctx.fillRect(10, 410, canvas.width - 20, 180);
    ctx.strokeStyle = '#4a9eff';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 410, canvas.width - 20, 180);
    
    // Draw battlefield zone
    ctx.fillStyle = 'rgba(61, 37, 99, 0.1)';
    ctx.fillRect(10, 200, canvas.width - 20, 200);
    ctx.strokeStyle = '#3d2563';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 200, canvas.width - 20, 200);
    
    // Draw zone labels
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Opponent', 20, 35);
    ctx.fillText('Battlefield', 20, 225);
    ctx.fillText('Player', 20, 435);
    
    // Draw cards on board
    gameState.board.forEach(card => {
        drawCardOnCanvas(ctx, card);
    });
}

function drawCardOnCanvas(ctx, card) {
    const x = card.x || 100;
    const y = card.y || 300;
    const width = 100;
    const height = 70;
    
    // Card background
    ctx.fillStyle = '#2d1b4e';
    ctx.fillRect(x, y, width, height);
    
    // Card border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Card name
    ctx.fillStyle = '#e6c84f';
    ctx.font = 'bold 10px Arial';
    ctx.fillText(card.name.substring(0, 15), x + 5, y + 15);
    
    // Card type
    ctx.fillStyle = '#b8b8c8';
    ctx.font = '8px Arial';
    ctx.fillText(card.type.substring(0, 15), x + 5, y + 30);
}

function getCardAtPosition(x, y) {
    // Optimized card position check - returns first matching card
    // Note: For large boards, consider spatial partitioning for better performance
    for (let i = gameState.board.length - 1; i >= 0; i--) {
        const card = gameState.board[i];
        const cx = card.x || 100;
        const cy = card.y || 300;
        if (x >= cx && x <= cx + 100 && y >= cy && y <= cy + 70) {
            return card;
        }
    }
    return null;
}

// ============================================
// Card Generation System
// ============================================
function generateCard(type, color, rarity) {
    const cardTypes = ['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Planeswalker', 'Land'];
    const colors = ['White', 'Blue', 'Black', 'Red', 'Green', 'Multicolor', 'Colorless'];
    const rarities = ['Common', 'Uncommon', 'Rare', 'Mythic Rare'];
    
    const selectedType = type === 'random' ? cardTypes[Math.floor(Math.random() * cardTypes.length)] : type;
    const selectedColor = color === 'random' ? colors[Math.floor(Math.random() * colors.length)] : color;
    const selectedRarity = rarity === 'random' ? rarities[Math.floor(Math.random() * rarities.length)] : rarity;
    
    const card = {
        name: generateCardName(),
        type: selectedType,
        color: selectedColor,
        rarity: selectedRarity,
        manaCost: generateManaCost(selectedColor),
        text: generateCardText(selectedType),
        power: selectedType === 'Creature' ? Math.floor(Math.random() * 8) + 1 : null,
        toughness: selectedType === 'Creature' ? Math.floor(Math.random() * 8) + 1 : null
    };
    
    return card;
}

function generateCardName() {
    const prefixes = ['Ancient', 'Mystic', 'Divine', 'Shadow', 'Arcane', 'Eternal', 'Primal', 'Celestial'];
    const suffixes = ['Guardian', 'Wanderer', 'Sage', 'Warrior', 'Mage', 'Spirit', 'Dragon', 'Phoenix'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

function generateManaCost(color) {
    const genericMana = Math.floor(Math.random() * 5);
    const colorSymbols = {
        'White': '{W}',
        'Blue': '{U}',
        'Black': '{B}',
        'Red': '{R}',
        'Green': '{G}',
        'Colorless': '{C}',
        'Multicolor': '{W}{U}'
    };
    
    const colorMana = Math.floor(Math.random() * 3) + 1;
    const colorSymbol = colorSymbols[color] || '';
    return `{${genericMana}}${colorSymbol.repeat(colorMana)}`;
}

function generateCardText(type) {
    const abilities = [
        'Flying',
        'First Strike',
        'Vigilance',
        'Trample',
        'Haste',
        'Lifelink',
        'Deathtouch',
        'Hexproof'
    ];
    
    const effects = [
        'Draw a card.',
        'Destroy target creature.',
        'Gain 3 life.',
        'Deal 3 damage to any target.',
        'Return target creature to its owner\'s hand.',
        'Search your library for a card.',
        'Create a 1/1 token.'
    ];
    
    if (type === 'Creature') {
        return abilities[Math.floor(Math.random() * abilities.length)];
    } else {
        return effects[Math.floor(Math.random() * effects.length)];
    }
}

// ============================================
// Mission Generation System
// ============================================
function generateMission() {
    const objectives = [
        'Win 3 games without losing a creature',
        'Deal exactly 20 damage in a single turn',
        'Cast 5 spells in one turn',
        'Control 10 or more permanents',
        'Win with exactly 1 life remaining',
        'Defeat an opponent with commander damage',
        'Cast a spell with converted mana cost 10 or greater',
        'Win without attacking'
    ];
    
    const rewards = [
        '500 Gold + 3 Booster Packs',
        '1000 Gold + Rare Card',
        '2 Premium Packs',
        'Mythic Rare Card + 300 Gold',
        'Special Promo Card',
        'Deck Box + 5 Boosters'
    ];
    
    const objective = objectives[Math.floor(Math.random() * objectives.length)];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    
    return {
        title: 'Special Mission',
        objective: objective,
        reward: reward,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)]
    };
}

// ============================================
// NPC Generation
// ============================================
function generateNPC() {
    const names = ['Jace', 'Liliana', 'Chandra', 'Garruk', 'Elspeth', 'Gideon', 'Nissa', 'Ajani'];
    const titles = ['the Wise', 'Shadowmancer', 'Pyromancer', 'Beast-Master', 'Knight-Errant', 'Champion', 'Worldwaker', 'Goldmane'];
    const personalities = ['Aggressive', 'Defensive', 'Combo-oriented', 'Control-focused', 'Midrange', 'Tempo'];
    const decks = ['Aggro Red', 'Blue Control', 'Green Stompy', 'Black Reanimator', 'White Weenie', 'Multicolor Ramp'];
    
    const name = `${names[Math.floor(Math.random() * names.length)]} ${titles[Math.floor(Math.random() * titles.length)]}`;
    const personality = personalities[Math.floor(Math.random() * personalities.length)];
    const deck = decks[Math.floor(Math.random() * decks.length)];
    const level = Math.floor(Math.random() * 50) + 1;
    
    return {
        name: name,
        level: level,
        personality: personality,
        deck: deck,
        life: 20,
        skill: ['Novice', 'Intermediate', 'Advanced', 'Expert', 'Master'][Math.floor(level / 10)]
    };
}

// ============================================
// Spell Casting Mechanics
// ============================================
function castSpell(spell, cost) {
    if (!canPayCost(cost)) {
        console.log('Not enough mana to cast spell');
        return false;
    }
    
    payCost(cost);
    console.log(`Cast ${spell.name}`);
    executeSpellEffect(spell);
    return true;
}

function canPayCost(cost) {
    // TODO: Implement actual mana pool validation
    // For now, simplified check always returns true
    // Future implementation should parse cost and check against gameState.manaPool
    return true;
}

function payCost(cost) {
    // Deduct mana from pool
    console.log('Paying cost:', cost);
}

function executeSpellEffect(spell) {
    console.log('Executing spell effect:', spell);
}

function genCostSpell(type, power) {
    const genericMana = Math.floor(power / 2);
    const coloredMana = Math.ceil(power / 3);
    return `{${genericMana}}${'{U}'.repeat(coloredMana)}`;
}

// ============================================
// MTG Game Mechanics
// ============================================
function mtgWhen(trigger, effect) {
    return {
        trigger: trigger,
        effect: effect,
        type: 'triggered'
    };
}

function mtgObject(name, type, properties) {
    return {
        name: name,
        type: type,
        properties: properties || {},
        zone: 'hand'
    };
}

function WhenTargetStructure(condition, target, effect) {
    return {
        condition: condition,
        target: target,
        effect: effect
    };
}

function mtgObjectEmblem(name, ability) {
    return {
        name: name,
        type: 'emblem',
        ability: ability,
        zone: 'command'
    };
}

function mtgSpree(modes) {
    return {
        type: 'spree',
        modes: modes,
        maxModes: modes.length
    };
}

function hasGets(object, ability) {
    return object.properties && object.properties.abilities && 
           object.properties.abilities.includes(ability);
}

function cardsYouOwn() {
    return gameState.deck.concat(gameState.hand, gameState.board);
}

function cardsOwned(player) {
    return player === 'self' ? cardsYouOwn() : [];
}

function cardsTargetOwns(target) {
    return target.deck || [];
}

function cardsNotOwned() {
    // Returns cards not in player's collection
    return [];
}

function mtgCustom(properties) {
    return mtgObject('Custom Card', 'custom', properties);
}

function thisHas(card, ability) {
    return hasGets(card, ability);
}

function targetHas(target, ability) {
    return hasGets(target, ability);
}

function openingHand(deckList) {
    const hand = [];
    for (let i = 0; i < 7; i++) {
        if (deckList.length > 0) {
            const randomIndex = Math.floor(Math.random() * deckList.length);
            hand.push(deckList.splice(randomIndex, 1)[0]);
        }
    }
    return hand;
}

// ============================================
// Game Start/Begin
// ============================================
function beginGame() {
    gameState.gameActive = true;
    gameState.life = 20;
    gameState.opponentLife = 20;
    gameState.hand = [];
    gameState.board = [];
    
    // Shuffle and draw opening hand
    shuffleDeck();
    drawOpeningHand();
    
    updateGameStatus('Game started! Draw your opening hand.');
}

function shuffleDeck() {
    for (let i = gameState.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.deck[i], gameState.deck[j]] = [gameState.deck[j], gameState.deck[i]];
    }
    updateGameStatus('Deck shuffled.');
}

function drawOpeningHand() {
    gameState.hand = openingHand(gameState.deck);
    updateHandDisplay();
    updateGameStatus(`Drew opening hand of ${gameState.hand.length} cards.`);
}

function updateGameStatus(message) {
    const statusEl = document.getElementById('gameStatus');
    if (statusEl) {
        const timestamp = new Date().toLocaleTimeString();
        statusEl.innerHTML += `<p>[${timestamp}] ${message}</p>`;
        statusEl.scrollTop = statusEl.scrollHeight;
    }
}

function updateHandDisplay() {
    const handEl = document.getElementById('cardHand');
    if (!handEl) return;
    
    handEl.innerHTML = '';
    gameState.hand.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'mtg-card';
        cardEl.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-type-line">${card.type}</div>
        `;
        handEl.appendChild(cardEl);
    });
}

// ============================================
// AI Chat Interface (Stub)
// ============================================
function sendAIMessage(message) {
    const messagesEl = document.getElementById('aiChatMessages');
    if (!messagesEl) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message user';
    userMsg.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
    messagesEl.appendChild(userMsg);
    
    // Simulate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message assistant';
        aiMsg.innerHTML = `<p><strong>AI:</strong> ${generateAIResponse(message)}</p>`;
        messagesEl.appendChild(aiMsg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 1000);
    
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function generateAIResponse(userMessage) {
    const responses = [
        'Interesting question! In Magic, that depends on the board state.',
        'I can help you with that. Let me generate some options for you.',
        'That\'s a great strategy! Consider adding some removal spells.',
        'Here\'s what I found in the comprehensive rules...',
        'Would you like me to generate a custom card based on that idea?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// ============================================
// Shop System
// ============================================
function buyItem(itemType, cost) {
    if (gameState.playerGold >= cost) {
        gameState.playerGold -= cost;
        updateGoldDisplay();
        
        switch(itemType) {
            case 'booster':
                openBoosterPack();
                break;
            case 'premium':
                openPremiumPack();
                break;
            case 'deckbox':
                alert('Deck Box acquired! You can now store more decks.');
                break;
        }
    } else {
        alert('Not enough gold!');
    }
}

function openBoosterPack() {
    const cards = [];
    // Standard MTG booster: 10 commons, 3 uncommons, 1 rare, 1 land/marketing
    for (let i = 0; i < 10; i++) {
        cards.push(generateCard('random', 'random', 'Common'));
    }
    for (let i = 0; i < 3; i++) {
        cards.push(generateCard('random', 'random', 'Uncommon'));
    }
    cards.push(generateCard('random', 'random', 'Rare'));
    cards.push(generateCard('Land', 'random', 'Common'));
    alert(`Opened booster pack! Got ${cards.length} cards.`);
}

function openPremiumPack() {
    const cards = [];
    // Premium pack: 9 commons, 3 uncommons, 2 rares, 1 guaranteed mythic
    for (let i = 0; i < 9; i++) {
        cards.push(generateCard('random', 'random', 'Common'));
    }
    for (let i = 0; i < 3; i++) {
        cards.push(generateCard('random', 'random', 'Uncommon'));
    }
    for (let i = 0; i < 2; i++) {
        cards.push(generateCard('random', 'random', 'Rare'));
    }
    cards.push(generateCard('random', 'random', 'Mythic Rare'));
    alert(`Opened premium pack! Got ${cards.length} cards including a mythic rare!`);
}

function updateGoldDisplay() {
    const goldEl = document.getElementById('playerGold');
    if (goldEl) {
        goldEl.textContent = gameState.playerGold;
    }
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize canvas
    initializeCanvas();
    
    // Random Card Button
    const randomCardBtn = document.getElementById('randomCardBtn');
    if (randomCardBtn) {
        randomCardBtn.addEventListener('click', async function() {
            const card = await fetchRandomCard();
            if (card) {
                const resultsEl = document.getElementById('searchResults');
                resultsEl.innerHTML = '';
                displayCard(card, resultsEl);
            }
        });
    }
    
    // Card Search Button
    const searchCardBtn = document.getElementById('searchCardBtn');
    if (searchCardBtn) {
        searchCardBtn.addEventListener('click', async function() {
            const query = document.getElementById('cardSearchInput').value;
            if (query) {
                const cards = await searchCards(query);
                const resultsEl = document.getElementById('searchResults');
                resultsEl.innerHTML = '';
                cards.slice(0, 12).forEach(card => {
                    displayCard(card, resultsEl);
                });
            }
        });
    }
    
    // Generate Card Button
    const generateCardBtn = document.getElementById('generateCardBtn');
    if (generateCardBtn) {
        generateCardBtn.addEventListener('click', function() {
            const type = document.getElementById('cardType').value;
            const color = document.getElementById('cardColor').value;
            const rarity = document.getElementById('cardRarity').value;
            
            const card = generateCard(type, color, rarity);
            const displayEl = document.getElementById('generatedCardDisplay');
            displayEl.innerHTML = '';
            
            const cardHTML = `
                <div class="mtg-card" style="margin: 0 auto;">
                    <div class="card-name">${card.name}</div>
                    <div class="card-mana-cost">${card.manaCost}</div>
                    <div class="card-type-line">${card.type} — ${card.color}</div>
                    <div class="card-text-box">${card.text}</div>
                    ${card.power && card.toughness ? `<div class="card-pt">${card.power}/${card.toughness}</div>` : ''}
                    <div style="margin-top: 10px; color: var(--color-gold); font-size: 0.75rem;">${card.rarity}</div>
                </div>
            `;
            displayEl.innerHTML = cardHTML;
        });
    }
    
    // Generate Mission Button
    const generateMissionBtn = document.getElementById('generateMissionBtn');
    if (generateMissionBtn) {
        generateMissionBtn.addEventListener('click', function() {
            const mission = generateMission();
            const displayEl = document.getElementById('generatedMission');
            displayEl.innerHTML = `
                <h3>${mission.title}</h3>
                <p><strong>Difficulty:</strong> ${mission.difficulty}</p>
                <p><strong>Objective:</strong> ${mission.objective}</p>
                <p style="color: var(--color-accent-green);"><strong>Reward:</strong> ${mission.reward}</p>
            `;
        });
    }
    
    // Generate NPC Button
    const generateNPCBtn = document.getElementById('generateNPCBtn');
    if (generateNPCBtn) {
        generateNPCBtn.addEventListener('click', function() {
            const npc = generateNPC();
            const displayEl = document.getElementById('generatedNPC');
            displayEl.innerHTML = `
                <h3>${npc.name}</h3>
                <p><strong>Level:</strong> ${npc.level}</p>
                <p><strong>Skill:</strong> ${npc.skill}</p>
                <p><strong>Personality:</strong> ${npc.personality}</p>
                <p><strong>Deck:</strong> ${npc.deck}</p>
                <p><strong>Starting Life:</strong> ${npc.life}</p>
            `;
        });
    }
    
    // AI Chat Send Button
    const aiChatSend = document.getElementById('aiChatSend');
    const aiChatInput = document.getElementById('aiChatInput');
    if (aiChatSend && aiChatInput) {
        aiChatSend.addEventListener('click', function() {
            const message = aiChatInput.value.trim();
            if (message) {
                sendAIMessage(message);
                aiChatInput.value = '';
            }
        });
        
        aiChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = aiChatInput.value.trim();
                if (message) {
                    sendAIMessage(message);
                    aiChatInput.value = '';
                }
            }
        });
    }
    
    // Begin Game Button
    const beginGameBtn = document.getElementById('beginGameBtn');
    if (beginGameBtn) {
        beginGameBtn.addEventListener('click', beginGame);
    }
    
    // Shuffle Deck Button
    const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
    if (shuffleDeckBtn) {
        shuffleDeckBtn.addEventListener('click', shuffleDeck);
    }
    
    // Draw Opening Hand Button
    const drawOpeningHandBtn = document.getElementById('drawOpeningHandBtn');
    if (drawOpeningHandBtn) {
        drawOpeningHandBtn.addEventListener('click', drawOpeningHand);
    }
    
    // Clear Board Button
    const clearBoardBtn = document.getElementById('clearBoard');
    if (clearBoardBtn) {
        clearBoardBtn.addEventListener('click', function() {
            gameState.board = [];
            const canvas = document.getElementById('gameCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                drawBoard(ctx, canvas);
            }
        });
    }
    
    // Reset Game Button
    const resetGameBtn = document.getElementById('resetGame');
    if (resetGameBtn) {
        resetGameBtn.addEventListener('click', function() {
            gameState.board = [];
            gameState.hand = [];
            gameState.gameActive = false;
            const canvas = document.getElementById('gameCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                drawBoard(ctx, canvas);
            }
            updateGameStatus('Game reset.');
        });
    }
    
    // Draw Card Button
    const drawCardBtn = document.getElementById('drawCard');
    if (drawCardBtn) {
        drawCardBtn.addEventListener('click', async function() {
            const card = await fetchRandomCard();
            if (card) {
                gameState.hand.push(card);
                updateHandDisplay();
                updateGameStatus(`Drew ${card.name}.`);
            }
        });
    }
    
    // Shop Buy Buttons
    const buyButtons = document.querySelectorAll('.buy-item');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.dataset.item;
            const cost = parseInt(this.dataset.cost);
            buyItem(item, cost);
        });
    });
    
    // Start Encounter Buttons
    const encounterButtons = document.querySelectorAll('.start-encounter');
    encounterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const difficulty = this.closest('.encounter-card').dataset.difficulty;
            alert(`Starting ${difficulty} encounter! Good luck!`);
            beginGame();
        });
    });
    
    // Challenge Boss Buttons
    const bossButtons = document.querySelectorAll('.challenge-boss');
    bossButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const bossName = this.closest('.boss-card').querySelector('h3').textContent;
            alert(`Challenging ${bossName}! Prepare for an epic battle!`);
            beginGame();
        });
    });
    
    // AI Tool Buttons (Stubs for Perchance integration)
    const generateTextBtn = document.getElementById('generateTextBtn');
    if (generateTextBtn) {
        generateTextBtn.addEventListener('click', function() {
            alert('AI Text Generation feature - Integrate with Perchance ai-text-plugin');
        });
    }
    
    const generateImageBtn = document.getElementById('generateImageBtn');
    if (generateImageBtn) {
        generateImageBtn.addEventListener('click', function() {
            alert('AI Image Generation feature - Integrate with Perchance text-to-image-plugin');
        });
    }
});

// ============================================
// Dice Rolling (for random effects)
// ============================================
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollD6() {
    return rollDice(6);
}

function rollD20() {
    return rollDice(20);
}

// Export functions for use in other modules
window.mtgGame = {
    generateCard,
    generateMission,
    generateNPC,
    castSpell,
    genCostSpell,
    mtgWhen,
    mtgObject,
    WhenTargetStructure,
    mtgObjectEmblem,
    mtgSpree,
    hasGets,
    cardsYouOwn,
    cardsOwned,
    cardsTargetOwns,
    cardsNotOwned,
    mtgCustom,
    thisHas,
    targetHas,
    openingHand,
    beginGame,
    rollDice,
    rollD6,
    rollD20
};
