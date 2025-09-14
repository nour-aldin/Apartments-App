import { Amenity } from "./amenity";
import { ApartmentImage } from "./apartment-image";

export type Apartment = {
  id: number;
  unitName: string;
  unitNumber: string;
  projectName: string;
  description: string | null;
  price: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: string;
  location: string;
  primaryImage: string;
  createdAt: Date;
  updatedAt: Date;
  images: ApartmentImage[];
  amenities?: Amenity[];
};
