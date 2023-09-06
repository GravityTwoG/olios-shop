import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';

export default function InternalErrorPage() {
  return (
    <Container className="h-full m-8 flex items-center justify-center flex-col">
      <H1>500 - Server-side error occurred</H1>
    </Container>
  );
}
