import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {
  score: number;
  best: number;
  ended: boolean;
  grid: any[];

  constructor() {}

  ngOnInit() {
    this.newGame();
    this.best = 0;
  }

  newGame() {
    this.grid = Array(16).fill(0);
    this.ended = false;
    this.score = 0;
  }

  rng() {
    var randPos = Math.floor(Math.random() * 15);
    while (this.grid[randPos] == 0) {
      var randPos = Math.floor(Math.random() * 15);
      this.grid[randPos] = 2;
    }
  }

  dummyInject() {
    // this.grid[0] = 0;
    // this.grid[1] = 4;
    // this.grid[2] = 4;
    // this.grid[3] = 2;
    this.grid[0] = 0;
    this.grid[4] = 4;
    this.grid[8] = 4;
    this.grid[12] = 2;
  }

  endGame() {
    if (this.score > this.best) {
      this.best = this.score;
    }
  }

  // Extract row with the largest grid position at front
  // Input: RIGHT most grid position of row to be extracted
  extractRowRight(pos: number) {
    var output = [];
    for (var counter = 0; counter <= 3; counter++) {
      output.push(this.grid[pos - counter]);
    }
    output = this.removeZeros(output);
    return output;
  }

  // Extract row with the smallest grid position at front
  // Input: LEFT most grid position of row to be extracted
  extractRowLeft(pos: number) {
    var output = [];
    for (var counter = 3; counter >= 0; counter--) {
      output.push(this.grid[pos + counter]);
    }
    output = this.removeZeros(output);
    return output;
  }

  // Extract col with the largest grid position at front
  // Input: LOWEST most grid position of row to be extracted
  extractColDown(pos: number) {
    var output = [];
    for (var counter = 0; counter <= 12; counter += 4) {
      output.push(this.grid[pos - counter]);
    }
    output = this.removeZeros(output);
    return output;
  }

  // Extract row with the smallest grid position at front
  // Input: HIGHEST most grid position of row to be extracted
  extractColUp(pos: number) {
    var output = [];
    for (var counter = 15; counter >= 0; counter -= 4) {
      output.push(this.grid[pos + counter]);
    }
    output = this.removeZeros(output);
    return output;
  }

  // Removes the zeros in an extracted row/col
  // Input: array of row/col to be parsed
  removeZeros(array: number[]) {
    var output = [];
    for (var counter = 0; counter <= 3; counter++) {
      if (array[counter] != 0) {
        output.push(array[counter]);
      }
    }
    return output;
  }

  // Right shifts the entire grid
  rightShift() {
    var buffer = [],
      output = [];
    var pos: number, bufferPos: number, outputPos: number;
    for (pos = 3; pos < 16; pos += 4) {
      buffer = this.extractRowRight(pos);
      for (bufferPos = 0; bufferPos < buffer.length; bufferPos++) {
        if (buffer[bufferPos] == buffer[bufferPos + 1]) {
          output.push(buffer[bufferPos] * 2);
          this.score += buffer[bufferPos] * 2;
          bufferPos++;
        } else {
          output.push(buffer[bufferPos]);
        }
      }
      while (output.length != 4) {
        output.push(0);
      }
      for (outputPos = pos - 3; outputPos <= pos; outputPos++) {
        this.grid[outputPos] = output.pop();
      }
    }
  }

  // Left shifts the entire grid
  leftShift() {
    var buffer = [],
      output = [];
    var pos: number, bufferPos: number, outputPos: number;
    for (pos = 0; pos < 13; pos += 4) {
      buffer = this.extractRowLeft(pos);
      console.log("buffer: " + buffer);
      for (bufferPos = 0; bufferPos < buffer.length; bufferPos++) {
        if (buffer[bufferPos] == buffer[bufferPos + 1]) {
          output.push(buffer.pop() * 2);
          // this.score += (buffer.pop()) * 2;
          bufferPos++;
        } else {
          output.push(buffer.pop());
        }
      }
      while (output.length != 4) {
        output.push(0);
      }
      console.log("output: " + output);
      for (outputPos = pos + 3; outputPos >= pos; outputPos--) {
        this.grid[outputPos] = output.pop();
      }
    }
  }

  // Down shfits the entire grid
  downShift() {
    var buffer = [],
      output = [];
    var pos: number, bufferPos: number, outputPos: number;
    for (pos = 12; pos < 16; pos++) {
      buffer = this.extractColDown(pos);
      for (bufferPos = 0; bufferPos < buffer.length; bufferPos++) {
        if (buffer[bufferPos] == buffer[bufferPos + 1]) {
          output.push(buffer[bufferPos] * 2);
          this.score += buffer[bufferPos] * 2;
          bufferPos++;
        } else {
          output.push(buffer[bufferPos]);
        }
      }
      while (output.length != 4) {
        output.push(0);
      }
      for (outputPos = pos - 3; outputPos <= pos; outputPos++) {
        this.grid[outputPos] = output.pop();
      }
    }
  }
}
