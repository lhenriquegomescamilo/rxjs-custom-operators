import { filter, Observable } from "rxjs";

export function filterPropNotNull<T>(propName: string): (s: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(filter(it => it[propName] !== null))
    }
}