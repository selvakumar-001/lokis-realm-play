import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { GamesLibrary } from "@/components/site/GamesLibrary";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Loki's Realm — Gaming Café | PS5, Racing SIM & Board Games";
const description =
  "Loki's Realm is a Norse-themed gaming café with PS5 stations, racing and flight simulators, and 40+ board games. Mischief-makers welcome.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="realm-bg min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <GamesLibrary />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
