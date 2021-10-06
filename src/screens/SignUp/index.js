import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';
import {AuthUserContext} from '../../context/AuthUserProvider';

import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
import {Body, TextInput} from './styles';

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthUserContext);

  const cadastar = async () => {
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
        let user = {};
        user.nome = nome;
        user.email = email;
        setLoading(true);
        await signUp(user, pass);
        setLoading(false);
      } else {
        Alert.alert('Erro', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={(t) => setNome(t)}
        onEndEditing={() => this.emailTextInput.focus()}
      />
      <TextInput
        ref={(ref) => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={(t) => setEmail(t)}
        onEndEditing={() => this.passTextInput.focus()}
      />
      <TextInput
        ref={(ref) => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={(t) => setPass(t)}
        onEndEditing={() => this.confirmPassTextInput.focus()}
      />
      <TextInput
        ref={(ref) => {
          this.confirmPassTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={(t) => setConfirmPass(t)}
      />
      <MeuButton texto="Cadastrar" onClick={cadastar} />
      {loading && <Loading />}
    </Body>
  );
};

export default SignUp;
