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

  dummyInject() {
    this.grid[0] = 0;
    this.grid[1] = 4;
    this.grid[2] = 4;
    this.grid[3] = 2;
  }

  endGame() {
    if (this.score > this.best) {
      this.best = this.score;
    }
  }

  extractRowRight(pos: number) {
    var output = [];
    for (var counter = 0; counter <= 3; counter++) {
      output.push(this.grid[pos - counter]);
    }
    console.log(output);
    return output;
  }

  extractCol() {}

  removeZeros(array: number[]) {
    var output = [];
    for (var counter = 0; counter <= 3; counter++) {
      output.push(array[pos - counter]);
    }
    console.log(output);
    return output;
  }

  rightShift() {
    var buffer = [];
    var row, cursor1, cursor2, bufferPos;
    for (row = 3; row < 16; row += 4) {
      console.log(row);
      cursor1 = row;
      while (cursor1 > row - 3) {
        cursor2 = cursor1 - 1;
        while (cursor2 >= row - 3) {
          if (this.grid[cursor1] == this.grid[cursor2]) {
            buffer.push(this.grid[cursor2] * 2);
            cursor1 -= 2;
            cursor2 -= 2;
          } else if (this.grid[cursor1] != this.grid[cursor2]) {
            buffer.push(this.grid[cursor1]);
            buffer.push(this.grid[cursor2]);
            cursor1 -= 2;
            cursor2 -= 2;
          } else {
            buffer.push(0);
            cursor1--;
            cursor2--;
          }
          console.log(buffer);
        }
      }
      for (bufferPos = 0; bufferPos <= 3; bufferPos++) {
        this.grid[row - bufferPos] = buffer[bufferPos];
        buffer[bufferPos] = 0;
      }
    }
  }
}
