import { RockPaperScissors } from "./rockpaper";

 describe("RockPaperScissors Game", () => {
  let rps: RockPaperScissors;
  beforeEach(() => {
    rps = new RockPaperScissors();
  });

  describe("generateMove()", () => {
    it("should generate a valid move", () => {
      const validMoves = ["rock", "paper", "scissors"];
      const move = rps.generateMove();
      expect(validMoves).toContain(move);
    });
  });

  describe("determineWinner() rock", () => {
    it("should return 'player' if player wins", () => {
      const result = rps.determineWinner("rock", "scissors");
      expect(result).toBe("player");
    });

    it("should return 'bot' if bot wins", () => {
      const result = rps.determineWinner("rock", "paper");
      expect(result).toBe("bot");
    });

    it("should return 'draw' if it's a draw", () => {
      const result = rps.determineWinner("rock", "rock");
      expect(result).toBe("draw");
    });
  });

  describe("determineWinner() paper", () => {
    it("should return 'player' if player wins", () => {
      const result = rps.determineWinner("paper", "rock");
      expect(result).toBe("player");
    });

    it("should return 'bot' if bot wins", () => {
      const result = rps.determineWinner("paper", "scissors");
      expect(result).toBe("bot");
    });

    it("should return 'draw' if it's a draw", () => {
      const result = rps.determineWinner("paper", "paper");
      expect(result).toBe("draw");
    });
  });

  describe("determineWinner() scissors", () => {
    it("should return 'player' if player wins", () => {
      const result = rps.determineWinner("scissors", "paper");
      expect(result).toBe("player");
    });

    it("should return 'bot' if bot wins", () => {
      const result = rps.determineWinner("scissors", "rock");
      expect(result).toBe("bot");
    });

    it("should return 'draw' if it's a draw", () => {
      const result = rps.determineWinner("scissors", "scissors");
      expect(result).toBe("draw");
    });
  });
});