import { ActivityIndicator, Text, View } from "react-native";
import { Redirect, Link, Stack } from "expo-router";
import Button from "../components/Button";
import { useAuth } from "../provider/AuthProvider";
import supabase from "../lib/supabase";

export default function Index() {
  const { session, loading,isAdmin,isHcp} = useAuth();
  
  if (loading) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href={'/main'} />;
  }
  if(isHcp && !isAdmin ){
    return <Redirect href={'/(hcp)/hcp_home/DrugList'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Stack.Screen options={{headerShown:false}} />
      <Link href={'/(pt)/pt_home/pt_counselling'} asChild>
        <Button text="Patient" />
      </Link>
      <Link href={'/(hcp)/hcp_home/DrugList'} asChild>
        <Button text="Hcp" />
      </Link>
      <Link href={'/crud-admin'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}