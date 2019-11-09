/**
 * The class for solving a Sudoku puzzle.
 * It is a pretty simple recursive algorithm, but more efficient than a dumb brute-force
 * iteration because it uses an efficient way of keeping track of the possible values
 * for each cell.
 *
 * NOTE: Although stricly speaking a sudoku only admits one solution, this class can of course
 * be used for grids that may allow multiple solutions (e.g. in a software which is trying
 * to create sudokus).
 * However, this class doesn't do any check in this sense, and it simply returns the first
 * solution found. Being a stable algorithm, moreover, it will always return the same solution.
 */

import { BitCandidates } from "./bitCandidates";

interface IRowCol {
    row: number;
    col: number;
}

type Grid = number[][];

export class Sudoku {
    // The grid itself. Note that this algorithm alters the original grid.
    private grid: Grid;

    // The data structure that keeps track of the possible values for each cell
    private bitCandidates: BitCandidates;

    /**
     * The constructor of a sudoku. Note that the grid passed as input will be changed during
     * the iterations, and will eventually contain the solution.
     */
    constructor(grid: Grid) {
        this.grid = grid;
        this.bitCandidates = this.initCandidates(grid);
    }

    /**
     * The method that calculates the solution.
     * @returns true if a solution has been found. The grid passed in the constructor contains the solution itself.
     */
    public solve(): boolean {
        return this.recursiveSolve(this.grid);
    }

    public toString(): string {
        let ret: string = "";

        for (let row = 0; row < this.grid.length; row++) {
            if (row > 0 && row % 3 === 0) {
                ret = ret + "------+-------+------\n";
            }
            for (let col = 0; col < this.grid[row].length; col++) {
                if (col > 0 && col % 3 === 0) {
                    ret = ret + "| ";
                }
                const cell = this.grid[row][col];
                ret = ret + (cell ? cell.toString() + " " : ". ");
            }
            ret = ret + "\n";
        }
        return ret;
    }

    // The recursive routine that searches the solution
    private recursiveSolve(grid: Grid): boolean {
        while (true) {
            const rowCol = this.getTopmostCell(grid);
            if (!rowCol) {
                // No empty cells, we're done!
                return true;
            }

            const {row, col} = rowCol;

            const mask = this.bitCandidates.getMask(row, col);
            for (let val = 1; mask !== 0 && val <= 9; val++) {
                if ((mask & (1 << val - 1)) !== 0) {
                    this.bitCandidates.useVal(row, col, val);
                    grid[row][col] = val;
                    if (this.recursiveSolve(grid)) {
                        // This value allowed the completion
                        return true;
                    }
                    // Not the good value, try another
                    this.grid[row][col] = 0;
                    this.bitCandidates.clearVal(row, col, val);
                }
            }
            // No values found, unsolvable
            return false;
        }
    }

    // Initialise the candidates data structure by adding the numbers already on the grid
    private initCandidates(grid: Grid): BitCandidates {
        const bitCandidates = new BitCandidates();
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const val = grid[row][col];
                if (val) {
                    bitCandidates.useVal(row, col, val);
                }
            }
        }
        return bitCandidates;
    }

    // The idea is that we always get the cell with less alternatives.
    // Ideally, this should let us to quickly identify situations with no solution:
    // if a cell admits only one value, for instance, it's better if we try that one
    // sooner than later.
    private getTopmostCell(grid: Grid): IRowCol | null {

        let topmostCell: IRowCol = null;
        let bestNumberOfOptions = Number.MAX_VALUE;

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (!grid[row][col]) {
                    const mask = this.bitCandidates.getMask(row, col);
                    const numberOfOptions = this.countBits(mask);
                    if (numberOfOptions < bestNumberOfOptions) {
                        // A cell with fewer options
                        topmostCell = {row, col};
                        bestNumberOfOptions = numberOfOptions;
                    }
                }
            }
        }

        return topmostCell;
    }

    // Counts how many bits are set in val
    private countBits(val: number): number {
        let count = 0;
        while (val) {
            if (val & 1) {
                count++;
            }
            val = val >> 1;
        }
        return count;
    }
}
