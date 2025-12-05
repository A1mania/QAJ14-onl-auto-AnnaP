import { Given, When, Then } from "@cucumber/cucumber";
import { RockPaperScissors, Moves } from "../../src/rockpaper";
import { expect } from "chai";

let rps: RockPaperScissors;
let result:string;

const validMoves = ["rock", "paper", "scissors"];
let move: string;

Given("I play game", function () {
  rps = new RockPaperScissors();
});

When("move proceed", function () {
  move = rps.generateMove();
});

Then("result is a valid move", function () {
  expect(validMoves).to.contain(move);
});



 Given('I have "rock", "paper", "scissors"', function () {
  rps = new RockPaperScissors();
});

When('player throw {string}, bot throw {string}', function (playerThrow: Moves, botThrow: Moves) {
  result = rps.determineWinner(playerThrow, botThrow);
});

Then('result is {string}', function (expected: string) {
  expect(result).to.be.equal(expected);
});
