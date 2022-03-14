import { map, of, switchMap, throwError } from "rxjs";
import { tapError } from "../src/tap";


test("it should tap if has error", done => {
    const acc = [];
    of({ v: 1 }, { v: 2 }).pipe(
        switchMap(({ v }) => throwError(() => new Error(v.toString()))),
        tapError(({ message }: Error) => acc.push({ m: (Number(message) * 2) }))
    )
        .subscribe({
            error: () => {
                expect(acc).toEqual([{ m: 2 }]);
                done();
            }
        });
});