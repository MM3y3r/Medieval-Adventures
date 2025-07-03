export interface Player {
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    experience: number;
    gold: number;
    inventory: Item[];
    currentLocation: string;
}
export interface Item {
    name: string;
    type: 'weapon' | 'armor' | 'consumable' | 'treasure' | 'key';
    description: string;
    value: number;
    properties?: {
        attack?: number;
        defense?: number;
        healing?: number;
    };
}
export interface Enemy {
    name: string;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    experience: number;
    gold: number;
    loot?: Item[];
}
export interface Location {
    name: string;
    description: string;
    exits: {
        [direction: string]: string;
    };
    enemies?: Enemy[];
    items?: Item[];
    npcs?: NPC[];
}
export interface NPC {
    name: string;
    description: string;
    dialogue: string[];
    quests?: Quest[];
}
export interface Quest {
    id: string;
    title: string;
    description: string;
    objectives: string[];
    rewards: {
        experience: number;
        gold: number;
        items?: Item[];
    };
    isCompleted: boolean;
}
export type GameState = 'menu' | 'playing' | 'combat' | 'dialogue' | 'inventory' | 'paused';
//# sourceMappingURL=index.d.ts.map