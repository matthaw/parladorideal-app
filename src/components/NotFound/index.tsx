import React from 'react';
import { Container, NotFoundText } from './styles';

interface iNotFoundProps {
  title: string;
}

function NotFound({ title }: iNotFoundProps) {
  return (
    <Container>
      <NotFoundText>{title}</NotFoundText>
    </Container>
  );
}

export { NotFound };
