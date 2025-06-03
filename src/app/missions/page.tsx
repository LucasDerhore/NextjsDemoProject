'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMissions } from '@/lib/MissionContext';
import { motion, AnimatePresence } from 'framer-motion';

function getBadgeColor(categorie: string) {
  switch (categorie) {
    case 'Frontend':
      return 'bg-blue-100 text-blue-700';
    case 'Backend':
      return 'bg-green-100 text-green-700';
    case 'Fullstack':
      return 'bg-purple-100 text-purple-700';
    case 'DevOps':
      return 'bg-orange-100 text-orange-700';
    case 'UI/UX':
      return 'bg-pink-100 text-pink-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default function MissionsPage() {
  const { missions } = useMissions();

  const allCategories = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX'];
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredMissions = selected.length
    ? missions.filter((mission) =>
        mission.categorie.some((cat) => selected.includes(cat))
      )
    : missions;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des missions</h1>

      {/* ✅ Filtres */}
      <div className="mb-6">
        <p className="font-medium mb-2">Filtrer par catégorie :</p>
        <div className="flex flex-wrap gap-4">
          {allCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* ✅ Liste filtrée */}
      <AnimatePresence>
        {filteredMissions.map((mission) => (
          <motion.li
            key={mission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{mission.titre}</h2>
            <p className="text-gray-600">Client : {mission.client}</p>
            <Link
              href={`/missions/${mission.id}`}
              className="text-blue-600 hover:underline inline-block mt-2"
            >
              Voir les détails →
            </Link>
            <div className="mt-3 flex flex-wrap gap-2">
              {mission.categorie.map((cat) => (
                <span
                  key={cat}
                  className={`inline-block px-2 py-1 rounded text-sm font-medium ${getBadgeColor(
                    cat
                  )}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>

      {/* Aucun résultat */}
      {filteredMissions.length === 0 && (
        <p className="text-gray-500 mt-6">Aucune mission ne correspond à ce filtre.</p>
      )}
    </main>
  );
}