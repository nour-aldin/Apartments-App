async function getApartmentPrimaryImage(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_SERVER_URL}/apartments/${id}/primary-image`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default getApartmentPrimaryImage;
