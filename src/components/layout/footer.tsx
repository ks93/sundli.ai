import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-signature">
        <Link href="/" className="footer-home" aria-label="Back to home">
          <span className="brand-mark" aria-hidden="true" />
        </Link>
        <span>© {new Date().getFullYear()} Kelvin Sundli</span>
      </div>
      <a href="mailto:kelvin@sundli.ai">Get in touch</a>
    </footer>
  )
}
