import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './routes';

import colors from './styles/colors';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={{ backgroundColor: colors.primary, flex: 1 }}>
        <AuthRoutes />
      </View>
    </NavigationContainer>
  );
};

export default App;
