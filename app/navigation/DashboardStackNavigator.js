import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from 'app/screens/Dashboard';
import Menu1 from 'app/screens/Menu1';
import Menu2 from 'app/screens/Menu2';
import Menu3 from 'app/screens/Menu3';
import Menu4 from 'app/screens/Menu4';
import Menu5 from 'app/screens/Menu5';
import Menu6 from 'app/screens/Menu6';
import Menu7 from 'app/screens/Menu7';
import Menu8 from 'app/screens/Menu8';
import Menu9 from 'app/screens/Menu9';
import Menu10 from 'app/screens/Menu10';
import HeaderTitle from 'app/components/HeaderTitle';
import HeaderLeft from 'app/components/HeaderLeft';
import { View } from 'react-native';

const Stack = createStackNavigator();

const DashboardStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 1"
      component={Menu1}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 2"
      component={Menu2}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 3"
      component={Menu3}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 4"
      component={Menu4}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 5"
      component={Menu5}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 6"
      component={Menu6}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 7"
      component={Menu7}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 8"
      component={Menu8}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 9"
      component={Menu9}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
    <Stack.Screen
      name="Menu 10"
      component={Menu10}
      options={({ route, navigation }) => ({
        headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
        headerRight: props => (
          <View></View>
        )
      })}
    />
  </Stack.Navigator>
);

export default DashboardStackNavigator;
