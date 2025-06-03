// app/ajouter/succes/page.tsx
import Link from 'next/link';

export default function SuccesPage() {
  return (
    <main className="p-6 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Mission ajoutée avec succès !</h1>
      <p className="text-gray-700 mb-6">Ta mission a bien été enregistrée.</p>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/missions" className="text-blue-600 hover:underline">
          Voir la liste des missions
        </Link>
        <Link href="/ajouter" className="text-green-600 hover:underline">
          Ajouter une autre mission
        </Link>
      </div>
    </main>
  );
}