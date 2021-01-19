import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './routes';

import colors from './styles/colors';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <AppProvider>
        <View style={{ backgroundColor: colors.primary, flex: 1 }}>
          <AuthRoutes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
