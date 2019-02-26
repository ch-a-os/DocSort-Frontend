import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../api.service';
import { TagSelectComponent } from '../tag-select/tag-select.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'docSortGui';
  selectedFile: File;
  uploadTitle: string = "";
  note: string = "";

  constructor(private api: ApiService, private viewRef: ViewContainerRef) {
  }

  async ngOnInit() {}

  onFileChanged(files: FileList) {
    console.log("onFileChanged was called");
    this.selectedFile = files.item(0);
  }

  onUpload() {
    this.api.uploadFile({
      singleDocument: this.selectedFile,
      title: this.uploadTitle,
      note: this.note,
      tags: [2]
    });
  }

}

