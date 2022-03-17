import { of } from "rxjs";
import { takeOne } from "../src";

test("it should take one value", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 })
        .pipe(takeOne())
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