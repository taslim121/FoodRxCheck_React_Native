
import { Tabs ,Stack,Redirect} from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../../provider/AuthProvider';

export default function AdminLayout() {
  const {isAdmin} = useAuth();
  if(!isAdmin){
    return <Redirect href={'/'} />;
  }
  return (
    <Tabs screenOptions={{headerShown:true}}>
    <Tabs.Screen name="crud-admin"
     options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({color,size}) => (
        <FontAwesome name="home" size={size} color={color} />
      )

     }}  />
    <Tabs.Screen name='user-manage'
    options={{
      tabBarLabel: 'Users',
      tabBarIcon: ({color,size}) => (
        <FontAwesome name="users" size={size} color={color} />
      )
    }
    }
    />
    <Tabs.Screen name='Suggestion'
    options={{
      tabBarLabel: 'Explore',
      tabBarIcon: ({color,size}) => (
        <FontAwesome name="search" size={size} color={color} />
      )
    }
    }
    />
    </Tabs>
  );
}