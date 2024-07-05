import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../models/user';

const users: User[] = [
  {
    id: '6645d4e605d11e5b39329d98',
    username: 'kamel@kamel.kamel',
    password: 'admin@123',
    firstName: 'kamel',
    lastName: 'guermassi',
    token: 'admin-token',
  },
  {
    id: '6645d5ed05d11e5b39329ddb',
    username: 'user2@user2.user2',
    password: 'admin@123',
    firstName: 'user2',
    lastName: 'lastName user2',
    token: 'admin-token',
  },
  {
    id: '666705b48ecb2131abf646ec',
    username: 'user3@user3.user3',
    password: 'admin@123',
    firstName: 'user3',
    lastName: 'lastName user3',
    token: 'admin-token',
  },

  {
    id: '6645d659587b926668ca3365',
    username: 'test',
    password: 'hhahah',
    firstName: 'test',
    lastName: 'fr',
    token: 'admin-token',
  },
  {
    id: '6645d7745883f203a6f10a89',
    username: 'ala',
    password: 'mdp',
    firstName: 'ala',
    lastName: 'fr',
    token: 'admin-token',
  },
  {
    id: '6645d78f5883f203a6f10a8b',
    username: 'samir',
    password: 'mdp',
    firstName: 'test',
    lastName: 'fr',
    token: 'admin-token',
  },
];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {} // Inject the service

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(this.handleRoute.bind(this, request, next)));
  }

  handleRoute(request: HttpRequest<any>, next: HttpHandler) {
    const { url, method } = request;
    switch (true) {
      case url.endsWith('/authenticate') && method === 'POST':
        return this.authenticate(request);
      default:
        // pass through any requests not handled above
        return next.handle(request);
    }
  }

  authenticate(request: HttpRequest<any>) {
    const { body } = request;
    const { username, password } = body;
    const user = users.find(
      (x) => x.username === username && x.password === password
    );

    if (!user) {
      return this.error('Username or password is incorrect');
    }

    return this.ok({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: user.token,
    });
  }

  ok(body?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    token: string;
  }) {
    return of(new HttpResponse({ status: 200, body }));
  }

  error(message: string) {
    return throwError({ error: { message } });
  }

  unauthorized() {
    return throwError({ status: 401, error: { message: 'Unauthorised' } });
  }

  isLoggedIn(headers: any) {
    return headers.get('Authorization') === 'Bearer fake-jwt-token';
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
