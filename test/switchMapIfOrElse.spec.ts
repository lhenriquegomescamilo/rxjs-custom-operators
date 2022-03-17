import { of } from "rxjs";
import { switchMapIfOrElse } from "../src";


const ignored = (it) => of(it)

test("it should switchMap value if predicate is true", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(switchMapIfOrElse(
            ({ v }) => v > 1,
            ({ v }) => of({ m: (v * 2) }),
            ignored
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect([{ v: 1 }, { m: 4 }]).toEqual(acc);
                done();
            }
        });
});

test("it should switchMap by orElse when the predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(switchMapIfOrElse(
            ({ v }) => v < 0,
            ignored,
            ({ v }) => of({ m: (v * 2) })
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect([{ m: 2 }, { m: 4 }]).toEqual(acc);
                done();
            }
        });
});
