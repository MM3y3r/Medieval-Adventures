import { Location } from '../types';
export declare class GameWorld {
    private locations;
    constructor();
    private initializeWorld;
    getLocation(locationId: string): Location | undefined;
    getAllLocations(): {
        [key: string]: Location;
    };
}
//# sourceMappingURL=GameWorld.d.ts.map