import { Sudoku } from "../sudoku";

describe("Tests solver", () => {

    test("solves an empty grid", () => {
        const grid = [
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],

            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],

            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
            [ 0, 0, 0,   0, 0, 0,    0, 0, 0 ],
        ];

        const sudoku = new Sudoku(grid);
        expect(sudoku.solve()).toBeTruthy();

        const expected = [
            [ 1, 2, 3,   4, 5, 6,    7, 8, 9 ],
            [ 4, 5, 6,   7, 8, 9,    1, 2, 3 ],
            [ 7, 8, 9,   1, 2, 3,    4, 5, 6 ],

            [ 2, 3, 1,   6, 7, 4,    8, 9, 5 ],
            [ 8, 7, 5,   9, 1, 2,    3, 6, 4 ],
            [ 6, 9, 4,   5, 3, 8,    2, 1, 7 ],

            [ 3, 1, 7,   2, 6, 5,    9, 4, 8 ],
            [ 5, 4, 2,   8, 9, 7,    6, 3, 1 ],
            [ 9, 6, 8,   3, 4, 1,    5, 7, 2 ],
        ];
        expect(grid).toEqual(expected);
    });

    test("solves the example", () => {
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
        expect(sudoku.solve()).toBeTruthy();

        const expected = [
            [ 9, 8, 7,   6, 5, 4,    3, 2, 1 ],
            [ 2, 4, 6,   1, 7, 3,    9, 8, 5 ],
            [ 3, 5, 1,   9, 2, 8,    7, 4, 6 ],

            [ 1, 2, 8,   5, 3, 7,    6, 9, 4 ],
            [ 6, 3, 4,   8, 9, 2,    1, 5, 7 ],
            [ 7, 9, 5,   4, 6, 1,    8, 3, 2 ],

            [ 5, 1, 9,   2, 8, 6,    4, 7, 3 ],
            [ 4, 7, 2,   3, 1, 9,    5, 6, 8 ],
            [ 8, 6, 3,   7, 4, 5,    2, 1, 9 ],
        ];
        expect(grid).toEqual(expected);
    });

    test("tries an impossible", () => {
        const grid = [
            [ 0, 0, 0,   0, 6, 0,    0, 0, 0 ],
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
        expect(sudoku.solve()).toBeFalsy();
    });
});

describe("tests utility methods", () => {
    test("string conversion", () => {
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
        const expected =
            ". . . | . . . | . . . \n" +
            ". . . | . . 3 | . 8 5 \n" +
            ". . 1 | . 2 . | . . . \n" +
            "------+-------+------ \n" +
            ". . . | 5 . 7 | . . . \n" +
            ". . 4 | . . . | 1 . . \n" +
            ". 9 . | . . . | . . . \n" +
            "------+-------+------ \n" +
            "5 . . | . . . | . 7 3 \n" +
            ". . 2 | . 1 . | . . . \n" +
            ". . . | . 4 . | . . 9 \n";

        expect(sudoku.toString()).toEqual(expected);
    });
});
