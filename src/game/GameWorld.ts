import { Location, Item, Enemy } from "../types";

export class GameWorld {
  private locations: { [key: string]: Location } = {};

  constructor() {
    this.initializeWorld();
  }

  private initializeWorld(): void {
    // Village Square - Starting location
    this.locations["village_square"] = {
      name: "Village Square",
      description:
        "A bustling medieval village square with cobblestone streets. A fountain sits in the center, surrounded by merchant stalls and townsfolk going about their daily business.",
      exits: {
        north: "blacksmith_shop",
        east: "tavern",
        south: "village_gate",
        west: "market",
      },
      items: [
        {
          name: "Rusty Coin",
          type: "treasure",
          description: "An old coin with mysterious markings",
          value: 5,
        },
      ],
    };

    // Blacksmith Shop
    this.locations["blacksmith_shop"] = {
      name: "Blacksmith Shop",
      description:
        "The air is thick with smoke and the sound of hammering metal echoes through the shop. Weapons and armor hang from the walls, glinting in the firelight.",
      exits: {
        south: "village_square",
      },
      items: [
        {
          name: "Iron Sword",
          type: "weapon",
          description: "A well-crafted iron sword with a sharp blade",
          value: 25,
          properties: { attack: 8 },
        },
        {
          name: "Leather Armor",
          type: "armor",
          description: "Sturdy leather armor that provides basic protection",
          value: 20,
          properties: { defense: 5 },
        },
      ],
    };

    // Tavern
    this.locations["tavern"] = {
      name: "The Prancing Pony Tavern",
      description:
        "A warm and welcoming tavern filled with the aroma of roasted meat and ale. Patrons sit around wooden tables, sharing stories and laughter.",
      exits: {
        west: "village_square",
      },
      items: [
        {
          name: "Health Potion",
          type: "consumable",
          description: "A red potion that restores health",
          value: 15,
          properties: { healing: 30 },
        },
      ],
    };

    // Market
    this.locations["market"] = {
      name: "Village Market",
      description:
        "A lively marketplace where merchants hawk their wares. Fresh produce, exotic spices, and various goods are displayed on wooden stalls.",
      exits: {
        east: "village_square",
      },
      items: [
        {
          name: "Bread",
          type: "consumable",
          description:
            "Fresh-baked bread that restores a small amount of health",
          value: 3,
          properties: { healing: 10 },
        },
      ],
    };

    // Village Gate
    this.locations["village_gate"] = {
      name: "Village Gate",
      description:
        "The southern gate of the village, leading to the wilderness beyond. Two guards stand watch, their spears gleaming in the sunlight.",
      exits: {
        north: "village_square",
        south: "forest_path",
      },
    };

    // Forest Path
    this.locations["forest_path"] = {
      name: "Forest Path",
      description:
        "A winding dirt path through a dense forest. Tall trees block out much of the sunlight, creating an eerie atmosphere. You can hear rustling in the bushes.",
      exits: {
        north: "village_gate",
        south: "deep_forest",
      },
      enemies: [
        {
          name: "Forest Goblin",
          health: 30,
          maxHealth: 30,
          attack: 6,
          defense: 2,
          experience: 15,
          gold: 8,
          loot: [
            {
              name: "Goblin Dagger",
              type: "weapon",
              description: "A crude but sharp dagger",
              value: 12,
              properties: { attack: 4 },
            },
          ],
        },
      ],
    };

    // Deep Forest
    this.locations["deep_forest"] = {
      name: "Deep Forest",
      description:
        "The heart of the ancient forest. Massive trees tower overhead, their branches forming a canopy that blocks out the sky. Strange sounds echo from the shadows.",
      exits: {
        north: "forest_path",
        east: "abandoned_camp",
      },
      enemies: [
        {
          name: "Forest Wolf",
          health: 45,
          maxHealth: 45,
          attack: 8,
          defense: 3,
          experience: 25,
          gold: 12,
          loot: [
            {
              name: "Wolf Pelt",
              type: "treasure",
              description: "A valuable wolf pelt",
              value: 30,
            },
          ],
        },
      ],
    };

    // Abandoned Camp
    this.locations["abandoned_camp"] = {
      name: "Abandoned Camp",
      description:
        "The remains of an old campsite. Charred logs and torn tents suggest this place was abandoned in haste. Something glints among the ruins.",
      exits: {
        west: "deep_forest",
      },
      items: [
        {
          name: "Silver Ring",
          type: "treasure",
          description: "An ornate silver ring set with a small gemstone",
          value: 50,
        },
        {
          name: "Old Map",
          type: "key",
          description: "A weathered map showing secret paths",
          value: 25,
        },
      ],
    };
  }

  getLocation(locationId: string): Location | undefined {
    return this.locations[locationId];
  }

  getAllLocations(): { [key: string]: Location } {
    return this.locations;
  }
}
