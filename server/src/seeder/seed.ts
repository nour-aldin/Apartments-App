import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating Apartments');
  const apartments = [
    {
      unitName: '2-Bedroom Deluxe',
      unitNumber: 'A-101',
      projectName: 'Sunset Towers',
      price: 1_500_000,
      bedrooms: 2,
      bathrooms: 1,
      areaSqm: 900,
      location: 'Downtown Cairo',
      primaryImage: 'primary.jpg',

      images: {
        create: [{ imageUrl: 'secondary.jpg' }],
      },
    },
    {
      unitName: 'Luxury Studio',
      unitNumber: 'B-202',
      projectName: 'Palm Hills',
      price: 800,
      bedrooms: 1,
      bathrooms: 1,
      areaSqm: 550,
      location: 'New Cairo',
      primaryImage: 'primary.jpg',
      images: {
        create: [{ imageUrl: 'secondary.jpg' }],
      },
    },
  ];
  for (const apartment of apartments)
    await prisma.apartment.create({ data: apartment });
}

main()
  .then(async () => {
    console.log('Seed data created successfully!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
