"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BackButton } from "../_components/back-button";

interface CreateApartmentFormData {
  unitName: string;
  unitNumber: string;
  projectName: string;
  description?: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  areaSqm?: string;
  location?: string;
}

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [optionalImages, setOptionalImages] = useState<File[]>([]);

  const [formData, setFormData] = useState<CreateApartmentFormData>({
    unitName: "",
    unitNumber: "",
    projectName: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    areaSqm: "",
    location: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrimaryImage(file);
    }
  };

  const handleOptionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setOptionalImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!primaryImage?.size) {
        throw new Error("Primary image is required");
      }

      const formDataToSend = new FormData();

      // Add apartment data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "") {
          formDataToSend.append(key, value);
        }
      });

      // Add primary image
      formDataToSend.append("primaryImage", primaryImage, "primaryImage");

      // Add optional images
      optionalImages.forEach((image) => {
        formDataToSend.append("optionalImages", image);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/apartments`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create apartment");
      }

      const result = await response.json();

      // Redirect to apartments list or show success message
      router.push("/apartments");
      router.refresh()
    } catch (err) {
      console.error("Error creating apartment:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-5">
        <BackButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Apartment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitName">Unit Name *</Label>
                <Input
                  id="unitName"
                  name="unitName"
                  value={formData.unitName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Apartment A1"
                />
              </div>
              <div>
                <Label htmlFor="unitNumber">Unit Number *</Label>
                <Input
                  id="unitNumber"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 101"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Sunset Residences"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the apartment..."
                rows={3}
              />
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="1000.00"
                />
              </div>
              <div>
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="areaSqm">Area (m²)</Label>
                <Input
                  id="areaSqm"
                  name="areaSqm"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.areaSqm}
                  onChange={handleInputChange}
                  placeholder="85.50"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Downtown, City Center"
                />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryImage">Primary Image *</Label>
                <Input
                  id="primaryImage"
                  type="file"
                  accept="image/*"
                  onChange={handlePrimaryImageChange}
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {primaryImage && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {primaryImage.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="optionalImages">Additional Images</Label>
                <Input
                  id="optionalImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleOptionalImagesChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {optionalImages.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {optionalImages.length} file(s)
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Creating..." : "Create Apartment"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
