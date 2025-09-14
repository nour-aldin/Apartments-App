import getApartmentDetails from "@/lib/queries/apartments/getApartment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bed, Bath, Square, MapPin, Badge } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import ApartmentImages from "../_components/apartment-images";
import { BackButton } from "../_components/back-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const apartment = await getApartmentDetails(+id);

  if (!apartment) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Apartment Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The apartment you're looking for doesn't exist.
          </p>
          <Link href="/apartments">
            <Button>Back to Apartments</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 ">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-6">
          <ApartmentImages id={apartment.id} />
        </div>

        {/* Details Section */}
        <div className="space-y-6 ">
          {/* Basic Info */}
          <Card className="ml-5">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {apartment.unitName}
                  </CardTitle>
                  <p className="text-lg text-gray-600 mt-1">
                    Unit {apartment.unitNumber}
                  </p>
                </div>
                <Badge className="text-lg px-3 py-1">
                  ${apartment.price}/month
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Property Features */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Bed className="w-5 h-5" />
                  <span>
                    {apartment.bedrooms} Bedroom
                    {apartment.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bath className="w-5 h-5" />
                  <span>
                    {apartment.bathrooms} Bathroom
                    {apartment.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                {apartment.areaSqm && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Square className="w-5 h-5" />
                    <span>{apartment.areaSqm} m²</span>
                  </div>
                )}
              </div>

              {/* Location */}
              {apartment.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{apartment.location}</span>
                </div>
              )}

              {/* Project */}
              <div className="pt-2">
                <p className="text-sm text-gray-500">Project</p>
                <p className="font-semibold">{apartment.projectName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {apartment.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {apartment.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-3 ml-5">
            <Button className="w-full" size="lg">
              Contact for Viewing
            </Button>
            <Button variant="outline" className="w-full">
              Save to Favorites
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Unit Name</p>
              <p className="font-semibold">{apartment.unitName}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Unit Number</p>
              <p className="font-semibold">{apartment.unitNumber}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold">${apartment.price}</p>
            </div>
            {apartment.areaSqm && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Area</p>
                <p className="font-semibold">{apartment.areaSqm} m²</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
