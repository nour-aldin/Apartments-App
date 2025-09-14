import React from "react";
import getApartmentImages from "@/lib/queries/apartments/getApartmentImages";
import ImageSlider from "./image-slider";

interface ApartmentImagesProps {
  id: number;
}

const ApartmentImages = async ({ id }: ApartmentImagesProps) => {
  const images = await getApartmentImages(id);
  return <ImageSlider images={images} alt={`Apartment ${id}`} />;
};

export default ApartmentImages;
