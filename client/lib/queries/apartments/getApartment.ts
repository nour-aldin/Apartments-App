import { Apartment } from "../../model/apartment";

async function getApartment(id: number): Promise<Apartment | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_SERVER_URL}/apartments/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error");
    return null;
  }
}

export default getApartment;
