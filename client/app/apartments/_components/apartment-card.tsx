import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apartment } from "@/lib/model/apartment";
import getApartmentPrimaryImage from "@/lib/queries/apartments/getApartmentPrimaryImage";
import Image from "next/image";
import Link from "next/link";

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard = async ({ apartment }: ApartmentCardProps) => {
  const { url } = await getApartmentPrimaryImage(apartment.id);

  return (
    <Card className="w-80 h-96 flex flex-col rounded-md overflow-hidden">
      <Link
        href={`/apartments/${apartment.id}`}
        className="flex flex-col h-full"
      >
        <CardHeader className="p-0 flex-shrink-0">
          <div className="w-full h-48 relative bg-gray-200">
            {url ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`}
                alt={`Apartment ${apartment.id}`}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
              {apartment.unitName}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
              {apartment.description}
            </CardDescription>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-green-600">
              ${apartment.price || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {apartment.location || "N/A"}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ApartmentCard;
