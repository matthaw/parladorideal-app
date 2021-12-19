import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

interface iActionFormProps extends TouchableOpacityProps {
  title: string;
}

function ActionForm({ title, ...rest }: iActionFormProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}

export { ActionForm };
