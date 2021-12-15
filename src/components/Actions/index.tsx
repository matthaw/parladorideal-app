import React from 'react';
import { Container, Delete, DeleteText, Update, UpdateText } from './styles';

interface IActionsButton {
  id: string;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

function ActionsButton({ id, onDelete, onUpdate }: IActionsButton) {
  return (
    <Container>
      <Update onPress={() => onUpdate(id)}>
        <UpdateText>Atulizar</UpdateText>
      </Update>
      <Delete onPress={() => onDelete(id)}>
        <DeleteText>Deletar</DeleteText>
      </Delete>
    </Container>
  );
}

export { ActionsButton };
