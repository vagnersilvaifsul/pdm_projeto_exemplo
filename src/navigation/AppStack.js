import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';

import Preload from '../screens/Preload';
import Students from '../screens/Students';
import Student from '../screens/Student';
import Courses from '../screens/Courses';
import Course from '../screens/Course';
import Users from '../screens/Users';
import User from '../screens/User';
import Companies from '../screens/Companies';
import Company from '../screens/Company';
import {COLORS} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: 'true',
        headerStyle: {
          backgroundColor: COLORS.primary,
          paddingRight: 5,
        },
        headerTintColor: COLORS.white,
        headerRight: () => <LogoutButton />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Preload"
        component={Preload}
        options={preloadStyle}
      />
      <Drawer.Screen name="Alunos" component={Students} options={alunosStyle} />
      <Drawer.Screen name="Aluno" component={Student} options={alunoStyle} />
      <Drawer.Screen name="Cursos" component={Courses} options={cursosStyle} />
      <Drawer.Screen name="Curso" component={Course} options={cursoStyle} />
      <Drawer.Screen name="Usuarios" component={Users} options={usersStyle} />
      <Drawer.Screen name="Usuario" component={User} options={userStyle} />
      <Drawer.Screen
        name="Empresas"
        component={Companies}
        options={companiesStyle}
      />
      <Drawer.Screen
        name="Empresa"
        component={Company}
        options={companyStyle}
      />
    </Drawer.Navigator>
  );
}

const preloadStyle = {
  headerShown: false,
};

const alunosStyle = {
  title: 'Alunos',
};

const alunoStyle = {
  title: 'Aluno',
};

const cursosStyle = {
  title: 'Cursos',
};

const cursoStyle = {
  title: 'Cursos',
};

const usersStyle = {
  title: 'Usuários',
};

const userStyle = {
  title: 'Usuário',
};

const companiesStyle = {
  title: 'Empresas',
};

const companyStyle = {
  title: 'Empresa',
};
