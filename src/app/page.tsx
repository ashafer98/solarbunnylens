import ArtworkGrid from './components/ArtworkGrid';



export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800">Solar Bunny Lens</h1>
      <p className="mt-4 text-center text-gray-600 max-w-xl mx-auto">
        Welcome to my art store! Explore original pieces, digital downloads, and prints.
      </p>

      <ArtworkGrid />
    </main>
  );
}

