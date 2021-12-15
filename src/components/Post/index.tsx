import React from 'react';

import { PostDTO } from '../../dtos/PostDTO';
import { ActionsButton } from '../Actions';
import {
  Container,
  PostHeader,
  PostContent,
  PostFooter,
  Title,
  Name,
  Content,
  Date,
} from './styles';
import { formatDate } from '../../utils/util';

interface PostProps extends PostDTO {
  action?: boolean;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function Post({ id, content, created_at, user, action = false, onUpdate, onDelete }: PostProps) {
  return (
    <Container>
      <PostHeader>
        <Title>
          Postador por <Name>{user.name}</Name>
        </Title>
      </PostHeader>
      <PostContent>
        <Content>{content}</Content>
      </PostContent>
      <PostFooter>
        <Title>
          Post feito em <Date>{formatDate(created_at)}</Date>
        </Title>
        {action && <ActionsButton id={id} onDelete={onDelete!} onUpdate={onUpdate!} />}
      </PostFooter>
    </Container>
  );
}

export { Post };
