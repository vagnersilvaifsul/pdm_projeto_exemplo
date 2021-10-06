/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container, Image} from './styles';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {CourseContext} from '../../context/CourseProvider';
import {StudentContext} from '../../context/StudentProvider';
import {UserContext} from '../../context/UserProvider';
import {ApiContext} from '../../context/ApiProvider';

const Preload = ({navigation}) => {
  const {user, setUser, getUserCache} = useContext(AuthUserContext);
  const {getCousers} = useContext(CourseContext);
  const {getStudents} = useContext(StudentContext);
  const {getUsers} = useContext(UserContext);
  const {getApi} = useContext(ApiContext);

  useEffect(() => {
    Icon.loadFont(); //tem que ler os icons da fonte ao inicializar o app
    storeContextUser(); //faz chache do user logado na sessão
    getApi(); //cria o objeto api para uso nos providers de API
    const unsubscriberCourses = getCousers(); //faz cache dos cursos
    const unsubscribeStudents = getStudents(); //faz cache dos estudantes
    const unsubscribeUsers = getUsers(); //faz cache dos users

    return () => {
      unsubscriberCourses;
      unsubscribeStudents;
      unsubscribeUsers;
    };
  }, []); //ao montar o componente

  const storeContextUser = async () => {
    if (user) {
      //se está logado
      const jsonValue = await getUserCache();
      const userCache = JSON.parse(jsonValue);
      setUser(userCache);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Alunos'}],
        }),
      );
    } else {
      //se está null, refaz o login usando a cache
      auth()
        .signInWithEmailAndPassword(user.email, user.pass)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Alunos'}],
            }),
          );
        })
        .catch((e) => {
          console.log('SignIn: erro em entrar: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    }
  };

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo_white.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};
export default Preload;
