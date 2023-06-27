import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { SearchQuery } from '../search-query';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../photo';
import { PhotosListService } from '../photos-list.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: SearchQuery = {
    searchTerm: "",
    imageSize:  "w",
    minUploadDate:  "",
    maxUploadDate:  "",
    nsfw:  false,
    isInGallery:  false,
    additionalTags: [],
    sort:  "relevance",
  }

  currentPage: Number = 1;

  constructor(private flickrApiService: FlickrApiService,
    private photosListService: PhotosListService) {}

  ngOnInit(): void {
  }

  search() {


    this.flickrApiService.searchImages(this.query, this.currentPage).subscribe(data => {
      // console.log(data);
      this.photosListService.setPhotos(data);
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
  }
}
