import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchQuery } from './search-query';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {
  private query: BehaviorSubject<SearchQuery> = new BehaviorSubject<SearchQuery>({
    searchTerm: "",
    imageSize:  "w",
    minUploadDate:  "",
    maxUploadDate:  "",
    nsfw:  false,
    isInGallery:  false,
    additionalTags: new Set<string>(),
    sort:  "relevance",
    page: 1,
  });
  getQuery = this.query.asObservable();

  constructor() { }

  setQuery(query: SearchQuery) {
    this.query.next(query);
  }
}
