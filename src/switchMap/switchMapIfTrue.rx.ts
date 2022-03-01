import { Observable, of, switchMap } from "rxjs";

export function switchMapIfTrue<T, R>(
    predicate: (t: T) => boolean,
    ifTrue: (t: T) => Observable<R>
): (s: Observable<T>) => Observable<T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(switchMap((value: T) => {
            if (predicate(value)) {
                return ifTrue(value);
            }
            return of(value)
        }))
    }
}
