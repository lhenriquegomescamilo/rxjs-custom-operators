import { Observable, tap } from "rxjs";

export function tapIfFalse<T, R>(
    predicate: (t: T) => boolean,
    ifFalse: (t: T) => void
): (s: Observable<T>) => Observable<T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(tap((value: T) => {
            if (!predicate(value)) {
                ifFalse(value)
            }
        }))
    }
}
