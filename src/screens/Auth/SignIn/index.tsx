import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../services/api';
import { Button } from '../../../components/Button';
import { Container, Fields, Form } from './styles';
import { InputForm } from '../../../components/InputForm';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import { setLocalToken } from '../../../utils/util';
import { iNavigationProps } from '../../../../types';
import { ActionForm } from '../../../components/ActionForm';

interface iLoginProps extends iNavigationProps {}

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(25, 'Senha deve ter no máximo 25 caracteres'),
});

function SignIn({ navigation }: iLoginProps) {
  const { setToken, user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(form: FormData) {
    try {
      const response = await api.post('/users/authenticate', form);
      await setLocalToken(response.data.token);
      setToken((prevState: any) => {
        return {
          ...prevState,
          token: response.data.token,
        };
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o login');
    }
  }

  return (
    <Container>
      <Form>
        <Fields>
          <InputForm
            name="email"
            control={control}
            placeholder="e-mail"
            autoCapitalize="none"
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
        </Fields>

        <Button title="Entrar" onPress={handleSubmit(handleRegister)} />
        <ActionForm
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          title="Cadastrar-se"
        />
      </Form>
    </Container>
  );
}

export { SignIn };
