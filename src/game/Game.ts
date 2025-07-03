import { Player, GameState, Location, Item, Enemy } from "../types";
import {
  displayPlayerStatus,
  displayLocation,
  displayCommands,
} from "../utils/display";
import { getUserInput, parseCommand, randomInt } from "../utils/helpers";
import { GameWorld } from "./GameWorld";
import { Combat } from "./Combat";

export class Game {
  private player: Player;
  private gameState: GameState = "menu";
  private world: GameWorld;
  private combat: Combat;
  private isRunning = false;

  constructor() {
    this.player = this.createPlayer();
    this.world = new GameWorld();
    this.combat = new Combat();
  }

  private createPlayer(): Player {
    return {
      name: "Hero",
      level: 1,
      health: 100,
      maxHealth: 100,
      attack: 10,
      defense: 5,
      experience: 0,
      gold: 50,
      inventory: [],
      currentLocation: "village_square",
    };
  }

  async start(): Promise<void> {
    this.isRunning = true;

    console.log("🎮 Enter your hero's name:");
    const name = await getUserInput("> ");
    if (name) {
      this.player.name = name;
    }

    console.log(
      `\n🎉 Welcome, ${this.player.name}! Your adventure begins...\n`
    );

    this.gameState = "playing";
    await this.gameLoop();
  }

  private async gameLoop(): Promise<void> {
    while (this.isRunning) {
      const currentLocation = this.world.getLocation(
        this.player.currentLocation
      );

      if (!currentLocation) {
        console.log("❌ Error: Unknown location!");
        break;
      }

      displayLocation(currentLocation);
      displayPlayerStatus(this.player);

      const input = await getUserInput("🎮 What would you like to do? > ");
      const { command, args } = parseCommand(input);

      await this.handleCommand(command, args);
    }
  }

  private async handleCommand(command: string, args: string[]): Promise<void> {
    switch (command) {
      case "move":
      case "go":
        if (args.length === 0) {
          console.log("🚪 Specify a direction: north, south, east, west");
          return;
        }
        await this.movePlayer(args[0]);
        break;

      case "look":
        // Current location is already displayed in game loop
        break;

      case "inventory":
      case "inv":
        this.showInventory();
        break;

      case "take":
      case "get":
        if (args.length === 0) {
          console.log("📦 Specify what to take");
          return;
        }
        await this.takeItem(args.join(" "));
        break;

      case "attack":
        if (args.length === 0) {
          console.log("⚔️ Specify what to attack");
          return;
        }
        await this.attackEnemy(args.join(" "));
        break;

      case "status":
        displayPlayerStatus(this.player);
        break;

      case "help":
        displayCommands();
        break;

      case "quit":
      case "exit":
        console.log("👋 Thanks for playing! Farewell, brave adventurer!");
        this.isRunning = false;
        break;

      default:
        console.log('❓ Unknown command. Type "help" for available commands.');
    }
  }

  private async movePlayer(direction: string): Promise<void> {
    const currentLocation = this.world.getLocation(this.player.currentLocation);

    if (!currentLocation?.exits[direction]) {
      console.log(`🚫 You can't go ${direction} from here.`);
      return;
    }

    this.player.currentLocation = currentLocation.exits[direction];
    console.log(`🚶 You move ${direction}...`);
  }

  private showInventory(): void {
    console.log("\n🎒 Your Inventory:");
    console.log("─".repeat(30));

    if (this.player.inventory.length === 0) {
      console.log("   (Empty)");
    } else {
      this.player.inventory.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.name} - ${item.description}`);
      });
    }
    console.log("");
  }

  private async takeItem(itemName: string): Promise<void> {
    const location = this.world.getLocation(this.player.currentLocation);

    if (!location?.items) {
      console.log("📦 There are no items here.");
      return;
    }

    const itemIndex = location.items.findIndex((item) =>
      item.name.toLowerCase().includes(itemName.toLowerCase())
    );

    if (itemIndex === -1) {
      console.log(`📦 There is no "${itemName}" here.`);
      return;
    }

    const item = location.items[itemIndex];
    this.player.inventory.push(item);
    location.items.splice(itemIndex, 1);

    console.log(`✅ You took the ${item.name}.`);
  }

  private async attackEnemy(enemyName: string): Promise<void> {
    const location = this.world.getLocation(this.player.currentLocation);

    if (!location?.enemies || location.enemies.length === 0) {
      console.log("⚔️ There are no enemies here.");
      return;
    }

    const enemy = location.enemies.find((e) =>
      e.name.toLowerCase().includes(enemyName.toLowerCase())
    );

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
