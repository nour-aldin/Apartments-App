import { Apartment } from "../../model/apartment";

async function getAllApartments(): Promise<Apartment[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_SERVER_URL}/apartments`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log("error");
    return [];
  }
}

export default getAllApartments;
