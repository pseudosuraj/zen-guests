import Image from "next/image";

const HOTEL_LOGOS = [
  { name: "Taj", src: "/brands/taj.png" },
  { name: "Oberoi", src: "/brands/oberoi.png" },
  { name: "Lemon Tree", src: "/brands/lemontree.png" },
  { name: "ITC Hotels", src: "/brands/itc.png" },
  { name: "Vivanta", src: "/brands/vivanta.png" },
  { name: "Sarovar", src: "/brands/sarovar.png" },
];

export default function SocialProofSection() {
  return (
    <section className="bg-white py-12 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
        Trusted by the most innovative hotels in India
      </h2>
      <div className="flex justify-center gap-8 items-center flex-wrap max-w-5xl mx-auto">
        {HOTEL_LOGOS.map(({ name, src }) => (
          <div key={name} className="flex items-center justify-center w-32 h-16">
            <Image src={src} width={100} height={40} alt={name} className="object-contain grayscale opacity-80 hover:opacity-100 transition" />
          </div>
        ))}
      </div>
    </section>
  );
}
