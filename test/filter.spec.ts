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
                expect([{ v: 1 }]).toEqual(acc);
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
                expect([null]).toEqual(acc);
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
                expect([{ v: 1 }]).toEqual(acc);
                done();
            }
        });
})