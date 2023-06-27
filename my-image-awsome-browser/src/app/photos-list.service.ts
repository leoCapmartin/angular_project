import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {
  private photos: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);
  getPhotos = this.photos.asObservable();

  constructor() { }

  setPhotos(photos: Photo[]) {
    this.photos.next(photos);
  }
}
