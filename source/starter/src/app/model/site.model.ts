export interface Review {
  _id: string;
  userId: string;
  siteId: string;
  rating: number;
  comment: string;
  
}
export interface TouristSite {
  _id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  average_rating: number;
  photos: string[];
  location: {
    type: string;
    coordinates: number[];
  };
  reviews?: Review[];
}
