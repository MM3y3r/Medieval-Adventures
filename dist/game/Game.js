"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const display_1 = require("../utils/display");
const helpers_1 = require("../utils/helpers");
const GameWorld_1 = require("./GameWorld");
const Combat_1 = require("./Combat");
class Game {
    constructor() {
        this.gameState = 'menu';
        this.isRunning = false;
        this.player = this.createPlayer();
        this.world = new GameWorld_1.GameWorld();
        this.combat = new Combat_1.Combat();
    }
    createPlayer() {
        return {
            name: 'Hero',
            level: 1,
            health: 100,
            maxHealth: 100,
            attack: 10,
            defense: 5,
            experience: 0,
            gold: 50,
            inventory: [],
            currentLocation: 'village_square'
        };
    }
    async start() {
        this.isRunning = true;
        console.log('🎮 Enter your hero\'s name:');
        const name = await (0, helpers_1.getUserInput)('> ');
        if (name) {
            this.player.name = name;
        }
        console.log(`\n🎉 Welcome, ${this.player.name}! Your adventure begins...\n`);
        this.gameState = 'playing';
        await this.gameLoop();
    }
    async gameLoop() {
        while (this.isRunning) {
            const currentLocation = this.world.getLocation(this.player.currentLocation);
            if (!currentLocation) {
                console.log('❌ Error: Unknown location!');
                break;
            }
            (0, display_1.displayLocation)(currentLocation);
            (0, display_1.displayPlayerStatus)(this.player);
            const input = await (0, helpers_1.getUserInput)('🎮 What would you like to do? > ');
            const { command, args } = (0, helpers_1.parseCommand)(input);
            await this.handleCommand(command, args);
        }
    }
    async handleCommand(command, args) {
        switch (command) {
            case 'move':
            case 'go':
                if (args.length === 0) {
                    console.log('🚪 Specify a direction: north, south, east, west');
                    return;
                }
                await this.movePlayer(args[0]);
                break;
            case 'look':
                // Current location is already displayed in game loop
                break;
            case 'inventory':
            case 'inv':
                this.showInventory();
                break;
            case 'take':
            case 'get':
                if (args.length === 0) {
                    console.log('📦 Specify what to take');
                    return;
                }
                await this.takeItem(args.join(' '));
                break;
            case 'attack':
                if (args.length === 0) {
                    console.log('⚔️ Specify what to attack');
                    return;
                }
                await this.attackEnemy(args.join(' '));
                break;
            case 'status':
                (0, display_1.displayPlayerStatus)(this.player);
                break;
            case 'help':
                (0, display_1.displayCommands)();
                break;
            case 'quit':
            case 'exit':
                console.log('👋 Thanks for playing! Farewell, brave adventurer!');
                this.isRunning = false;
                break;
            default:
                console.log('❓ Unknown command. Type "help" for available commands.');
        }
    }
    async movePlayer(direction) {
        const currentLocation = this.world.getLocation(this.player.currentLocation);
        if (!currentLocation?.exits[direction]) {
            console.log(`🚫 You can't go ${direction} from here.`);
            return;
        }
        this.player.currentLocation = currentLocation.exits[direction];
        console.log(`🚶 You move ${direction}...`);
    }
    showInventory() {
        console.log('\n🎒 Your Inventory:');
        console.log('─'.repeat(30));
        if (this.player.inventory.length === 0) {
            console.log('   (Empty)');
        }
        else {
            this.player.inventory.forEach((item, index) => {
                console.log(`   ${index + 1}. ${item.name} - ${item.description}`);
            });
        }
        console.log('');
    }
    async takeItem(itemName) {
        const location = this.world.getLocation(this.player.currentLocation);
        if (!location?.items) {
            console.log('📦 There are no items here.');
            return;
        }
        const itemIndex = location.items.findIndex(item => item.name.toLowerCase().includes(itemName.toLowerCase()));
        if (itemIndex === -1) {
            console.log(`📦 There is no "${itemName}" here.`);
            return;
        }
        const item = location.items[itemIndex];
        this.player.inventory.push(item);
        location.items.splice(itemIndex, 1);
        console.log(`✅ You took the ${item.name}.`);
    }
    async attackEnemy(enemyName) {
        const location = this.world.getLocation(this.player.currentLocation);
        if (!location?.enemies || location.enemies.length === 0) {
            console.log('⚔️ There are no enemies here.');
            return;
        }
        const enemy = location.enemies.find(e => e.name.toLowerCase().includes(enemyName.toLowerCase()));
        if (!enemy) {
            console.log(`⚔️ There is no "${enemyName}" here.`);
            return;
        }
        await this.combat.startCombat(this.player, enemy);
        // Remove defeated enemy
        if (enemy.health <= 0) {
            const enemyIndex = location.enemies.indexOf(enemy);
            location.enemies.splice(enemyIndex, 1);
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map