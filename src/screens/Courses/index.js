import React, {useEffect, useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';
import {CourseContext} from '../../context/CourseProvider';

import {Container, FlatList} from './styles';
import Item from './Item';
import Loading from '../../components/Loading';
import AddFloatButton from '../../components/AddFloatButton';

const Courses = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {courses} = useContext(CourseContext);

  useEffect(() => {
    setData(courses); //pega os cursos que estão cacheados no CourseContext (Preload os carregou)
    setLoading(false);
  }, [courses]);

  const routeCourse = (item) => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Curso',
        params: {course: item},
      }),
    );
  };

  const routeAddCourse = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Curso',
        params: {course: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeCourse(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
      <AddFloatButton onClick={routeAddCourse} />
      {loading && <Loading />}
    </Container>
  );
};
export default Courses;
