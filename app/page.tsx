"use client";

import Link from "next/link";
import Image from "next/image";
import './footer.css';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

export default function HomePage() {
  return (
    <div className="px-4 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-lg mb-12 p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Personalized AI Meal Plans</h1>
        <p className="text-xl mb-6">
          Let our AI do the planning. You focus on cooking and enjoying!
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-white text-emerald-500 font-medium px-5 py-3 rounded hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-lg text-gray-500 mb-12">
            AI-powered meal planning that saves time, reduces stress, and helps you hit your goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
              <div className="text-emerald-500 text-4xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Share your dietary needs, fitness goals, and preferences with ease.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
              <div className="text-emerald-500 text-4xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Generates Your Plan</h3>
              <p className="text-gray-600">
                Our intelligent system designs a weekly meal plan tailored just for you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
              <div className="text-emerald-500 text-4xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Follow Your Plan</h3>
              <p className="text-gray-600">
                Enjoy delicious meals, simple recipes, and an organized grocery list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MealPlan Pro Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              MealPlan <span className="text-emerald-600">Pro</span>
            </h2>
            <p className="text-gray-600 mb-6">
              For health & fitness professionals. Streamline meal planning, deliver
              results, and scale your business faster.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://www.eatthismuch.com/_app/immutable/assets/ios-app-eatthismuch.C4RTd9d9.webp"
              alt="MealPlan Pro Mobile"
              className="w-full rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="my-5">
        <footer className="footer">
          {/* Logo Above Socials */}
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="https://pub-323e019863a3440ba6f23aaf494422d3.r2.dev/ChatGPT%20Image%20Sep%2020%2C%202025%20at%2009_08_23%20AM.png"
              alt="PLan Eats Logo"
              width={80}
              height={80}
              className="mb-2"
            />
          </div>
          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="footer-socials">
              <a href="https://wa.me/2348182006156" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/codewithsage/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaInstagram size={24} />
              </a>
            </div>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} PlanEats. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}