import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { NavbarService } from './navbar.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http, private navbarService: NavbarService) { }
  private helper = new JwtHelperService;

  login (credenciais) {
    return this.http.post('http://localhost/loja1/login',
        JSON.stringify(credenciais))
        .pipe(
          map((response: any) => {
            if ( response._body ) {
              // console.log(response._body);
              sessionStorage.setItem('token', response._body);
              //
              this.navbarService.setNavState(this.helper.decodeToken(response._body));
              return true;
            } else {
              return false;
            }
        })

        );
  }

  getUserData () {
    return this.navbarService.navstate$;
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  isLoggedIn() {
      const token = sessionStorage.getItem('token');
      if ( token && this.helper.isTokenExpired(token)) {
        return true;
      } else {
        return false;
      }
  }

  /**
   *
   * @ credenciais
   */
  changePassDB (credenciais) {
     return this.http.put('http://localhost/loja1/change',
        JSON.stringify(credenciais))
        .pipe(
          map((response: any) => {
            if ( response._body ) {
              sessionStorage.setItem('token', response._body);
              //
              this.navbarService.setNavState(this.helper.decodeToken(response._body));
              return true;
            } else {
              return false;
            }
          })
        );
  }
}
