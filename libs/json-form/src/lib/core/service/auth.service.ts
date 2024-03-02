import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { UserModel } from '../model/user.model';
import { AuthHTTPService } from './auth-http.service';
import { Logout } from '../model/logout.model';
import { AuthModel } from '../model/auth.model';
import { JsonFormService } from '../../json-form.service';

export type UserType = UserModel | undefined;

@Injectable({providedIn: 'root'})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private location: Location,
    private router: Router,
    private jsonFormService:JsonFormService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      /* map((auth: AuthModel) => {
         const result = this.setAuthFromLocalStorage(auth);
         return result;
       }),*/
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  logout() {
    if (this.jsonFormService.environment.sso) {
      this.authHttpService.logoutSSO().subscribe((logout: Logout) => {
        let logoutUrl = logout.logoutUrl;
        const redirectUri = `${location.origin}${this.location.prepareExternalUrl('/')}`;
        if (logoutUrl.includes('/protocol')) {
          logoutUrl = logoutUrl + '?redirect_uri=' + redirectUri;
        } else {
          logoutUrl = logoutUrl + '?id_token_hint=' + logout.idToken + '&post_logout_redirect_uri=' + redirectUri;
        }
        window.location.href = logoutUrl;
      });
    } else {
      this.authHttpService.logout().subscribe();
      this.router.navigate(['']);
    }
    localStorage.removeItem(`${this.jsonFormService.environment.appVersion}-${this.jsonFormService.environment.USERDATA_KEY}`);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(`${this.jsonFormService.environment.appVersion}-${this.jsonFormService.environment.USERDATA_KEY}`, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(`${this.jsonFormService.environment.appVersion}-${this.jsonFormService.environment.USERDATA_KEY}`);
      if (!lsValue) {
        return undefined;
      }
      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  checkLogin():Promise<boolean> {
    let prom = this.authHttpService.isUserLogin().toPromise();
    let that = this;
    return prom.then(function (response) {
      that.currentUserValue = response;
      return true;
    }, function (err) {
      // not logged in so redirect to login page with the return url
       that.authHttpService.logout();
       that.router.navigate(['/auth/login'])
      return false;
    })
  }

  checkLoginDemo():Promise<boolean> {
    let prom = this.authHttpService.isUserLogin().toPromise();
    let that = this;
    return prom.then(function (response) {
      that.currentUserValue = response;
      return true;
    }, function (err) {
      return false;
    })
  }


  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    if (!this.currentUserValue) {
      return Promise.resolve(false);
    }
    for (let i = 0; i < authorities.length; i++) {
      if (this.currentUserValue.authorities.indexOf(authorities[i]) !== -1) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
