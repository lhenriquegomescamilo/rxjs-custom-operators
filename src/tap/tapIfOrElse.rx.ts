import { Observable, tap } from "rxjs";

export function tapIfOrElse<T, R>(
    predicate: (t: T) => boolean,
    ifTrue: (t: T) => void,
    orElse: (t: T) => void,
): (s: Observable<T>) => Observable<T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(tap((value: T) => {
            if (predicate(value)) {
                ifTrue(value)
            } else {
                orElse(value);
            }
        }))
    }
}
