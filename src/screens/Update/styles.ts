import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const PostList = styled.SafeAreaView`
  flex: 1;
  padding-bottom: ${RFValue(8)}px;
`;

export const Posts = styled(ScrollView)`
  flex: 1;
  width: 100%;

  padding: 14px;
`;

export const Fields = styled.View`
  padding-bottom: 20px;
`;

export const Separetor = styled.View`
  height: 1px;
  width: 100%;
`;
