import React, {ReactElement} from 'react';

import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

import {ICON_BACK_ARROW} from '../assets/icon';

import AppStyles from '../theme/appStyles';
import Colors from '../theme/colors';
import Icon from '../uikit/Icon';
import Header from '../uikit/Header';

const Root = createNativeStackNavigator();

const customHeader = (props: NativeStackHeaderProps) => {
  const {navigation, options} = props;

  return (
    <Header
      title={options.title || ''}
      leftButton={
        <Icon
          style={AppStyles.headerLeftIcon}
          size={16}
          color={Colors.WHITE}
          name={ICON_BACK_ARROW}
          onPress={navigation.goBack}
          testID="header-back-button"
        />
      }
    />
  );
};

function RootNavigator(): ReactElement {
  const defaultHeaderOptions = {};

  return (
    <Root.Navigator
      screenOptions={{
        ...defaultHeaderOptions,
        header: customHeader,
      }}
      initialRouteName="HomeScreen">
      <Root.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        getComponent={() => require('../screens/Home').default}
      />
      <Root.Screen
        options={{title: 'Detail Screen'}}
        name="DetailScreen"
        getComponent={() => require('../screens/Detail').default}
      />
    </Root.Navigator>
  );
}

export default RootNavigator;
