import { Player, Enemy } from '../types';
export declare class Combat {
    startCombat(player: Player, enemy: Enemy): Promise<void>;
    private playerAttack;
    private playerDefend;
    private useItem;
    private enemyAttack;
    private attemptRun;
    private victory;
    private defeat;
    private levelUp;
}
//# sourceMappingURL=Combat.d.ts.map