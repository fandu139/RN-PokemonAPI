import React, {ReactElement} from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import Icon from '../uikit/Icon';
import AppStyles from '../theme/appStyles';
import Colors from '../theme/colors';
import {ICON_BACK_ARROW} from '../assets/icon';
import Header from '../uikit/Header';

const Root = createNativeStackNavigator();

function RootNavigator(): ReactElement {
  const defaultHeaderOptions = {};

  return (
    <Root.Navigator
      screenOptions={{
        ...defaultHeaderOptions,
        header: (props: NativeStackHeaderProps) => {
          const {navigation, options} = props;

          return (
            <Header
              title={options.title}
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
        },
      }}
      initialRouteName="HomeScreen">
      <Root.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Root.Screen
        options={{title: 'Detail Screen'}}
        name="DetailScreen"
        component={DetailScreen}
      />
    </Root.Navigator>
  );
}

export default RootNavigator;
