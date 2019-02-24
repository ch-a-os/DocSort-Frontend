import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;
  private jwt: string;
  public isLoggedIn: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.serverString = "http://localhost:9090";
  }

  async login(username, password) {
    const headers = new HttpHeaders({ 'username': username, 'password': password });
    const response = await this.http.get(`${this.serverString}/login`, { headers: headers }).toPromise();
    this.jwt = response['jwt'];
    this.isLoggedIn = true;
    this.router.navigate(['/home']);
  }

  uploadFile(uploadData) {
    this.http.post(`${this.serverString}/uploadSingleDocument`, uploadData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('token', this.jwt)
    }).subscribe(event => {
      console.log("event:" + JSON.stringify(event)); // handle event here
    });
  }

  getToken() {
    return this.jwt;
  }
  
}
