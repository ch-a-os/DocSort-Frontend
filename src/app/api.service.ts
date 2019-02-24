import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;
  private jwt: string;
  public isLoggedIn: boolean;
  public decodedJwt: IDecodedJwt;

  constructor(private http: HttpClient, private router: Router) {
    this.serverString = "http://localhost:9090";
    this.isLoggedIn = false;
    this.decodedJwt = null;
  }

  /**
   * This function performs a login and sets isLoggedIn to true if successful.
   */
  async login(username, password) {
    const headers = new HttpHeaders({ 'username': username, 'password': password });
    const response = await this.http.get(`${this.serverString}/login`, { headers: headers }).toPromise();
    this.jwt = response['jwt'];
    this.isLoggedIn = true;
    const helper = new JwtHelperService();
    this.decodedJwt = helper.decodeToken(this.jwt);
    this.router.navigate(['/home']);
  }

  async uploadFile(uploadData) {
    const response = await this.http.post(`${this.serverString}/uploadSingleDocument`, uploadData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('token', this.jwt)
    }).toPromise();
  }

  getToken() {
    return this.jwt;
  }
  
}

interface IDecodedJwt {
  id: number;
  username: string;
  iat: number;
  exp: number;
}