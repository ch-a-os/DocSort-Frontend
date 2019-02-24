import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;
  private jwt: string;
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.serverString = "http://localhost:9090";
  }

  /**
   * This function performs an login and sets isLoggedIn to true if successful.
   */
  async login(username, password) {
    const headers = new HttpHeaders({ 'username': username, 'password': password });
    const response = await this.http.get(`${this.serverString}/login`, { headers: headers });
    response.subscribe((obj) => {
      this.jwt = obj['jwt'];
    });
    this.isLoggedIn = true;
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
