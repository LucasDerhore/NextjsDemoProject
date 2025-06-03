// app/missions/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useMissions } from '@/lib/MissionContext';
import jsPDF from 'jspdf';

export default function MissionDetailPage() {
  const params = useParams();
  const { missions } = useMissions();

  const mission = missions.find((m) => m.id.toString() === params.id?.toString());

  if (!mission) {
    return <p className="p-6 text-red-500 text-lg font-semibold">Mission introuvable 😢</p>;
  }

  const handleDownloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(mission.titre, 20, 20);

  doc.setFontSize(12);
  doc.text(`Client : ${mission.client}`, 20, 35);
  doc.text(`Catégories : ${mission.categorie.join(', ')}`, 20, 45);

  // Description multi-ligne si nécessaire
  const descriptionLines = doc.splitTextToSize(`Description : ${mission.description}`, 170);
  doc.text(descriptionLines, 20, 60);

  // Téléchargement
  doc.save(`mission-${mission.id}.pdf`);
};

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{mission.titre}</h1>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
      >
        📄 Télécharger en PDF
      </button>
      <p className="text-gray-700 mb-2">
        <strong>Client :</strong> {mission.client}
      </p>
      <p className="text-gray-700">
        <strong>Description :</strong> {mission.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {mission.categorie.map((cat) => (
          <span
            key={cat}
            className={`inline-block px-2 py-1 rounded text-sm font-medium ${getBadgeColor(cat)}`}
          >
            {cat}
          </span>
        ))}
      </div>

    </main>
  );
}

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
