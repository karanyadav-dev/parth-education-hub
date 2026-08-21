import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Parth Education Hub"
        width={70}
        height={70}
        priority
      />
      <div>
        <h1 className="text-2xl font-bold text-primary dark:text-white">
          PARTH
        </h1>
        <p className="text-accent font-semibold">
          EDUCATION HUB
        </p>
      </div>
    </div>
  );
}