import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  keyword: string = "";
  imageSize: string = "";
  minUploadDate: String = "";
  maxUploadDate: String = "";
  nsfw: boolean = false;
  gallery: boolean = false;
  sort: string = "";

  test() {
    console.log(this.keyword);
    console.log(this.imageSize);
    console.log(this.minUploadDate);
    console.log(this.maxUploadDate);
    console.log(this.nsfw);
    console.log(this.gallery);
  }
}
