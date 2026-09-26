import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DiscoverNearYou from "@/components/DiscoverNearYou";
import Categories from "@/components/Categories";
import PopularInDar from "@/components/PopularInDar";
import HappeningSoon from "@/components/HappeningSoon";
import ExploreByBudget from "@/components/ExploreByBudget";
import SpecialOffers from "@/components/SpecialOffers";
import MapAndPlan from "@/components/MapAndPlan";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900">

      <Header />

      <main>
        <Hero />

        <section className="bg-[#f7f8f6]">
          <DiscoverNearYou />
        </section>

        <Categories />

        <section className="bg-[#f7f8f6]">
          <PopularInDar />
        </section>

        <section className="border-y border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <HappeningSoon />
            <ExploreByBudget />
            <SpecialOffers />
          </div>
        </section>

        <MapAndPlan />

        <section className="px-4 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-green-800 via-green-600 to-green-500 px-6 py-14 text-center text-white shadow-xl sm:px-10 md:py-20">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-green-100">
              Your city. Your adventure.
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Your next Dar adventure starts here.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              Discover unforgettable places, experiences,
              events and hidden gems across Dar es Salaam.
            </p>

            <a
              href="/places"
              className="mt-8 inline-block rounded-xl bg-white px-7 py-4 text-sm font-black text-green-700 shadow-lg transition hover:-translate-y-1 hover:bg-green-50"
            >
              Explore Dar es Salaam
            </a>

          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />

    </div>
  );
}