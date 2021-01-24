import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStack from './DashboardStackNavigator';
import CustomDrawerContent from './CustomDrawer';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = (props) => (
  <Drawer.Navigator
    drawerStyle={{ width: '60%' }}
    drawerContent={prop => <CustomDrawerContent {...prop} onLogout={props.onLogout}/>}>
    <Drawer.Screen name="Dashboard" component={DashboardStack} />
  </Drawer.Navigator>
);

export default MainDrawerNavigator;
