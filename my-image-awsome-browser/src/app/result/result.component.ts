import { Component } from '@angular/core';
import { Photo } from '../photo';
import { PhotosListService } from '../photos-list.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  photos: Photo[] = [];
  constructor(private photoListService: PhotosListService) {
    photoListService.getPhotos.subscribe(photos => {
      this.photos = photos;
    });
  }
}
