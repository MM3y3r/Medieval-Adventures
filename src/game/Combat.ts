import { Player, Enemy } from "../types";
import { getUserInput, randomInt, wait } from "../utils/helpers";

export class Combat {
  async startCombat(player: Player, enemy: Enemy): Promise<void> {
    console.log(`\n⚔️ Combat begins! You face ${enemy.name}!`);
    console.log(
      `🐉 ${enemy.name} - Health: ${enemy.health}/${enemy.maxHealth}`
    );
    console.log(
      `🧙 ${player.name} - Health: ${player.health}/${player.maxHealth}`
    );
    console.log("");

    while (player.health > 0 && enemy.health > 0) {
      // Player turn
      console.log("⚔️ Choose your action:");
      console.log("1. Attack");
      console.log("2. Defend");
      console.log("3. Use Item");
      console.log("4. Run");

      const choice = await getUserInput("> ");

      switch (choice) {
        case "1":
        case "attack":
          await this.playerAttack(player, enemy);
          break;
        case "2":
        case "defend":
          await this.playerDefend(player);
          break;
        case "3":
        case "use":
          await this.useItem(player);
          break;
        case "4":
        case "run":
          if (this.attemptRun()) {
            console.log("🏃 You successfully ran away!");
            return;
          } else {
            console.log("❌ You failed to run away!");
          }
          break;
        default:
          console.log("❓ Invalid choice. You hesitate...");
      }

      // Check if enemy is defeated
      if (enemy.health <= 0) {
        await this.victory(player, enemy);
        return;
      }

      // Enemy turn
      await this.enemyAttack(player, enemy);

      // Check if player is defeated
      if (player.health <= 0) {
        await this.defeat(player);
        return;
      }

      await wait(1000);
    }
  }

  private async playerAttack(player: Player, enemy: Enemy): Promise<void> {
    const damage = Math.max(
      1,
      player.attack - enemy.defense + randomInt(-2, 2)
    );
    enemy.health = Math.max(0, enemy.health - damage);

    console.log(`⚔️ You attack ${enemy.name} for ${damage} damage!`);
    console.log(`🐉 ${enemy.name} has ${enemy.health} health remaining.`);
  }

  private async playerDefend(player: Player): Promise<void> {
    console.log(
      "🛡️ You raise your guard, reducing incoming damage for this turn."
    );
    // Defense bonus will be applied in enemyAttack
  }

  private async useItem(player: Player): Promise<void> {
    if (player.inventory.length === 0) {
      console.log("🎒 Your inventory is empty!");
      return;
    }

    console.log("🎒 Your inventory:");
    player.inventory.forEach((item, index) => {
      if (item.type === "consumable") {
        console.log(`${index + 1}. ${item.name} - ${item.description}`);
      }
    });

    const choice = await getUserInput(
      "Which item would you like to use? (number or name) > "
    );

    let itemIndex = -1;
    if (!isNaN(Number(choice))) {
      itemIndex = Number(choice) - 1;
    } else {
      itemIndex = player.inventory.findIndex((item) =>
        item.name.toLowerCase().includes(choice.toLowerCase())
      );
    }

    if (itemIndex === -1 || itemIndex >= player.inventory.length) {
      console.log("❌ Invalid item choice!");
      return;
    }

    const item = player.inventory[itemIndex];

    if (item.type !== "consumable") {
      console.log(`❌ You can't use ${item.name} in combat!`);
      return;
    }

    if (item.properties?.healing) {
      const healAmount = item.properties.healing;
      const oldHealth = player.health;
      player.health = Math.min(player.maxHealth, player.health + healAmount);
      const actualHeal = player.health - oldHealth;

      console.log(`✨ You use ${item.name} and recover ${actualHeal} health!`);
      console.log(`❤️ Your health: ${player.health}/${player.maxHealth}`);
    }

    // Remove used item
    player.inventory.splice(itemIndex, 1);
  }

  private async enemyAttack(player: Player, enemy: Enemy): Promise<void> {
    const baseDamage = Math.max(
      1,
      enemy.attack - player.defense + randomInt(-2, 2)
    );
    const damage = Math.max(1, baseDamage);

    player.health = Math.max(0, player.health - damage);

    console.log(`🐉 ${enemy.name} attacks you for ${damage} damage!`);
    console.log(`❤️ You have ${player.health} health remaining.`);
  }

  private attemptRun(): boolean {
    return randomInt(1, 100) <= 50; // 50% chance to run
  }

  private async victory(player: Player, enemy: Enemy): Promise<void> {
    console.log(`\n🎉 Victory! You defeated ${enemy.name}!`);
    console.log(`⭐ You gained ${enemy.experience} experience!`);
    console.log(`💰 You found ${enemy.gold} gold!`);

    player.experience += enemy.experience;
    player.gold += enemy.gold;

    // Check for level up
    const expNeeded = player.level * 100;
    if (player.experience >= expNeeded) {
      this.levelUp(player);
    }

    // Add loot to inventory
    if (enemy.loot && enemy.loot.length > 0) {
      console.log("🎁 You found loot:");
      enemy.loot.forEach((item) => {
        player.inventory.push(item);
        console.log(`   📦 ${item.name}`);
      });
    }
  }

  private async defeat(player: Player): Promise<void> {
    console.log("\n💀 You have been defeated!");
    console.log("🏥 You wake up back in the village, bruised but alive.");
    console.log("💰 You lost half your gold...");

    player.health = Math.floor(player.maxHealth / 2);
    player.gold = Math.floor(player.gold / 2);
    player.currentLocation = "village_square";
  }

  private levelUp(player: Player): void {
    player.level++;
    player.maxHealth += 20;
    player.health = player.maxHealth; // Full heal on level up
    player.attack += 3;
    player.defense += 2;
    player.experience = 0; // Reset experience for next level

    console.log(`\n🌟 LEVEL UP! You are now level ${player.level}!`);
    console.log(`❤️ Health increased to ${player.maxHealth}!`);
    console.log(`⚔️ Attack increased to ${player.attack}!`);
    console.log(`🛡️ Defense increased to ${player.defense}!`);
  }
}
