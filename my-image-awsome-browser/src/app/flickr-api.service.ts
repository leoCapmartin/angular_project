import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http"
import { Photo } from './photo';
import { SearchQuery } from './search-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {

  private apiKey = "63f9f05bd15543d6706371a8abf1bcb7";
  private apiUrl = "https://api.flickr.com/services/rest/";

  constructor(private http: HttpClient) { }

  searchImages(searchQuery: SearchQuery): Observable<Photo[]> {
    const params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('api_key', this.apiKey)
      .set('text', searchQuery.searchTerm)
      // .set('extras', 'url_s, owner_name')
      // .set('safe_search', searchQuery.nsfw ? '3' : '1')
      // .set('sort', searchQuery.sort)
      // .set('min_upload_date', searchQuery.minUploadDate)
      // .set('max_upload_date', searchQuery.maxUploadDate)
      // .set('tags', searchQuery.additionalTags[0])
      // .set('in_gallery', searchQuery.isInGallery ? '1' : '0');

    return this.http.get<any>(this.apiUrl, { params })
      .pipe(
        map(response => {
          const photos = response.photos.photo;
          return photos.map((photo: any) => ({
            id: photo.id,
            title: photo.title,
            imageUrl: photo.url_s,
            ownerName: photo.ownername
          }));
        })
      );
  }
}
