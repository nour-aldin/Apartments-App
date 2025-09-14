"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";

const ApartmentFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("unitName") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const search = searchTerm.trim()
      ? `/apartments?unitName=${encodeURIComponent(searchTerm.trim())}`
      : "/apartments";

    router.push(search);
  };

  const handleClear = () => {
    setSearchTerm("");
    router.push("/apartments");
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="unitName" className="text-sm font-medium">
              Search by Unit Name
            </Label>
            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="unitName"
                  type="text"
                  placeholder="Enter unit name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button type="submit" className="px-6">
                Search
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApartmentFilter;
