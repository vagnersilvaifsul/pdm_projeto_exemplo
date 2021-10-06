/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';

import {Container, TextInput, Text} from './styles';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import CustonModalCurso from '../../components/CustomModalCurso';
import CustomModalAndamento from '../../components/CustomModalAndamento';
import RadioButton from '../../components/RadioButton';
import Loading from '../../components/Loading';
import {CourseContext} from '../../context/CourseProvider';
import {StudentContext} from '../../context/StudentProvider';

const Student = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState();
  const [adiantamento, setAdiantamento] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modalCursoVisible, setModalCursoVisible] = useState(false);
  const [modalSemestreVisible, setmMdalSemestreVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modulos, setModulos] = useState([]);
  const {courses} = useContext(CourseContext);
  const {saveStudent, deleteStudent} = useContext(StudentContext);

  useEffect(() => {
    updateAdiantamentoModal();
    setNome('');
    setCurso('Clique e selecione o curso');
    setAdiantamento('Clique e selecione o módulo');
    setLatitude('');
    setLongitude('');
    setUid('');
    if (route.params.student) {
      setNome(route.params.student.nome);
      setCurso(route.params.student.curso);
      setAdiantamento(route.params.student.adiantamento);
      setLatitude(route.params.student.latitude);
      setLongitude(route.params.student.longitude);
      setUid(route.params.student.uid);
    }
  }, [route]);

  const updateAdiantamentoModal = (value) => {
    modulos[0] = {uid: '0', adiantamento: 'Egresso'};
    for (let index = 1; index < 11; index++) {
      modulos[index] = {uid: `${index}`, adiantamento: `${index}`};
    }
  };

  const salvar = async () => {
    if (nome && curso && adiantamento && latitude && longitude) {
      let student = {};
      student.uid = uid;
      student.nome = nome;
      student.curso = curso;
      student.adiantamento = adiantamento;
      student.latitude = latitude;
      student.longitude = longitude;
      setLoading(true);
      await saveStudent(student);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o aluno?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteStudent(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  const selecionarCurso = (val) => {
    setCurso(val);
    setModalCursoVisible(!modalCursoVisible);
  };

  const selecionarAdiantamento = (val) => {
    setAdiantamento(val);
    setmMdalSemestreVisible(!modalSemestreVisible);
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
      <Text
        onPress={() => setModalCursoVisible(!modalCursoVisible)}
        placeholder="Selecione um curso">
        {curso}
      </Text>
      <Text onPress={() => setmMdalSemestreVisible(!modalSemestreVisible)}>
        {adiantamento}
      </Text>
      <TextInput
        placeholder="Latitude em decimal"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={(t) => setLatitude(t)}
        value={latitude}
      />
      <TextInput
        placeholder="Longitude em decimal"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={(t) => setLongitude(t)}
        value={longitude}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      <CustonModalCurso
        visible={modalCursoVisible}
        closeAction={() => setModalCursoVisible(!modalCursoVisible)}
        course={curso}>
        {courses.map((o) => {
          return (
            <RadioButton
              key={o.uid}
              label={o.sigla}
              selected={o.sigla === curso ? true : false}
              onClick={selecionarCurso}
            />
          );
        })}
      </CustonModalCurso>
      <CustomModalAndamento
        visible={modalSemestreVisible}
        closeAction={() => setmMdalSemestreVisible(!modalSemestreVisible)}>
        {modulos.map((o) => {
          return (
            <RadioButton
              key={o.uid}
              label={o.adiantamento}
              selected={o.adiantamento === adiantamento ? true : false}
              onClick={selecionarAdiantamento}
            />
          );
        })}
      </CustomModalAndamento>
      {loading && <Loading />}
    </Container>
  );
};
export default Student;
