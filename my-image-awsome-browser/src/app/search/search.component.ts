import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { SearchQuery } from '../search-query';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotosListService } from '../photos-list.service';
import { SearchQueryService } from '../search-query.service';
import { query } from '@angular/animations';
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
    additionalTags: new Set<string>(),
    sort:  "relevance",
    page: 1,
  }

  tagName: string = "";

  constructor(private flickrApiService: FlickrApiService,
    private photosListService: PhotosListService, private searchQueryService: SearchQueryService) {}

  ngOnInit(): void {
    this.searchQueryService.setQuery(this.query);
  }

  addTag() {
    if (this.tagName.trim() === "") return;

    this.query.additionalTags.add(this.tagName);
    this.tagName = "";
  }

  removeTag(tag: string) {
    this.query.additionalTags.delete(tag);
  }

  search() {
    if (this.query.searchTerm.trim() === "") return;
    this.searchQueryService.setQuery(this.query);
    this.flickrApiService.searchImages(this.query).subscribe(data => {
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
