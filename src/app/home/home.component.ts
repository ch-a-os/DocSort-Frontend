import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'docSort';
  allDocuments: Array<any> = [];

  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    // @ts-ignore: It's not an object, it's an Array.
    this.allDocuments = await this.api.getAllDocumentsMeta();
    console.log(this.allDocuments);
  }

}