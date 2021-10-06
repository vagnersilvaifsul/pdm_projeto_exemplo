/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';

import {Container, TextInput} from './styles';
import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
import {UserContext} from '../../context/UserProvider';

const User = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveUser} = useContext(UserContext);

  useEffect(() => {
    //console.log(route.params.user);
    setNome(route.params.user.nome);
    setEmail(route.params.user.email);
    setUid(route.params.user.id);
  }, []);

  const salvar = async () => {
    if (nome && email) {
      let user = {};
      user.uid = uid;
      user.nome = nome;
      user.email = email;
      setLoading(true);
      await saveUser(user);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        editable={false}
        value={email}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {loading && <Loading />}
    </Container>
  );
};
export default User;
