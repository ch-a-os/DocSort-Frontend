import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css']
})
export class TagSelectComponent implements OnInit {
  tagsAvailableRaw;
  //tagsSelectedRaw;
  tagsAvailable: Array<TagComponent>;
  tagsSelected: Array<TagComponent>;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    this.tagsAvailableRaw = new Array<any>();
    this.tagsAvailable = new Array<TagComponent>();
    this.tagsSelected = new Array<TagComponent>();
  }

  async ngOnInit() {
    this.tagsAvailableRaw = await this.api.getTags();
    //this.tagsSelected = await this.api.getTags();
    console.log("loaded " + this.tagsAvailableRaw.length + " tags");
  }

  toggleSelect(tag: TagComponent) {
    console.log("parent called: " + tag.tagData.name);
    let foundEntryIndex = this.tagsSelected.indexOf(tag);
    if(foundEntryIndex == -1) {
      console.log("tag " + tag.tagData.name + " not found, pushing");
      this.tagsSelected.push(tag);
    } else {
      console.log("tag " + tag.tagData.name + " found, removing");
      //this.tagsSelected.splice(foundEntryIndex, 1);
      this.tagsSelected.pop();
      this.tagsSelected.pop();
    }
    //this.tagsSelected = [].concat(this.tagsSelected);
    
    //let temp = Object.assign([],this.selectedTags);
    //this.selectedTags = temp;
    //this.cdr.detectChanges();
    //console.log("length=" + this.tagsAvailable.length + " / " + this.tagsSelected.length);
  }

  /*selectTag(tag: TagComponent) {
    let foundEntry = this.selectedTags.indexOf(tag);
    if(foundEntry == -1) {
      this.selectedTags.push(tag);
    }
  }

  deselectTag(tag: TagComponent) {
    let foundEntryIndex = this.selectedTags.indexOf(tag);
    if(foundEntryIndex != -1) {
      this.selectedTags.splice(foundEntryIndex, 1);
    }
  }*/

}
