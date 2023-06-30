export interface SearchQuery {
  searchTerm: string;
  minUploadDate: string;
  maxUploadDate: string;
  sort: string;
  nsfw: boolean;
  additionalTags: Set<string>;
  isInGallery: boolean;
  imageSize: string;
  page: number;
}
