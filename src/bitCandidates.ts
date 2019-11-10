/**
 * A class for keeping track of the candidate values for each cell of the sudoku grid.
 * Exactly as many human players, the code tries to keep track of all possible values for a cell.
 * Therefore, every time a number is written into a cell, that value is no longer available for
 * other cells in the same row, column or block.
 *
 * For better performances, we use bitmasks, where each bit represents a possible 1 to 9 value.
 * We have 3 bitmasks representing the values available for each row, column and block.
 * When we write a value in a cell, we clear the corresponding bit in each one of these masks.
 * When we want to know which values are available for a specific cell, we use the logical AND
 * on the three masks.
 */

const ALL_BITS: number = 0x1FF; // 9 bits set to 1

export class BitCandidates {

    private colsMask: number[];

    private rowsMask: number[];

    private blocksMask: number[][];

    constructor() {
        this.colsMask = [];
        this.rowsMask = [];
        this.blocksMask = [];

        for (let i = 0; i < 9; i++) {
            this.colsMask[i] = ALL_BITS;
            this.rowsMask[i] = ALL_BITS;
            if (!this.blocksMask[Math.trunc(i / 3)]) {
                this.blocksMask[Math.trunc(i / 3)] = [];
            }
            this.blocksMask[Math.trunc(i / 3)][i % 3] = ALL_BITS;
        }
    }

    /**
     * Marks a value as used for that row, that col and that block
     */
    public useVal(row: number, col: number, val: number) {
        const bit = ~(1 << (val - 1));
        this.colsMask[col] = this.colsMask[col] & bit;
        this.rowsMask[row] = this.rowsMask[row] & bit;
        const { blockRow, blockCol } = this.getBlockRowCol(row, col);
        this.blocksMask[blockRow][blockCol] = this.blocksMask[blockRow][blockCol] & bit;
    }

    /**
     * Sets a value as available again for that row, that col and that block
     */
    public clearVal(row: number, col: number, val: number) {
        const bit = (1 << (val - 1));
        this.colsMask[col] = this.colsMask[col] | bit;
        this.rowsMask[row] = this.rowsMask[row] | bit;
        const { blockRow, blockCol } = this.getBlockRowCol(row, col);
        this.blocksMask[blockRow][blockCol] = this.blocksMask[blockRow][blockCol] | bit;
    }

    /**
     *  Returns the bitmask for the valid values for that cell
     */
    public getMask(row: number, col: number): number {
        const { blockRow, blockCol } = this.getBlockRowCol(row, col);
        const mask = this.rowsMask[row] & this.colsMask[col] & this.blocksMask[blockRow][blockCol];
        return mask;
    }

    /**
     * Return the row and col of the block of the specified cell
     */
    private getBlockRowCol(row: number, col: number): { blockRow: number, blockCol: number } {
        const blockRow = Math.trunc(row / 3);
        const blockCol = Math.trunc(col / 3);
        return { blockRow, blockCol };
    }
}
