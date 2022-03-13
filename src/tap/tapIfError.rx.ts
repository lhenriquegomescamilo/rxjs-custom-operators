import { catchError, Observable, throwError } from "rxjs";

export function tapError<T>(consumer: (error: unknown) => void): (value: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => {
        return source.pipe(catchError(error => {
            consumer(error);
            return throwError(error);
        }));
    };
}