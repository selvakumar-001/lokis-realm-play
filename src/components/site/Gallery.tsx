import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { SectionHeading } from "./SectionHeading";

const photos = [
  { src: gallery1, alt: "Players at PS5 stations in the café lounge" },
  { src: gallery2, alt: "Racing simulator rig with triple monitors" },
  { src: gallery3, alt: "Friends around a board game table" },
  { src: gallery4, alt: "Flight simulator setup with yoke and throttle" },
  { src: gallery5, alt: "Horned helmet neon sign on the café wall" },
  { src: gallery6, alt: "Snack counter with esports posters" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker="Gallery" title="Inside the Realm" />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.alt}
              className={`group relative overflow-hidden rounded-xl border border-primary/15 ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="size-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/40 transition-opacity duration-500 group-hover:opacity-0" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
