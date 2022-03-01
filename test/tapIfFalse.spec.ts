import { of } from "rxjs";
import { tapIfFalse } from "../src/tap";


test("it should tap value if predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(tapIfFalse(
            ({ v }) => (v < 1),
            ({ v }) => acc.push({ m: (v * 2) })
        ))
        .subscribe({
            complete: () => {
                expect([{ m: 2 }, { m: 4 }]).toEqual(acc);
                done();
            }
        });
});

test("it should not tap value if predicate is true", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(tapIfFalse(
            ({ v }) => v < 0,
            ({ v }) => acc.push({ v: 0 })
        ))
        .subscribe({
            complete: () => {
                expect([{ v: 0 }, { v: 0 }]).toEqual(acc);
                done();
            }
        });
});
