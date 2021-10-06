import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const CourseContext = createContext({});

export const CourseProvider = ({children}) => {
  const [courses, setCourses] = useState([]);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getCousers = async () => {
    const unsubscribe = firestore()
      .collection('courses')
      .orderBy('sigla')
      .onSnapshot(
        //inscrevendo um listener
        (querySnapshot) => {
          let d = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const val = {
              uid: doc.id,
              campus: doc.data().campus,
              modulos: doc.data().modulos,
              nome: doc.data().nome,
              sigla: doc.data().sigla,
            };
            d.push(val);
          });
          //console.log(d);
          setCourses(d);
        },
        (e) => {
          console.error('CourseProvider, getCousers: ' + e);
        },
      );
    return unsubscribe;
  };

  const saveCourse = async (val) => {
    await firestore()
      .collection('courses')
      .doc(val.uid)
      .set(
        {
          campus: val.campus,
          modulos: val.modulos,
          nome: val.nome,
          sigla: val.sigla,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch((e) => {
        console.error('CourseProvider, saveCourse: ' + e);
      });
  };

  const deleteCourse = async (val) => {
    firestore()
      .collection('courses')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Curso excluído.');
      })
      .catch((e) => {
        console.error('CourseProvider, deleteCourse: ', e);
      });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCousers,
        setCourses,
        saveCourse,
        deleteCourse,
      }}>
      {children}
    </CourseContext.Provider>
  );
};
