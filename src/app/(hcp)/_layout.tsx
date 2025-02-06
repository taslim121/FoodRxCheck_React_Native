import { Tabs, Stack, Redirect, Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../provider/AuthProvider';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import  headerRight from '../../utils/headerRight'

export default function HcpLayout() {
  const { session } = useAuth();
  const router = useRouter();

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'white', },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="hcp_home"
        options={{
          tabBarLabel: 'Drugs',
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            height: 70,
          },
          headerRight: headerRight,
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="hcp_food"
        options={{
          tabBarLabel: 'Food-Search',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="food-bank" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile-hcp"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="suggest-hcp"
        options={{
          tabBarLabel: 'Suggestions',
          tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
