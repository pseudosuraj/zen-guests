import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Zen-Guests Home" className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo-full-horizontal.png"
        alt="Zen-Guests Logo"
        width={300}
        height={390}
        style={{
          width: 300,
          height: 390,
          objectFit: "contain"
        }}
        priority
      />
    </Link>
  );
}
