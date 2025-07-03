export declare class Game {
    private player;
    private gameState;
    private world;
    private combat;
    private isRunning;
    constructor();
    private createPlayer;
    start(): Promise<void>;
    private gameLoop;
    private handleCommand;
    private movePlayer;
    private showInventory;
    private takeItem;
    private attackEnemy;
}
//# sourceMappingURL=Game.d.ts.map