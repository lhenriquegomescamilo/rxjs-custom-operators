import { map, Observable } from "rxjs";

export function mapIfOrElse<T, R, E>(
    predicate: (t: T) => boolean,
    ifTrue: (t: T) => R,
    orElse: (t: T) => E
): (s: Observable<T>) => Observable<T | R | E> {
    return (source: Observable<T>): Observable<T | R | E> => {
        return source.pipe(map((value: T) => {
            if (predicate(value)) {
                return ifTrue(value);
            }
            return orElse(value);
        }))
    }
}
