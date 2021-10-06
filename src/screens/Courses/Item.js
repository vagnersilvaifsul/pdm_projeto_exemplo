import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const Div = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

const TextSigla = styled.Text`
  font-size: 24px;
  color: ${COLORS.white};
`;

const TextNome = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.white};
`;

const TextCampus = styled.Text`
  font-size: 14px;
  color: ${COLORS.white};
`;

const TextSemestres = styled.Text`
  font-size: 14px;
  color: ${COLORS.white};
  margin-left: 5px;
`;

const Item = ({item, onPress}) => {
  //console.log(item);
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextSigla>{item.sigla}</TextSigla>
        <TextNome>{item.nome}</TextNome>
        <Div>
          <TextCampus>{item.campus}</TextCampus>
          <TextSemestres>{item.modulos} semestres</TextSemestres>
        </Div>
      </>
    </Button>
  );
};
export default Item;
