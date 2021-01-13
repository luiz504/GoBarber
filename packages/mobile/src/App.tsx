import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import colors from './styles/colors';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={{ backgroundColor: colors.primary, flex: 1 }}>
        <Text> Hello Word</Text>
      </View>
    </>
  );
};

export default App;
