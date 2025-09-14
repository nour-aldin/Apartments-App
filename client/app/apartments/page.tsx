import getAllApartments from "../../lib/queries/apartments/getAllApartments";
import ApartmentCard from "./_components/apartment-card";
import ApartmentFilter from "./_components/apartment-filter";

interface PageProps {
  searchParams: Promise<{ [key: string]: string }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const { unitName } = await searchParams;
  const apartments = await getAllApartments();

  const filteredApartment = unitName
    ? apartments.filter((apartment) =>
        apartment.unitName.toLowerCase().includes(unitName.toLowerCase())
      )
    : apartments;

  return (
    <div className="container mx-auto p-4">
      <ApartmentFilter />
      <h1 className="text-3xl font-bold mb-6">Available Apartments</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-40">
        {filteredApartment.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default Page;
