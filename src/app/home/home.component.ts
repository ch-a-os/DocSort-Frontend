import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
  tagsAvailable = [];
  selectedTags: Array<any> = [];

  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    this.tagsAvailable = await this.api.getTags();
  }

  onFileChanged(files: FileList) {
    console.log("onFileChanged was called");
    this.selectedFile = files.item(0);
  }

  onUpload() {
    this.api.uploadFile({
      singleDocument: this.selectedFile,
      title: this.uploadTitle,
      note: this.note,
      tags: this.selectedTags
    });
  }

  addTag(tag) {
    const tagName = tag.explicitOriginalTarget.textContent;
    const tagID = this.tagsAvailable.filter((val) => {
      if(val.name == tagName) return val;
    })[0].id;
    if(this.selectedTags.indexOf(tagID) == -1) this.selectedTags.push(tagID);
    else this.selectedTags.splice(this.selectedTags.indexOf(tagID, 1));
    console.log("Add", tagID)
    console.log(this.selectedTags);
  }

}

