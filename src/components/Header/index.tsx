import React from 'react';
import { Header as HeaderS, Title } from './styles';

interface IHeaderProps {
  title: string;
}

function Header({ title }: IHeaderProps) {
  return (
    <HeaderS>
      <Title>{title}</Title>
    </HeaderS>
  );
}

export { Header };
