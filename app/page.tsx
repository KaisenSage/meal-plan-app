// app/page.tsx (HomePage)
"use client";

import Link from "next/link";

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
  <footer className="text-center text-white bg-emerald-400">
    <div className="px-6 py-10">
      <section className="mb-10 text-white">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center">
          <div>
            <h6 className="uppercase font-bold">
              <a href="/about" className="text-white hover:underline">
                About Us
              </a>
            </h6>
          </div>
          <div>
            <h6 className="uppercase font-bold">
              <a href="/products" className="text-white hover:underline">
                Products
              </a>
            </h6>
          </div>
          <div>
            <h6 className="uppercase font-bold">
              <a href="/awards" className="text-white hover:underline">
                Awards
              </a>
            </h6>
          </div>
          <div>
            <h6 className="uppercase font-bold">
              <a href="/help" className="text-white hover:underline">
                Help
              </a>
            </h6>
          </div>
          <div>
            <h6 className="uppercase font-bold">
              <a href="/contact" className="text-white hover:underline">
                Contact
              </a>
            </h6>
          </div>
        </div>
      </section>

      <hr className="my-8 border-white/30" />

      <section className="mb-10 text-white">
  <div className="max-w-3xl mx-auto text-center text-sm text-white/90">
    <p className="mb-4"></p>
    <div className="flex justify-center space-x-6 text-lg">
      <a
        href="https://facebook.com/sagecorp"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white/80 transition"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a
        href="https://twitter.com/sagecorp"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white/80 transition"
      >
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href="https://instagram.com/sagecorp"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white/80 transition"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="https://linkedin.com/company/sagecorp"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white/80 transition"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a
        href="https://github.com/sagecorp"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white/80 transition"
      >
        <i className="fab fa-github"></i>
      </a>
    </div>
  </div>
</section>


      <section className="mb-5 flex justify-center space-x-6">
        {[
          { platform: "facebook", url: "https://facebook.com/sagecorp" },
          { platform: "twitter", url: "https://twitter.com/sagecorp" },
          { platform: "instagram", url: "https://instagram.com/sagecorp" },
          { platform: "linkedin", url: "https://linkedin.com/company/sagecorp" },
          { platform: "github", url: "https://github.com/sagecorp" },
        ].map(({ platform, url }) => (
          <a
            href={url}
            key={platform}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition"
          >
            <i className={`fab fa-${platform}`}></i>
          </a>
        ))}
      </section>
    </div>

    <div className="text-center p-3 bg-black/20">
      © {new Date().getFullYear()} Copyright{" "}
      <a className="text-white font-semibold" href="https://sagecorp.com">
        SAGECORP
      </a>
    </div>
  </footer>
</div>


    </div>
  );
}
