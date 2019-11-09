import { BitCandidates } from "../bitCandidates";

describe("Tests bitCandidates", () => {

    let bitCandidates: BitCandidates;

    beforeAll(() => {
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

//     @Test
//     public void testInitialValues() {
//     }

//     @Test
//     public void testUseValueInSameRow() {
//         final int testRow = 2;
//         final int testCol  = 3;
//         candidates.useVal(testRow, 8, 5); // Uses number 5 in the last column of test row
//         int expectedBits = convertToBits(new int[] {1, 2, 3, 4, /* 5, */ 6, 7, 8, 9});
//         assertEquals("Value for (" + testRow + ", " + testCol + ")", expectedBits, candidates.getMask(testRow, testCol));
//     }

//     @Test
//     public void testUseValueInSameCol() {
//         final int testRow = 2;
//         final int testCol  = 3;
//         candidates.useVal(8, testCol, 3); // Uses number 3 in the last row of test column
//         int expectedBits = convertToBits(new int[] {1, 2, /* 3, */ 4, 5, 6, 7, 8, 9});
//         assertEquals("Value for (" + testRow + ", " + testCol + ")", expectedBits, candidates.getMask(testRow, testCol));
//     }

//     @Test
//     public void testUseValueInSameBlock() {
//         final int testRow = 2;
//         final int testCol  = 3;
//         candidates.useVal(0, 5, 7); // Uses number 7 in the opposite corner of the block
//         int expectedBits = convertToBits(new int[] {1, 2, 3, 4, 5, 6, /* 7, */ 8, 9});
//         assertEquals("Value for (" + testRow + ", " + testCol + ")", expectedBits, candidates.getMask(testRow, testCol));
//     }
// }
