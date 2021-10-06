import React, {useEffect, useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';
import {UserContext} from '../../context/UserProvider';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';

const Users = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {users} = useContext(UserContext);

  useEffect(() => {
    setData(users); //pega os usuários que estão cacheados no FirebaseContext (Preload os carregou)
    setLoading(false);
  }, [users]);

  const routeUser = (item) => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {loading && <Loading />}
    </Container>
  );
};
export default Users;
