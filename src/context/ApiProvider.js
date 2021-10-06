import React, {createContext, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);

  const getApi = () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          if (idToken) {
            const apiLocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/projeto-exemplo-1dbdd/databases/(default)/documents/',
              headers: {Authorization: 'Bearer ' + idToken},
            });

            //utiliza o middleware para lançar um exceção (usa try-catch no consumidor)
            apiLocal.addResponseTransform((response) => {
              if (!response.ok) {
                throw response;
              }
            });
            //coloca no state
            setApi(apiLocal);
          }
        })
        .catch((e) => {
          console.error('ApiProvider, useEffect: ' + e);
        });
    }
  };

  return (
    <ApiContext.Provider
      value={{
        api,
        getApi,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
