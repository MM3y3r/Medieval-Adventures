"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./game/Game");
const display_1 = require("./utils/display");
async function main() {
    (0, display_1.welcome)();
    const game = new Game_1.Game();
    await game.start();
}
main().catch(console.error);
//# sourceMappingURL=index.js.map