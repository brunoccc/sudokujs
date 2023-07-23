[![Build Status](https://travis-ci.com/brunoccc/sudokujs.svg?branch=master)](https://travis-ci.com/brunoccc/sudokujs)
[![npm version](https://badge.fury.io/js/%40brunoccc%2Fsudokujs.svg)](https://badge.fury.io/js/%40brunoccc%2Fsudokujs)

# YET ANOTHER SUDOKU SOLVER

Yes! How exciting? And this is a porting of my original Java code: https://github.com/brunoccc/sudoku

Well, this is ~~probably~~ not the most efficient algorithm out there, but nevertheless I thought it could be interesting to share it as an open source project.

### HOW DOES IT WORK

It's basically a simple recursive routine that:

* Finds the empty cell having fewer possible alternatives
* Writes the first possible value for that cell
* Calls itself and checks if that solves the puzzle
* If not, tries with the next possible value in the cell
* If there are no more values, then it's an impossible task

Compared to a normal _brute-force_ algorithm (which tries all the possible combinations until a solution has been found), this code performs better because of two reasons:

* It keeps track of the possible values for each cell (see below how)
* It always selects the cell with less possible alternatives. Ideally, if the puzzle has been designed for a human solver, this means that some cells will have a very limited number of possibilities, and the backtracking will not be used often

The tracking of which values are possible deserves some additional explanation. Essentially it keeps a bitmask for each row, each column, and each block. Each bit set to 1 in a bitmask represents a potentially usable value.
When we write a value in a cell, we set to 0 the corresponding bit for the bitmasks of that row, that column and that block (i.e. "this value is no longer available").  
When we need to know which values are possible for a cell, we simply combine the bitmasks of that row, column and block using a logical `AND`.

![Alternative values and bitmasks](doc/brunoccc-sudoku-1.png?raw=true "Bitmasks")

### HOW TO USE IT

The easiest way is to use the NPM package. Import the project into your `node_modules`:

```
npm install --save @brunoccc/sudokujs
```

And simply use it:

```
const { Sudoku } = require('@brunoccc/sudokujs');

const grid = [
    [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
    [ 0, 0, 0,   0, 0, 3,    0, 8, 5 ],
    [ 0, 0, 1,   0, 2, 0,    0, 0, 0 ],

    [ 0, 0, 0,   5, 0, 7,    0, 0, 0 ],
    [ 0, 0, 4,   0, 0, 0,    1, 0, 0 ],
    [ 0, 9, 0,   0, 0, 0,    0, 0, 0 ],

    [ 5, 0, 0,   0, 0, 0,    0, 7, 3 ],
    [ 0, 0, 2,   0, 1, 0,    0, 0, 0 ],
    [ 0, 0, 0,   0, 4, 0,    0, 0, 9 ],
];

const sudoku = new Sudoku(grid);

if (sudoku.solve()) {
    console.log("Solved!");
    console.log(sudoku.toString());
} else {
    console.log("Impossible!");
}

```




