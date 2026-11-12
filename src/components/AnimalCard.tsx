import Image from "next/image";

export type Animal = {
  id: string | number;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  photoUrl: string;
};

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-md">
      <div className="relative aspect-[20/13] bg-gray-100">
        <Image
          src={animal.photoUrl}
          alt={`${animal.name}, a ${animal.breed}`}
          fill
          unoptimized
          className="object-cover object-top"
        />
      </div>

      <div className="flex items-start gap-3 p-4 sm:p-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D21312] text-xl font-bold text-white"
        >
          {animal.name.charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[#260101]">
            {animal.name} · {animal.breed}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {animal.owner} · Trained {animal.hoursTrained}{" "}
            {animal.hoursTrained === 1 ? "hour" : "hours"}
          </p>
        </div>
      </div>
    </article>
  );
}
