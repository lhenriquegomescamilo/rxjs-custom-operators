import { Observable, switchMap } from "rxjs";

export function switchMapIfOrElse<T, R, E>(
    predicate: (t: T) => boolean,
    ifTrue: (t: T) => Observable<R>,
    orElse: (t: T) => Observable<E>
): (s: Observable<T>) => Observable<T | R | E> {
    return (source: Observable<T>): Observable<T | R | E> => {
        return source.pipe(switchMap((value: T) => {
            if (predicate(value)) {
                return ifTrue(value);
            }
            return orElse(value)
        }))
    }
}
