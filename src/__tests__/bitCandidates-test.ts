import { BitCandidates } from "../bitCandidates";

describe("Tests bitCandidates", () => {

    let bitCandidates: BitCandidates;

    beforeEach(() => {
        bitCandidates = new BitCandidates();
    });

    test("checks initial values", () => {
        const expectedBits = convertToBits([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                expect(bitCandidates.getMask(row, col)).toEqual(expectedBits);
            }
        }
    });

    test("tests value in the same row", () => {
        const testRow = 2;
        const testCol  = 3;
        bitCandidates.useVal(testRow, 8, 5); // Uses number 5 in the last column of test row
        const expectedBits = convertToBits([1, 2, 3, 4, /* 5, */ 6, 7, 8, 9]);
        expect(bitCandidates.getMask(testRow, testCol)).toEqual(expectedBits);
    });

    test("tests value in the same colum", () => {
        const testRow = 2;
        const testCol  = 3;
        bitCandidates.useVal(8, testCol, 3); // Uses number 3 in the last row of test column
        const expectedBits = convertToBits([1, 2, /* 3,*/ 4, 5, 6, 7, 8, 9]);
        expect(bitCandidates.getMask(testRow, testCol)).toEqual(expectedBits);
    });

    test("tests value in the same block", () => {
        const testRow = 2;
        const testCol  = 3;
        bitCandidates.useVal(0, 5, 7); // Uses number 7 in the opposite corner of the block
        const expectedBits = convertToBits([1, 2, 3, 4, 5, 6, /* 7,*/ 8, 9]);
        expect(bitCandidates.getMask(testRow, testCol)).toEqual(expectedBits);
    });
});

/**
 * Helper for converting an array of possible values into a bitmask
 */
function convertToBits(values: number[]): number {
    let ret = 0;

    for (const value of values) {
        ret = ret | (1 << (value - 1));
    }

    return ret;
}
