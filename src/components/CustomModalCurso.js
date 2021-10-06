/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';

const Modal = styled.Modal``;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DivContainer = styled.View`
  width: 90%;
  height: 90%;
  background-color: ${COLORS.white};
`;

const DivTop = styled.View`
  width: 95%;
  height: auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const Title = styled.Text`
  font-size: 22px;
  color: ${COLORS.primaryDark};
  align-self: baseline;
`;

export default (props) => {
  return (
      <Modal visible={props.visible} transparent={true} animationType="fade">
        <Container>
            <DivContainer>
            <DivTop>
                <Title>Seclecione o Curso</Title>
                <Icon name="close-circle-outline" size={30} color={COLORS.primaryDark} onPress={props.closeAction}/>
            </DivTop>
            {props.children}
            </DivContainer>
        </Container>
      </Modal>
  );
};
