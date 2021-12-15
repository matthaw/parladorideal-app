import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View`
  flex: 1;
  text-align: center;

  border-radius: 4px;
  padding: ${RFPercentage(2)}px;
  margin-bottom: ${RFPercentage(2)}px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};

  font-size: ${RFValue(12)}px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};

  font-size: ${RFValue(13)}px;
`;

export const PostHeader = styled.View``;
export const PostContent = styled.View``;

export const Content = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
`;

export const PostFooter = styled.View`
  padding-top: ${RFPercentage(2)}px;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
`;
