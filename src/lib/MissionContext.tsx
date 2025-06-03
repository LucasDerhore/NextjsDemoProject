// lib/MissionContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Mission = {
  id: number;
  titre: string;
  client: string;
  description: string;
  categorie: string[];
};

type MissionContextType = {
  missions: Mission[];
  ajouterMission: (mission: Mission) => void;
};

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function useMissions() {
  const context = useContext(MissionContext);
  if (!context) throw new Error('useMissions doit être utilisé dans MissionProvider');
  return context;
}

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>([]);

  // Charger les missions depuis localStorage au premier chargement
  useEffect(() => {
    const data = localStorage.getItem('missions');
    if (data) {
      setMissions(JSON.parse(data));
    } else {
      // Initial mock
      const initial: Mission[] = [
        { id: 1, titre: 'Dashboard Angular', client: 'EDF', description: '...', categorie: ['None'] },
        { id: 2, titre: 'Refonte Next.js', client: 'Decathlon', description: '...', categorie: ['None'] },
      ];
      setMissions(initial);
      localStorage.setItem('missions', JSON.stringify(initial));
    }
  }, []);

  // Mettre à jour localStorage quand missions change
  useEffect(() => {
    localStorage.setItem('missions', JSON.stringify(missions));
  }, [missions]);

  const ajouterMission = (mission: Mission) => {
    setMissions((prev) => [...prev, mission]);
  };

  return (
    <MissionContext.Provider value={{ missions, ajouterMission }}>
      {children}
    </MissionContext.Provider>
  );
}
