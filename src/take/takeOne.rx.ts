import { Observable, take } from "rxjs";


export function takeOne<T>() {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(take(1));
    }
}
