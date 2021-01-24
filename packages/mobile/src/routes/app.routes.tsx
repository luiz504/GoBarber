import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      // headerShown: false,
      cardStyle: { backgroundColor: colors.primary },
    }}
    initialRouteName="SignIn"
  >
    <App.Screen name="Dashboad" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
