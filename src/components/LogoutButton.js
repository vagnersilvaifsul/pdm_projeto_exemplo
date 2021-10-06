import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';
import {AuthUserContext} from '../context/AuthUserProvider';

const LogoutButton = () => {
  const {sigOut} = useContext(AuthUserContext);

  return (
    <Icon
      name="exit-outline"
      size={25}
      color={COLORS.white}
      onPress={() => sigOut()}
    />
  );
};
export default LogoutButton;
