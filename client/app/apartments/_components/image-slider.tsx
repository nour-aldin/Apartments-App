import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider = ({ images, alt }: ImageSliderProps) => {
  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="p-0">
                  <CardContent className="p-0">
                    <div className=" relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img}`}
                        alt={`${alt} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Image counter */}
      <div className="text-center mt-2">
        <p className="text-sm text-gray-500">
          {images.length} image{images.length > 1 ? "s" : ""} available
        </p>
      </div>
    </div>
  );
};

export default ImageSlider;
