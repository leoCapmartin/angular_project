import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { SearchQuery } from '../search-query';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword: string = "";
  imageSize: string = "";
  minUploadDate: string = "";
  maxUploadDate: string = "";
  nsfw: boolean = false;
  gallery: boolean = false;
  sort: string = "";

  constructor(private flickrApiService: FlickrApiService) {}

  ngOnInit(): void {
    this.keyword= "";
    this.imageSize= "";
    this.minUploadDate= "";
    this.maxUploadDate= "";
    this.nsfw = false;
    this.gallery = false;
    this.sort= "";
  }

  search() {
    let query: SearchQuery = {
      searchTerm: this.keyword,
      imageSize: this.imageSize,
      minUploadDate: this.minUploadDate,
      maxUploadDate: this.maxUploadDate,
      nsfw: this.nsfw,
      isInGallery: this.gallery,
      sort: this.sort,
      additionalTags: []
    };

    let res = null;

    this.flickrApiService.searchImages(query).subscribe(data => {
      res = data;
      console.log(data);
    },
    (err: HttpErrorResponse) => {
        console.log(err.error)
        if (err.error instanceof Error) {
          console.log("client-side error");
        }
        else {
          console.log("server-side error");
        }
      }
    );
    console.log(res);
  }
}
