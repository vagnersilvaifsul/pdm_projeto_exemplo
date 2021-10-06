import React, {useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {CompanyContext} from '../../context/CompanyProvider';

const Company = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [tecnologias, setTeconologias] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCompany, updateCompany, deleteCompany} = useContext(
    CompanyContext,
  );

  useEffect(() => {
    //console.log(route.params.company);
    setNome('');
    setTeconologias('');
    setUid('');
    if (route.params.company) {
      setNome(route.params.company.nome);
      setTeconologias(route.params.company.tecnologias);
      setUid(route.params.company.uid);
    }
    return () => {
      console.log('desmontou Company');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && tecnologias) {
      let company = {};
      company.uid = uid;
      company.nome = nome;
      company.tecnologias = tecnologias;
      setLoading(true);
      if (uid) {
        await updateCompany(company);
      } else {
        await saveCompany(company);
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o curso?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteCompany(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome da Empresa"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Tecnologias (separadas por , )"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setTeconologias(t)}
        value={tecnologias}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Company;
