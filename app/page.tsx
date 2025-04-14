// app/page.tsx (HomePage)
"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
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
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-column">
  <h3 className="footer-heading">For Users</h3>
  <ul className="footer-list">
    <li><a href="/how-it-works" className="footer-link">How It Works</a></li>
    <li><a href="/plans-and-pricing" className="footer-link">Plans & Pricing</a></li>
    <li><a href="/recipes" className="footer-link">Explore Recipes</a></li>
    <li><a href="/dietary-preferences" className="footer-link">Dietary Preferences</a></li>
  </ul>
</div>

{/* Column 2 */}
<div className="footer-column">
  <h3 className="footer-heading">For Professionals</h3>
  <ul className="footer-list">
    <li><a href="/mealplan-pro" className="footer-link">MealPlan Pro</a></li>
    <li><a href="/tools-for-nutritionists" className="footer-link">Tools for Nutritionists</a></li>
    <li><a href="/business-solutions" className="footer-link">Business Solutions</a></li>
    <li><a href="/partner-with-us" className="footer-link">Partner With Us</a></li>
  </ul>
</div>

{/* Column 3 */}
<div className="footer-column">
  <h3 className="footer-heading">Resources</h3>
  <ul className="footer-list">
    <li><a href="/help" className="footer-link">Help & Support</a></li>
    <li><a href="/faq" className="footer-link">FAQs</a></li>
    <li><a href="/blog" className="footer-link">Blog</a></li>
    <li><a href="/health-tips" className="footer-link">Health Tips</a></li>
  </ul>
</div>

{/* Column 4 */}
<div className="footer-column">
  <h3 className="footer-heading">Company</h3>
  <ul className="footer-list">
    <li><a href="/about-us" className="footer-link">About Us</a></li>
    <li><a href="/careers" className="footer-link">Careers</a></li>
    <li><a href="/media" className="footer-link">Media</a></li>
    <li><a href="/contact" className="footer-link">Contact Us</a></li>
  </ul>
</div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} MealPlan. All rights reserved.
        </p>
      </div>
    </footer>
</div>
    </div>
  );
}
