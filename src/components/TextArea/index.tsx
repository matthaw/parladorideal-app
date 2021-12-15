import React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styles';

interface Props extends TextInputProps {}

function TextArea({ ...rest }: Props) {
  return <Container {...rest} />;
}

export { TextArea };
