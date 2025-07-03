"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = welcome;
exports.displayPlayerStatus = displayPlayerStatus;
exports.displayLocation = displayLocation;
exports.displayCommands = displayCommands;
function welcome() {
    console.clear();
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('   ⚔️  Welcome to the Medieval Text Adventure! ⚔️');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('🏰 You are about to embark on a grand adventure in a medieval');
    console.log('   world filled with danger, treasure, and glory!');
    console.log('');
    console.log('🗡️  Fight monsters, collect treasures, and become a legend!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
}
function displayPlayerStatus(player) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`🧙 ${player.name} (Level ${player.level})`);
    console.log(`❤️  Health: ${player.health}/${player.maxHealth}`);
    console.log(`⚔️  Attack: ${player.attack} | 🛡️  Defense: ${player.defense}`);
    console.log(`⭐ Experience: ${player.experience} | 💰 Gold: ${player.gold}`);
    console.log(`📍 Location: ${player.currentLocation}`);
    console.log('═══════════════════════════════════════════════════════════════');
}
function displayLocation(location) {
    console.log('');
    console.log('🗺️  ' + location.name);
    console.log('─'.repeat(50));
    console.log(location.description);
    console.log('');
    if (location.exits && Object.keys(location.exits).length > 0) {
        console.log('🚪 Exits:');
        Object.keys(location.exits).forEach(direction => {
            console.log(`   ${direction}: ${location.exits[direction]}`);
        });
        console.log('');
    }
    if (location.items && location.items.length > 0) {
        console.log('✨ Items here:');
        location.items.forEach((item) => {
            console.log(`   📦 ${item.name} - ${item.description}`);
        });
        console.log('');
    }
    if (location.enemies && location.enemies.length > 0) {
        console.log('⚠️  Enemies:');
        location.enemies.forEach((enemy) => {
            console.log(`   🐉 ${enemy.name} (Health: ${enemy.health})`);
        });
        console.log('');
    }
}
function displayCommands() {
    console.log('📋 Available commands:');
    console.log('   move <direction>  - Move in a direction (north, south, east, west)');
    console.log('   look             - Look around the current location');
    console.log('   inventory        - Check your inventory');
    console.log('   take <item>      - Take an item');
    console.log('   attack <enemy>   - Attack an enemy');
    console.log('   talk <npc>       - Talk to an NPC');
    console.log('   use <item>       - Use an item');
    console.log('   status           - Check your status');
    console.log('   help             - Show this help message');
    console.log('   quit             - Exit the game');
    console.log('');
}
//# sourceMappingURL=display.js.map