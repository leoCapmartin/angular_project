import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { SearchQuery } from '../search-query';
import { HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../photo';
import { PhotosListService } from '../photos-list.service';
import { SearchQueryService } from '../search-query.service';
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
    page: 1,
  }

  constructor(private flickrApiService: FlickrApiService,
    private photosListService: PhotosListService, private searchQueryService: SearchQueryService) {}

  ngOnInit(): void {
    this.searchQueryService.setQuery(this.query);
  }

  search() {
    this.searchQueryService.setQuery(this.query);
    this.flickrApiService.searchImages(this.query).subscribe(data => {
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
