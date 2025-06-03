'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMissions } from '@/lib/MissionContext';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

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
      <ul className="mt-8 space-y-6">
        <AnimatePresence>
          {filteredMissions.map((mission) => {
          const handleDownloadPDF = () => {
            const doc = new jsPDF();

            // 📌 Style général
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.setTextColor('#1F2937'); // gris foncé
            doc.text(mission.titre, 105, 25, { align: 'center' });

            // 🔲 Contour
            doc.setDrawColor(150);
            doc.rect(15, 15, 180, 260); // x, y, w, h

            // 🧾 Client
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('Client :', 20, 45);
            doc.setFont('helvetica', 'bold');
            doc.text(mission.client, 50, 45);

            // 🏷️ Catégories
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('Catégories :', 20, 55);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(50, 102, 204); // bleu

            let startX = 50;
            const startY = 55;
            mission.categorie.forEach((cat) => {
              doc.setFillColor(230, 240, 255); // fond badge
              doc.roundedRect(startX - 2, startY - 6, doc.getTextWidth(cat) + 8, 10, 2, 2, 'F');
              doc.text(cat, startX + 2, startY);
              startX += doc.getTextWidth(cat) + 14;
            });

            // 📝 Description encadrée
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(33, 33, 33);
            const descriptionLines = doc.splitTextToSize(mission.description, 160);

            doc.setFillColor(230, 240, 255); // fond gris clair
            doc.rect(20, 70, 170, descriptionLines.length * 8 + 10, 'F');

            doc.setFontSize(14);
            doc.text('Description :', 22, 80);
            doc.setFontSize(12);
            doc.setTextColor(60);
            doc.text(descriptionLines, 22, 90);

            // 📎 Sauvegarde
            doc.save(`mission-${mission.id}.pdf`);
          };

            return (
            <motion.li
              key={mission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-400 p-6 rounded-xl shadow w-full max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold text-gray-800">{mission.titre}</h2>
              <p className="text-sm text-gray-600 mt-1">Client : {mission.client}</p>

              <Link
                href={`/missions/${mission.id}`}
                className="text-blue-600 hover:underline inline-block mt-2 text-sm font-medium"
              >
                Voir les détails →
              </Link>

              {/* Catégories en badges colorés */}
              <div className="mt-4 flex flex-wrap gap-2">
                {mission.categorie.map((cat) => (
                  <span
                    key={cat}
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(cat)}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Bouton PDF */}
              <button
                onClick={handleDownloadPDF}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-sm"
              >
                📄 Télécharger en PDF
              </button>
            </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Aucun résultat */}
      {filteredMissions.length === 0 && (
        <p className="text-gray-500 mt-6">Aucune mission ne correspond à ce filtre.</p>
      )}
    </main>
  );
}