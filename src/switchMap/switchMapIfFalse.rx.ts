import { Observable, of, switchMap } from "rxjs";

export function switchMapIfFalse<T, R>(
    predicate: (t: T) => boolean,
    ifFalse: (t: T) => Observable<R>
): (s: Observable<T>) => Observable<T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(switchMap((value: T) => {
            if (!predicate(value)) {
                return ifFalse(value);
            }
            return of(value)
        }))
    }
}
