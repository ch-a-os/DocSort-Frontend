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
  async login(username, password): Promise<Array<string>> {
    return new Promise<Array<string>>(async (resolve, reject) => {
      const headers = new HttpHeaders({ 'username': username, 'password': password });
      this.http.get(`${this.serverString}/login`, { headers: headers, observe: 'response' }).toPromise().then((response) => {
        this.jwt = response.body['jwt'];
        this.isLoggedIn = true;
        const helper = new JwtHelperService();
        this.decodedJwt = helper.decodeToken(this.jwt);
        this.router.navigate(['/home']);
        resolve(["200", "OK"]);
      }).catch((err) => {
        console.log("Err=", err)
        if(err.status != 200) {
          resolve([err.status.toString(), err.statusText]);
        }
      });
    })
  }

  async uploadFile(uploadData: IUploadFile) {
    // Create JSON object for the tags
    const tags: Array<any> = [];

    let formData: FormData = new FormData();  
    formData.append('singleDocument',uploadData.singleDocument); 
    formData.append('note',uploadData.note);
    formData.append('tags', "[" + uploadData.tags.toString() + "]");
    formData.append('title',uploadData.title);
    const response = await this.http.post(`${this.serverString}/uploadSingleDocument`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('token', this.jwt)
    }).toPromise();
  }

  async getTags(): Promise<Array<any>> {
    return new Promise<Array<any>>(async (resolve, reject) => {
      await this.http.get(`${this.serverString}/getAllTags`, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders().set('token', this.jwt)
      }).toPromise().then((response: any) => {
        resolve(response.body);
      })
    })
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

interface IUploadFile {
  singleDocument: File;
  title: string;
  note: string;
  tags: Array<any>;
}