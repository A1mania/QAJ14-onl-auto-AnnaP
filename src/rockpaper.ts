export type Moves = "rock" | "paper" | "scissors";

export class RockPaperScissors {
  moves: Moves[];
  constructor() {
    this.moves = ["rock", "paper", "scissors"];
  }
   generateMove(): Moves {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }

  determineWinner(player: Moves, bot: Moves): "player" | "bot" | "draw" {
    if (player === bot) {
      return "draw";
    }
    const playerIndex = this.moves.indexOf(player);
    const botIndex = this.moves.indexOf(bot);
    const result = playerIndex - botIndex;

    // Результат == -1 или result == moves.length - 1 -> бот выигрывает
    if (result === -1 || result === this.moves.length - 1) {
      return "bot";
    }

    return "player";
  }
}