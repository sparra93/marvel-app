import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestInterceptor implements HttpInterceptor {

    constructor() { }

    /**
     * Interceptor add header to all calls to services
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        });
        const authRequest = req.clone({headers});
        console.log(authRequest);
        return next.handle(authRequest);
    }

}
