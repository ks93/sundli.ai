import Link from 'next/link'
import { EssayList } from '@/components/essay-list'
import { getAllEssays } from '@/lib/essays'

export default function Home() {
  return (
    <div className="reading page">
      <header className="home-header">
        <p className="eyebrow">Kelvin Sundli</p>
        <h1>
          Writing, projects,
          <br />
          and the occasional exception.
        </h1>
      </header>
      <section aria-labelledby="latest-essays">
        <div className="section-heading">
          <h2 id="latest-essays">Latest essays</h2>
          <Link href="/essays">All essays</Link>
        </div>
        <EssayList essays={getAllEssays().slice(0, 3)} />
      </section>
      <p className="home-links">
        <Link href="/projects">Explore projects</Link>
        <Link href="/contact">Get in touch</Link>
      </p>
    </div>
  )
}
