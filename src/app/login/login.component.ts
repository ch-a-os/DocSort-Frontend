import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private api: ApiService, private snotifyService: SnotifyService) { }

  ngOnInit() {
  }

  login(username, password) {
    this.api.login(this.username, this.password);
  }

}
