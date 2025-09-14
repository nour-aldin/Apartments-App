-- CreateTable
CREATE TABLE "public"."apartments" (
    "id" SERIAL NOT NULL,
    "unit_name" TEXT NOT NULL,
    "unit_number" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT,
    "price" MONEY NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area_sqm" DECIMAL(65,30),
    "location" TEXT,
    "primary_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."apartment_images" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "apartment_id" INTEGER NOT NULL,

    CONSTRAINT "apartment_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."amenities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ApartmentAmenity" (
    "apartmentId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "ApartmentAmenity_pkey" PRIMARY KEY ("apartmentId","amenityId")
);

-- AddForeignKey
ALTER TABLE "public"."apartment_images" ADD CONSTRAINT "apartment_images_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ApartmentAmenity" ADD CONSTRAINT "ApartmentAmenity_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ApartmentAmenity" ADD CONSTRAINT "ApartmentAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "public"."amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
