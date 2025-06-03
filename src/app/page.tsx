// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur le Blog des Missions Freelance</h1>
      <p className="mb-8 text-center text-gray-700 max-w-xl">
        Ce projet est une démo Next.js v15 avec l’architecture App Router. Il te permet de
        découvrir le rendu côté serveur, les routes dynamiques, les hooks React, et plus encore.
      </p>
      <div className="space-x-4">
        <Link
          href="/missions"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          Voir les missions
        </Link>
        <Link
          href="/ajouter"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          Ajouter une mission
        </Link>
      </div>
    </main>
  );
}