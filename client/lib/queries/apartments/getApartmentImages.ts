async function getApartmentImages(id: number): Promise<string[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_SERVER_URL}/apartments/${id}/images`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error");
    return [];
  }
}

export default getApartmentImages;
