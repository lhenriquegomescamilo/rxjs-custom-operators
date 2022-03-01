import { of } from "rxjs";
import { tapIfOrElse } from "../src/tap";


const ignored = (it) => of(it)

test("it should run tapIfOrElse operator when value receive a true from predicate", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(tapIfOrElse(
            ({ v }) => v > 1,
            ({ v }) => acc.push({ m: (v * 2) }),
            ignored
        ))
        .subscribe({
            complete: () => {
                expect([{ m: 4 }]).toEqual(acc);
                done();
            }
        });
});

test("it should run tapIfOrElse operator with predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(tapIfOrElse(
            ({ v }) => v < 0,
            ignored,
            ({ v }) => acc.push({ m: (v * 2) })
        ))
        .subscribe({
            complete: () => {
                expect(acc).toEqual([{ m: 2 }, { m: 4 }]);
                done();
            }
        });
});
