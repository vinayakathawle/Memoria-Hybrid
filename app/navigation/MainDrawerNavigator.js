import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStack from './DashboardStackNavigator';
import CustomDrawerContent from './CustomDrawer';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => (
  <Drawer.Navigator
    drawerStyle={{ width: '60%' }}
    drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Dashboard" component={DashboardStack} />
  </Drawer.Navigator>
);

export default MainDrawerNavigator;
