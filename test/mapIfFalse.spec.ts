import { of } from "rxjs";
import { mapIfFalse } from "../src/map/mapIfFalse.rx";


test("it should map value if predicate is false", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(mapIfFalse(
            ({ v }) => !(v > 1),
            ({ v }) => ({ m: (v * 2) })
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect(acc).toEqual([{ v: 1 }, { m: 4 }]);
                done();
            }
        });
});

test("it should not map value if predicate is true", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(mapIfFalse(
            ({ v }) => v > 0,
            ({ v }) => ({ v: 0 })
        ))
        .subscribe({
            next: value => acc.push(value),
            complete: () => {
                expect(acc).toEqual([{ v: 1 }, { v: 2 }]);
                done();
            }
        });
});