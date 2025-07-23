import Image from 'next/image';
import Link from 'next/link';
import { artwork } from '../data/art';

export default function ArtworkGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {artwork.map(({ id, title, price, image, description }) => (
          <Link key={id} href={`/${id}`} className="border rounded shadow hover:shadow-lg transition p-4 block">
            <Image
              src={image}
              alt={title}
              width={400}
              height={300}
              className="rounded"
              priority={true}
            />
            <h3 className="mt-3 font-bold text-xl">{title}</h3>
            <p className="mt-1 text-gray-600">{description}</p>
            <p className="mt-2 font-semibold">${price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
