import { map, Observable } from "rxjs";

export function mapIfTrue<T, R>(
    predicate: (t: T) => boolean,
    ifTrue: (t: T) => R
): (s: Observable<T>) => Observable<T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(map((value: T) => {
            if (predicate(value)) {
                return ifTrue(value);
            }
            return value;
        }))
    }
}
