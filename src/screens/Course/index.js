import React, {useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {CourseContext} from '../../context/CourseProvider';

const Course = ({route, navigation}) => {
  const [campus, setCampus] = useState('');
  const [modulos, setModulos] = useState('');
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCourse, deleteCourse} = useContext(CourseContext);

  useEffect(() => {
    //console.log(route.params.course);
    setCampus('');
    setModulos('');
    setNome('');
    setSigla('');
    setUid('');
    if (route.params.course) {
      setCampus(route.params.course.campus);
      setModulos(route.params.course.modulos);
      setNome(route.params.course.nome);
      setSigla(route.params.course.sigla);
      setUid(route.params.course.uid);
    }
    return () => {
      console.log('desmontou Course');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && sigla && nome && campus && modulos) {
      let course = {};
      course.uid = uid;
      course.sigla = sigla;
      course.nome = nome;
      course.campus = campus;
      course.modulos = modulos;
      setLoading(true);
      await saveCourse(course);
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
          await deleteCourse(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Sigla do Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setSigla(t)}
        value={sigla}
      />
      <TextInput
        placeholder="Nome do Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Câmpus"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setCampus(t)}
        value={campus}
      />
      <TextInput
        placeholder="Número de módulos"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={(t) => setModulos(t)}
        value={modulos}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Course;
