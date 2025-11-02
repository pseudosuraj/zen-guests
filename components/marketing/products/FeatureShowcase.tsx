interface FeatureShowcaseProps {
  imageSrc: string;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
}

export default function FeatureShowcase({
  imageSrc,
  title,
  description,
  bullets,
  reverse = false,
}: FeatureShowcaseProps) {
  return (
    <section className={`w-full flex flex-col md:flex-row items-center my-16 gap-14 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="w-full max-w-lg rounded-xl shadow-xl border border-card-bg bg-card-bg"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-3 text-text-primary">{title}</h2>
        <p className="text-lg mb-5 text-text-secondary">{description}</p>
        <ul className="list-disc pl-5 space-y-2">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="text-text-primary text-base">{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
