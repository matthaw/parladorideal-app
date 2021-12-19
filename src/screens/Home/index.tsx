import React, { useCallback, useState } from 'react';

import { api } from '../../services/api';
import { Post } from '../../components/Post';
import { Container, PostList, Posts } from './styles';
import { PostDTO } from '../../dtos/PostDTO';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { useFocusEffect } from '@react-navigation/native';
import { NotFound } from '../../components/NotFound';
import { Alert } from 'react-native';

interface PostProps {
  updated: boolean;
  title: string;
}

function Home() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<PostDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchPosts() {
        try {
          const response = await api.get('/posts', {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
          });

          setPosts(response.data);
        } catch (error) {
          Alert.alert('Erro', 'Erro ao carregar posts: ' + error);
        }
      }

      fetchPosts();
    }, [])
  );

  return (
    <Container>
      <Header title="Posts" />

      <PostList>
        <Posts>
          {posts.length > 0 ? (
            posts.map((post: PostDTO) => (
              <Post
                key={post.id}
                id={post.id}
                content={post.content}
                created_at={post.created_at}
                user={post.user}
              />
            ))
          ) : (
            <NotFound title="Carregando postagens" />
          )}
        </Posts>
      </PostList>
    </Container>
  );
}

export { Home };
