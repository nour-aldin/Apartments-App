import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Building2, Search, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Logo */}
          <Link className="flex justify-center mb-8" href="/apartments">
            <Image
              src="/tab-icon.png"
              alt="Apartments App Logo"
              width={120}
              height={120}
              className="drop-shadow-lg"
            />
          </Link>

          {/* Welcome Text */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="block text-blue-600">Apartments App</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your perfect home with our comprehensive apartment search
            platform. Discover amazing properties, compare prices, and book your
            next apartment with ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apartments">
              <Button size="lg" className="text-lg px-8 py-3">
                <Search className="w-5 h-5 mr-2" />
                Browse Apartments
              </Button>
            </Link>
            <Link href="/apartments/create">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Building2 className="w-5 h-5 mr-2" />
                List Your Property
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Find apartments by name, location, price range, and amenities
                with our powerful search filters.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Properties</h3>
              <p className="text-gray-600">
                Browse through verified, high-quality apartments with detailed
                photos and descriptions.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
              <p className="text-gray-600">
                Connect with verified landlords and property managers in a
                secure environment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Available Apartments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Locations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Happy Tenants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Dream Apartment?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your search today and discover the perfect place to call home.
          </p>
          <Link href="/apartments">
            <Button size="lg" className="text-lg px-12 py-4">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/tab-icon.png"
              alt="Apartments App Logo"
              width={40}
              height={40}
            />
          </div>
          <p className="text-gray-400">
            © 2025 Apartments App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
