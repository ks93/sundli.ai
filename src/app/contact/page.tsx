import { PageContainer } from '@/components/layout/page-container';
import { List, ListItem } from '@/components/ui/list';

export default function Contact() {
  return (
    <PageContainer 
      title="Get in touch"
    >
      <List>
        <ListItem>kelvin[at]sundli.ai</ListItem>
        <ListItem>+47 993 44 356</ListItem>
      </List>
    </PageContainer>
  );
}
