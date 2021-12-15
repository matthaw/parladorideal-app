import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { iNavigationProps } from '../../../types';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextArea } from '../../components/TextArea';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Form, Fields, Container, ErrorMessage } from './styles';

export interface Props extends iNavigationProps {
  route?: RouteProp<any, any>;
}

function Post({ route, navigation }: Props) {
  const { token } = useAuth();
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setContent('');

    const post = route?.params?.post;

    if (post) {
      setContent(post.content);
    }
  }, [route]);

  async function handleSubmit() {
    if (content.length < 10) {
      setErrorMessage('O conteúdo deve ter no mínimo 10 caracteres');
      return;
    } else if (content.length >= 280) {
      setErrorMessage('O conteúdo deve ter no máximo 280 caracteres');
      return;
    }

    if (route?.params?.post) {
      await update(route?.params?.post.id, content);
    } else {
      await create(content);
    }
  }

  async function create(content: string) {
    try {
      const response = await api.post(
        'posts',
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }
      );
      setContent('');
      setErrorMessage('');
      navigation.navigate('Posts');
    } catch (err) {
      setErrorMessage('Erro ao criar novo post, tente novamente');
    }
  }

  async function update(id: string, content: string) {
    try {
      const response = await api.put(
        'posts',
        { id, content },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }
      );
      setContent('');
      setErrorMessage('');
      navigation.navigate('Posts');
    } catch (error) {
      console.log(id);
      setErrorMessage('Erro ao atulizar novo post, tente novamente: ' + error);
    }
  }

  return (
    <Container>
      <Header title={route?.params!.title} />

      <Form>
        <Fields>
          <TextArea
            placeholder="Comentário"
            maxLength={280}
            multiline={true}
            numberOfLines={8}
            autoFocus={true}
            keyboardType="default"
            defaultValue={content}
            onChangeText={setContent}
          />
          {errorMessage.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Fields>

        <Button title={route?.params!.action} onPress={handleSubmit} />
      </Form>
    </Container>
  );
}

export { Post };
