import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const PrimaryButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.purple};
  font-weight: 700;
  color: #f2f4fe;
  padding: 9px 16px;
  height: 40px;
  width: auto;
  border-radius: 5px;
`;
