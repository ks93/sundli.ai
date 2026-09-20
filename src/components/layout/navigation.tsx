'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()
  return (
    <nav className="nav" aria-label="Main navigation">
      {[
        ['/essays', 'Essays'],
        ['/projects', 'Projects'],
        ['/contact', 'Contact'],
      ].map(([href, label]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href || pathname.startsWith(`${href}/`)
              ? 'page'
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
