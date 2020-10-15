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
    output = this.removeZeros(output);
    console.log(output);
    return output;
  }

  extractCol() {}

  removeZeros(array: number[]) {
    var output = [];
    for (var counter = 0; counter <= 3; counter++) {
      if (array[counter] != 0) {
        output.push(array[counter]);
      }
    }
    return output;
  }

  rightShift() {
    var buffer,
      output = [];
    var pos, bufferPos, diff;
    for (pos = 3; pos < 16; pos += 4) {
      buffer = this.extractRowRight(pos);
      for (bufferPos = 0; bufferPos < buffer.length; bufferPos++) {
        if (buffer[bufferPos] == buffer[bufferPos + 1]) {
          output.push(buffer[bufferPos] * 2);
          bufferPos++;
        } else {
          output.push(buffer[bufferPos]);
        }
      }
    }
    while (output.length != 4){
      output.push(0);
    }
    
    console.log(output);
  }
}
