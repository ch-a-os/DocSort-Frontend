import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  loginFailed = false;
  failReason: Array<string> = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  async login(username, password) {
    const isFailed = await this.api.login(this.username, this.password);
    if(isFailed != ["200", "OK"]) {
      this.loginFailed = true;
      this.failReason = isFailed;
    }
  }

}
