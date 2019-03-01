import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;
  private jwt: string;
  public isLoggedIn: boolean;
  public decodedJwt: IDecodedJwt;

  constructor(private http: HttpClient, private router: Router, private snotifyService: SnotifyService) {
    this.serverString = "http://localhost:9090";
    this.isLoggedIn = false;
    this.decodedJwt = null;
    //this.login("spYro", "PASS");
  }

  /**
   * This function performs a login and sets isLoggedIn to true if successful.
   */
  async login(username, password) {
    const headers = new HttpHeaders({ 'username': username, 'password': password });
    let response = null;
    try {
      response = await this.http.get(`${this.serverString}/login`, { headers: headers }).toPromise();
    } catch (error) {
      console.log("error on login");
      this.toastLoginError();
      return;
    }
    if(response == null) {
      console.log("error on login");
      this.toastLoginError();
      return;
    }
    if(response['jwt'] == null) {
      console.log("error on login");
      this.toastLoginError();
      return;
    }
    this.jwt = response['jwt'];
    this.isLoggedIn = true;
    const helper = new JwtHelperService();
    this.decodedJwt = helper.decodeToken(this.jwt);
    this.router.navigate(['/home']);
    this.toastLoginSuccessfull();
  }

  toastLoginError() {
    this.snotifyService.error("Error on login", {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      position: SnotifyPosition.rightBottom
    });
  }

  toastLoginSuccessfull() {
    this.snotifyService.success("Login ok", {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true
    });
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

  async getAllDocumentsMeta(): Promise<Object> {
    return new Promise<Object>(async (resolve, reject) => {
      try {
        const response = await this.http.get(`${this.serverString}/getAllDocuments`, {
          reportProgress: true,
          observe: 'response',
          headers: new HttpHeaders().set('token', this.jwt)
        }).toPromise();
        resolve(response.body);
      } catch(err) {
        reject(err);
      }      
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