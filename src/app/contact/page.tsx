import { PageContainer } from '@/components/layout/page-container';

export default function Contact() {
  return (
    <PageContainer 
      title="Get in touch"
      description="You can reach us at:"
    >
      <ul className="list-disc list-inside space-y-2">
        <li>Email: kelvin[at]sundli.ai</li>
        <li>Phone: +47 993 44 356</li>
      </ul>
    </PageContainer>
  );
}
