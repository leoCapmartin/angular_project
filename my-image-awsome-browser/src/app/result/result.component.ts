import { Component } from '@angular/core';
import { Photo } from '../photo';
import { PhotosListService } from '../photos-list.service';
import { SearchQueryService } from '../search-query.service';
import { SearchQuery } from '../search-query';
import { FlickrApiService } from '../flickr-api.service';
import { Details } from '../details';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  display = "none"
  photos: Photo[] = [];
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
  };
  index: number = 0;
  grid: Boolean = true;

  constructor(private photoListService: PhotosListService, private searchQueryService: SearchQueryService, private flickrApiService: FlickrApiService) {
    photoListService.getPhotos.subscribe(photos => {
      this.photos = photos;
    });
    searchQueryService.getQuery.subscribe(query => {
      this.query = query;
    });
  }

  toggleGrid() {
    this.grid = !this.grid;
  }
  details : Details = 
  {
    author : "",
    date : "",
    position : ""
  }
  public close(status : string){
    this.display = status
  }
  public showDetails(pic : Photo){
  
    if (this.display == "none")
    {
      this.display = "block"
    }
    this.flickrApiService.getPhotoInfos(pic.id).subscribe((data) => {
      this.details.author = data.author;
      this.details.date = data.date;
      this.details.position = "unknown"
    })
    this.flickrApiService.getLocation(pic.id).subscribe((data) =>{
    })
  }

  getNewPic() {
    this.query.page++;
    this.searchQueryService.setQuery(this.query);
    this.flickrApiService.searchImages(this.query).subscribe(data => {
      this.photos = this.photos.concat(data);
      this.photoListService.setPhotos(this.photos);
    });
    }

  changeImg(i: number) {
    this.index += i;
    if (this.index < 0)
      this.index = 0;
    else if (this.index === this.photos.length)
      this.getNewPic();
  }
}
