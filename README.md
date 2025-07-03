# Max's Medieval Adventures 🏰⚔️

A TypeScript-based medieval text adventure game where you embark on epic quests, battle monsters, and explore a rich fantasy world!

## Features

- **Interactive Gameplay**: Command-based text adventure with intuitive controls
- **Medieval Fantasy Setting**: Explore villages, forests, and mysterious locations
- **Combat System**: Turn-based combat with attack, defend, and item usage
- **Character Progression**: Level up your character and improve stats
- **Inventory Management**: Collect weapons, armor, potions, and treasures
- **Rich World**: Multiple locations with items, enemies, and secrets to discover

## Installation

1. Clone or download this repository
2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

## How to Play

### Development Mode

Run the game in development mode with hot reloading:

```bash
pnpm dev
```

### Production Mode

Build and run the compiled version:

```bash
pnpm build
pnpm start
```

### Game Commands

- `move <direction>` or `go <direction>` - Move north, south, east, or west
- `look` - Examine your current location
- `inventory` or `inv` - Check your inventory
- `take <item>` or `get <item>` - Pick up items
- `attack <enemy>` - Start combat with an enemy
- `status` - Check your character's stats
- `help` - Show available commands
- `quit` or `exit` - Exit the game

### Combat Commands

During combat, you can:

- `1` or `attack` - Attack the enemy
- `2` or `defend` - Defend to reduce damage
- `3` or `use` - Use items from your inventory
- `4` or `run` - Attempt to flee from combat

## Game World

### Locations

- **Village Square**: The starting point with shops and NPCs
- **Blacksmith Shop**: Buy weapons and armor
- **The Prancing Pony Tavern**: Rest and gather information
- **Village Market**: Purchase consumables and supplies
- **Forest Path**: Dangerous wilderness with goblins
- **Deep Forest**: Ancient woods with wolves and mysteries
- **Abandoned Camp**: Ruins with valuable treasures

### Character Stats

- **Health**: Your life force - don't let it reach zero!
- **Attack**: Determines damage dealt to enemies
- **Defense**: Reduces damage taken from enemies
- **Level**: Increases through gaining experience
- **Gold**: Currency for purchasing items
- **Experience**: Gained by defeating enemies

## Development

### Project Structure

```
src/
├── index.ts              # Main entry point
├── game/
│   ├── Game.ts           # Main game class and loop
│   ├── GameWorld.ts      # World locations and content
│   └── Combat.ts         # Combat system
├── types/
│   └── index.ts          # TypeScript interfaces
└── utils/
    ├── display.ts        # Display functions
    └── helpers.ts        # Utility functions
```

### Scripts

- `pnpm dev` - Run in development mode with hot reloading
- `pnpm build` - Build the TypeScript code
- `pnpm start` - Run the compiled JavaScript
- `pnpm clean` - Clean the build directory

### Adding New Content

#### New Locations

Add locations to the `GameWorld.ts` file in the `initializeWorld()` method:

```typescript
this.locations['new_location'] = {
  name: 'Location Name',
  description: 'Description of the location',
  exits: { north: 'other_location' },
  items: [/* items here */],
  enemies: [/* enemies here */]
};
```

#### New Items

Define items with the `Item` interface:

```typescript
{
  name: 'Item Name',
  type: 'weapon' | 'armor' | 'consumable' | 'treasure' | 'key',
  description: 'Item description',
  value: 25,
  properties: { attack: 5, defense: 3, healing: 20 }
}
```

#### New Enemies

Create enemies with the `Enemy` interface:

```typescript
{
  name: 'Enemy Name',
  health: 50,
  maxHealth: 50,
  attack: 8,
  defense: 3,
  experience: 25,
  gold: 15,
  loot: [/* items dropped when defeated */]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the game thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the package.json file for details.

## Future Enhancements

- Magic system with spells
- NPC dialogue and quest system
- Save/load game functionality
- More diverse locations and enemies
- Equipment system with stat bonuses
- Crafting system
- Story-driven quests and objectives

Enjoy your medieval adventure! 🗡️🛡️
