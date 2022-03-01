import { filter, Observable } from "rxjs";

export function filterNotNull<T>(): (s: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(filter(it => it !== null))
    }
}

