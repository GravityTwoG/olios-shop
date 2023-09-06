import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';

export default function NotFoundPage() {
  return (
    <Container className="h-full m-8 flex items-center justify-center flex-col">
      <H1>404 - Page not found</H1>
    </Container>
  );
}
