import { map, Observable } from "rxjs";

export function mapIfFalse<T, R>(
    predicate: (t: T) => boolean,
    ifFalse: (t: T) => R
): (s: Observable<T>) => Observable<T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(map((value: T) => {
            if (!predicate(value)) {
                return ifFalse(value);
            }
            return value;
        }))
    }
}
