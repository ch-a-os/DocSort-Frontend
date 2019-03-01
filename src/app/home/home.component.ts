import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { IDocument } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'docSort';
  allDocuments: Array<IDocument> = [];

  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    this.allDocuments = await this.api.getAllDocumentsMeta();
    console.log(this.allDocuments);
  }

}