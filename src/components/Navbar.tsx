'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/missions', label: 'Missions' },
  { href: '/ajouter', label: 'Ajouter' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-100 p-4 shadow-md mb-8">
      <ul className="flex gap-6 justify-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                'font-medium',
                pathname === href ? 'text-blue-600 underline' : 'text-gray-800 hover:text-blue-600'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}