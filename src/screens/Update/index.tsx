import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

import { api } from '../../services/api';
import { Post } from '../../components/Post';
import { Container, PostList, Posts } from './styles';
import { PostDTO } from '../../dtos/PostDTO';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { NotFound } from '../../components/NotFound';
import { iNavigationProps } from '../../../types';

interface IUpdateProps extends iNavigationProps {}

function Update({ navigation }: IUpdateProps) {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState<PostDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchPosts() {
        try {
          const response = await api.get('/users/posts', {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
          });

          const posts: PostDTO[] = response.data.posts.map((post: PostDTO) => {
            return {
              ...post,
              user: {
                name: user.payload.name,
              },
            };
          });

          setPosts(posts);
        } catch (error) {
          Alert.alert('Erro', 'Erro ao carregar posts: ' + error);
        }
      }

      fetchPosts();
    }, [])
  );

  async function deletePost(id: string) {
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      const newPosts = posts.filter((post: PostDTO) => post.id !== id);

      setPosts(newPosts);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar esse post, tente novamente!: ' + error);
    }
  }

  async function updatePost(id: string) {
    const post = posts.find((post: PostDTO) => post.id === id);
    navigation.navigate('Novo', { post, title: 'Editar Post', action: 'Atulizar' });
  }

  return (
    <Container>
      <Header title="Minhas postagens" />

      <PostList>
        {posts.length > 0 ? (
          <Posts>
            {posts.map((post: PostDTO) => (
              <Post
                key={post.id}
                id={post.id}
                content={post.content}
                created_at={post.created_at}
                user={post.user}
                action={true}
                onDelete={() => deletePost(post.id)}
                onUpdate={() => updatePost(post.id)}
              />
            ))}
          </Posts>
        ) : (
          <NotFound title="Você não tem postagens" />
        )}
      </PostList>
    </Container>
  );
}

export { Update };
