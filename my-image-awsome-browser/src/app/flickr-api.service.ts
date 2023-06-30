import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http"
import { Photo } from './photo';
import { SearchQuery } from './search-query';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {

  private apiKey = "63f9f05bd15543d6706371a8abf1bcb7";
  private apiUrl = "https://api.flickr.com/services/rest/";

  constructor(private http: HttpClient) { }
  private getDefaultParams(method: string) {
    return new HttpParams()
      .set('method', method)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('api_key', this.apiKey)
  }

  searchImages(searchQuery: SearchQuery): Observable<Photo[]> {
    const params = this.getDefaultParams("flickr.photos.search")
      .set('api_key', this.apiKey)
      .set('text', searchQuery.searchTerm)
      .set('extras', `url_${searchQuery.imageSize}, url_q, owner_name`)
      .set('safe_search', searchQuery.nsfw ? '3' : '1')
      .set('sort', searchQuery.sort)
      .set('min_upload_date', searchQuery.minUploadDate)
      .set('max_upload_date', searchQuery.maxUploadDate)
      // .set('tags', searchQuery.additionalTags[0])
      .set('in_gallery', searchQuery.isInGallery ? '1' : '0')
      .set('page', searchQuery.page.toString());

    return this.http.get<any>(this.apiUrl, { params })
      .pipe(
        map(response => {
          const photos = response.photos.photo;
          return photos.map((photo: any) => ({
            id: photo.id,
            title: photo.title,
            ownerId: photo.owner,
            ownerName: photo.ownername,
            imageUrl: photo[`url_${searchQuery.imageSize}`],
            thumbnailUrl: photo.url_q
          }));
        })
      );
  }

  getPhotoInfos(photoId: string) {
    const params = this.getDefaultParams("flickr.photos.getInfo")
      .set('photo_id', photoId);

    return this.http.get<any>(this.apiUrl, { params })
      .pipe(map(response => {
          const photo = response.photo;
          return {
            author : photo.owner.username,
            date : photo.dates.taken,
            position : "unknown"
          };
        }), catchError(error => {
          console.log(error);
          throw error;
        })
      );
  }
  getLocation(photoId: string) {
    const params = this.getDefaultParams("flickr.photos.geo.getLocation")
      .set('photo_id', photoId);
    console.log("test")
    return this.http.get<any>(this.apiUrl, { params })
      .pipe(map(response => {
          console.log(response)
          return {
          };
        }), catchError(error => {
          console.log(error);
          throw error;
        })
      );
  }
}
