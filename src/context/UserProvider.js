import React, {useState, createContext} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getUsers = async () => {
    const unsubscribe = firestore()
      .collection('users')
      .orderBy('nome')
      .onSnapshot(
        //inscrevendo um listener
        (querySnapshot) => {
          let d = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const user = {
              id: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
            };
            d.push(user);
          });
          //console.log(d);
          setUsers(d);
        },
        (e) => {
          console.error('UserProvider, getUsers: ' + e);
        },
      );

    return unsubscribe;
  };

  const saveUser = async (user) => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          nome: user.nome,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch((e) => {
        console.error('UserProvider, saveUser: ' + e);
      });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        saveUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
