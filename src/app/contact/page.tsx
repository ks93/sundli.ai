import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/page-container'

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <PageContainer title="Get in touch">
      <ul className="contact-list">
        <li>
          <a href="mailto:kelvin@sundli.ai">kelvin@sundli.ai</a>
        </li>
      </ul>
    </PageContainer>
  )
}
