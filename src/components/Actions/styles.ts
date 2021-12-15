import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Delete = styled.TouchableOpacity``;

export const DeleteText = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
`;

export const Update = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.blue};

  padding: ${RFPercentage(0.5)}px ${RFPercentage(2)}px;
  border-radius: 3px;
`;

export const UpdateText = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
`;
