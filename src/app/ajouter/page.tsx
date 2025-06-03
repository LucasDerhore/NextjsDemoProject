'use client';

import { useState } from 'react';
import { useMissions } from '@/lib/MissionContext';
import { useRouter } from 'next/navigation';

export default function AjouterMissionPage() {
  const [categories] = useState(['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX']);
  const { ajouterMission } = useMissions();
  const router = useRouter();

  const [titre, setTitre] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const nouvelleMission = {
      id: Date.now(),
      titre,
      client,
      description,
      categorie: selectedCategories,
    };

    ajouterMission(nouvelleMission);

    // 🔁 Appel API pour envoyer l'email
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nouvelleMission),
      });
      console.log('✅ Email envoyé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l’envoi de l’email', error);
    }

    // ✅ Redirection vers la page de succès
    router.push('/ajouter/succes');
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ajouter une nouvelle mission</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Client</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Catégories</label>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories((prev) => [...prev, cat]);
                    } else {
                      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
                    }
                  }}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-green-600"></div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          {isLoading ? 'Ajout en cours...' : 'Ajouter'}
        </button>

      </form>
    </main>
  );
}
