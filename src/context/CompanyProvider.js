import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';

import {ApiContext} from '../context/ApiProvider';

export const CompanyContext = createContext({});

export const CompanyProvider = ({children}) => {
  const [companies, setCompanies] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  //console.log(api);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getCompanies = async () => {
    try {
      const response = await api.get('/companies');
      //console.log('Dados buscados via API');
      //console.log(response.data);
      //console.log(response.data.documents);
      let data = [];
      response.data.documents.map((d) => {
        let k = d.name.split(
          'projects/projeto-exemplo-1dbdd/databases/(default)/documents/companies/',
        );
        //console.log(k[1]);
        //console.log(d.fields.nome.stringValue);
        //console.log(d.fields.tecnologias.stringValue);
        data.push({
          nome: d.fields.nome.stringValue,
          tecnologias: d.fields.tecnologias.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => b.nome.localeCompare(a.nome));
      setCompanies(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
    }
  };

  // const getCompanies = async () => {
  //   const unsubscribe = firestore()
  //     .collection('companies')
  //     .orderBy('nome')
  //     .onSnapshot(
  //       //inscrevendo um listener
  //       (querySnapshot) => {
  //         let d = [];
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           //console.log(doc.id, ' => ', doc.data());
  //           const val = {
  //             uid: doc.id,
  //             nome: doc.data().nome,
  //             tecnologias: doc.data().tecnologias,
  //           };
  //           d.push(val);
  //         });
  //         //console.log(d);
  //         setCompanies(d);
  //       },
  //       (e) => {
  //         console.error('CompanyProvider, getCompanies: ' + e);
  //       },
  //     );
  //   return unsubscribe;
  // };

  const saveCompany = async (val) => {
    try {
      await api.post('/companies/', {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
        },
      });
      showToast('Dados salvos.');
      getCompanies();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao saveCompany via API.');
      console.log(response);
    }
  };

  // const saveCompany = async (val) => {
  //   await firestore()
  //     .collection('companies')
  //     .doc(val.uid)
  //     .set(
  //       {
  //         nome: val.nome,
  //         tecnologias: val.tecnologias,
  //       },
  //       {merge: true},
  //     )
  //     .then(() => {
  //       showToast('Dados salvos.');
  //     })
  //     .catch((e) => {
  //       console.error('CompanyProvider, saveCourse: ' + e);
  //     });
  // };

  const updateCompany = async (val) => {
    //console.log(val);
    try {
      await api.patch('/companies/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
        },
      });
      showToast('Dados salvos.');
      getCompanies();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao updateCompany via API.');
      console.log(response);
    }
  };

  const deleteCompany = async (val) => {
    try {
      await api.delete('/companies/' + val);
      showToast('Empresa excluída.');
      getCompanies();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deleteCompany via API.');
      console.log(response);
    }
  };

  // const deleteCompany = async (val) => {
  //   firestore()
  //     .collection('companies')
  //     .doc(val)
  //     .delete()
  //     .then(() => {
  //       showToast('Empresa excluída.');
  //     })
  //     .catch((e) => {
  //       console.error('CompanyProvider, deleteCompany: ', e);
  //     });
  // };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        getCompanies,
        saveCompany,
        updateCompany,
        deleteCompany,
      }}>
      {children}
    </CompanyContext.Provider>
  );
};
