import {filter, Observable} from "rxjs";

export function filterNotNull<T>(): (s: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(filter(it => it !== null))
    }
}

export function filterNull<T>(): (s: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(filter(it => it === null))
    }
}

export function filterPropNotNull<T>(propName: string): (s: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(filter(it => it[propName] !== null))
    }
}