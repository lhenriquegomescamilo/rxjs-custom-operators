import { of } from "rxjs";
import { tapIfTrue } from "../src";


test("it should tap value if predicate is true", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(tapIfTrue(
            ({ v }) => v > 1,
            ({ v }) => acc.push({ m: (v * 2) })
        ))
        .subscribe({
            complete: () => {
                expect(acc).toEqual([{ m: 4 }]);
                done();
            }
        });
});

test("it should not tap value if predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(tapIfTrue(
            ({ v }) => v < 0,
            ({ v }) => acc.push({ v: 0 })
        ))
        .subscribe({
            complete: () => {
                expect(acc).toEqual([]);
                done();
            }
        });
});
