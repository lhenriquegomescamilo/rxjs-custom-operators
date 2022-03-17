import { of } from "rxjs";
import { switchMapIfTrue } from "../src";


test("it should switchMap value if predicate is true", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(switchMapIfTrue(
            ({ v }) => v > 1,
            ({ v }) => of({ m: (v * 2) })
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect(acc).toEqual([{ v: 1 }, { m: 4 }]);
                done();
            }
        });
});

test("it should not switchMap value if predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(switchMapIfTrue(
            ({ v }) => v < 0,
            ({ v }) => of({ v: 0 })
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect([{ v: 1 }, { v: 2 }]).toEqual(acc);
                done();
            }
        });
});
