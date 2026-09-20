import Link from 'next/link'
import { formatDate, type Essay } from '@/lib/essays'

export function EssayList({ essays }: { essays: Essay[] }) {
  if (!essays.length) return <p className="muted">No essays published yet.</p>
  return (
    <ul className="content-list">
      {essays.map((essay) => (
        <li className="content-row" key={essay.slug}>
          <h2>
            <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
          </h2>
          {essay.description && <p className="muted">{essay.description}</p>}
          <p className="meta">
            <time dateTime={essay.date}>{formatDate(essay.date)}</time>
            {essay.draft && ' · Draft preview'}
          </p>
        </li>
      ))}
    </ul>
  )
}
