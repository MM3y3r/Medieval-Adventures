import { Game } from "./game/Game";
import { welcome } from "./utils/display";

async function main() {
  welcome();

  const game = new Game();
  await game.start();
}

main().catch(console.error);
