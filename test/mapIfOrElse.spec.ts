import { of } from "rxjs";
import { mapIfOrElse } from "../src";


const ignored = (it) => it

test("it should map value if predicate is true", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(mapIfOrElse(
            ({ v }) => v > 1,
            ({ v }) => ({ m: (v * 2) }),
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

test("it should map by orElse when the predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(mapIfOrElse(
            ({ v }) => v < 0,
            ignored,
            ({ v }) => ({ m: (v * 2) })
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect([{ m: 2 }, { m: 4 }]).toEqual(acc);
                done();
            }
        });
});
