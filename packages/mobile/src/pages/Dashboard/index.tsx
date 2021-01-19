import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/AuthContext';

// import { WrapperDashboard } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: '#FFF', fontSize: 20 }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
