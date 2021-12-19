import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { Container, Fields, Form, Header, Title } from './styles';
import { Alert } from 'react-native';
import { InputForm } from '../../../components/InputForm';
import { api } from '../../../services/api';
import { iNavigationProps } from '../../../../types';
import { useAuth } from '../../../hooks/auth';
import { ActionForm } from '../../../components/ActionForm';

interface iRegisterProps extends iNavigationProps {}

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(25, 'Senha deve ter no máximo 25 caracteres'),

  passwordConfirmation: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(25, 'Senha deve ter no máximo 25 caracteres')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function SignUp({ navigation }: iRegisterProps) {
  const { token, setToken } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(form: FormData) {
    try {
      const response = await api.post('/users', form);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        {
          text: 'Entrar',
          onPress: async () => {
            navigation.navigate('SignIn');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro');
    }
  }

  return (
    <Container>
      <Header>
        <Title>Crie sua conta</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />

          <InputForm
            name="email"
            control={control}
            placeholder="e-mail"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.email && errors.email.message}
          />
          <InputForm
            name="password"
            control={control}
            placeholder="password"
            autoCapitalize="sentences"
            autoCorrect={false}
            secureTextEntry={true}
            maxLength={25}
            error={errors.password && errors.password.message}
          />
          <InputForm
            name="passwordConfirmation"
            control={control}
            placeholder="password"
            autoCapitalize="sentences"
            autoCorrect={false}
            secureTextEntry={true}
            maxLength={25}
            error={errors.passwordConfirmation && errors.passwordConfirmation.message}
          />
        </Fields>

        <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
        <ActionForm
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          title="Já possui uma conta? Clique aqui para entrar"
        />
      </Form>
    </Container>
  );
}

export { SignUp };
