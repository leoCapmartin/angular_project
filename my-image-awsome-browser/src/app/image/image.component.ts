import { Component, Input } from '@angular/core';
import { Photo } from '../photo';
import { FlickrApiService } from '../flickr-api.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() photo: Photo = {
    id: "",
    title: "",
    ownerId: "",
    ownerName: "",
    imageUrl: "",
    thumbnailUrl: ""
  };

  constructor(private flickrApiService: FlickrApiService) {}
}
