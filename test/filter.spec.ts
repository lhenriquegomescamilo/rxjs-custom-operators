import { of } from "rxjs";
import { filterNotNull, filterNull, filterPropNotNull } from "../src/filter";

test("it should filter not null values", done => {
    const acc = [];
    of(null, { v: 1 })
        .pipe(filterNotNull())
        .subscribe({
            next: value => {
                acc.push(value);
            },
            complete: () => {
                expect(acc).toEqual([{ v: 1 }]);
                done();
            }
        });
});

test("it should filter only null values", done => {
    const acc = [];
    of(null, { v: 1 })
        .pipe(filterNull())
        .subscribe({
            next: value => {
                acc.push(value);
            },
            complete: () => {
                expect(acc).toEqual([null]);
                done();
            }
        });
})

test("it should filter prop not null", done => {
    const acc = [];
    of({ v: 1 }, { v: null })
        .pipe(filterPropNotNull('v'))
        .subscribe({
            next: value => {
                acc.push(value);
            },
            complete: () => {
                expect(acc).toEqual([{ v: 1 }]);
                done();
            }
        });
})