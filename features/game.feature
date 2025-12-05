Feature: Game

Scenario: validMoves
   Given I play game
    When move proceed
    Then result is a valid move

Scenario Outline: determineWinner
   Given I have "rock", "paper", "scissors"
    When player throw "<player>", bot throw "<bot>"
    Then result is "<result>"

    Examples:
      | player   | bot       | result |
      | rock     | scissors  | player |
      | rock     | paper     | bot    |
      | rock     | rock      | draw   |
      | paper    | rock      | player |
      | paper    | scissors  | bot    |
      | paper    | paper     | draw   |
      | scissors | paper     | player |
      | scissors | rock      | bot    |
      | scissors | scissors  | draw   |