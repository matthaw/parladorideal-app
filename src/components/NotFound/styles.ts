import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NotFoundText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(30)}px;
`;
