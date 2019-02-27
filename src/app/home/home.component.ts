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
  tags: Array<ITag|number>;

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
      tags: this.tags
    });
  }

  tagsToSendList(tagList: Array<ITag>) {
    console.log("tagsToSendList event fired. length=" + tagList.length);
    console.log(JSON.stringify(tagList));
    this.tags = new Array();
    for (const entry of tagList) {
      if(entry.id != null) {
        this.tags.push(entry.id);
      } else {
        this.tags.push(entry);
      }
    }
    console.log(JSON.stringify(this.tags));

  }

}

interface ITag {
  id?: number;
  name: string;
  logo: string;
  colorBackground: string;
  colorForeground: string;
}

