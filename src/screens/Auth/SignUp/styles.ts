import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};

  font-size: ${RFValue(24)}px;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;

  padding-bottom: 19px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: center;
  width: 100%;

  padding: 24px;
`;

export const Fields = styled.View`
  padding-bottom: 20px;
`;

export const Back = styled(TouchableOpacity)`
  margin-top: 24px;
  align-items: flex-end;
`;

export const BackText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;
