import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from "../../provider/AuthProvider";
import supabase from '../../lib/supabase';

const Profile = () => {
  const { user } = useAuth();

  let qualificationData = null;
  try {
    qualificationData = user?.qualification ? JSON.parse(user.qualification) : null;
  } catch (error) {
    console.error("Error parsing qualification data:", error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Text style={styles.pic}>{user?.full_name?.charAt(0)}</Text>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{user?.full_name}</Text>
        </View>
      </View>

      {/* Role Section */}
      <View style={styles.roleContainer}>
        <Text style={styles.headerText}>
          {user?.role === 'patient' ? 'Patient' : 'Healthcare Professional'}
        </Text>
      </View>

      {/* Qualification Section */}
      {qualificationData && (
        <View style={styles.qualificationContainer}>
          <Text style={styles.qualificationHeader}>Qualification Details</Text>
          <Text style={styles.qualificationText}>
            <Text style={styles.boldText}>Degree: </Text> {qualificationData.degree}
          </Text>
          <Text style={styles.qualificationText}>
            <Text style={styles.boldText}>Department: </Text> {qualificationData.department}
          </Text>
          <Text style={styles.qualificationText}>
            <Text style={styles.boldText}>Institution: </Text> {qualificationData.institution}
          </Text>
        </View>
      )}

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.button} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#f3f2ed',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pic: {
    width: 70,
    height: 70,
    fontSize: 50,
    borderRadius: 35,
    backgroundColor: '#0a7ea4',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 15,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#555',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  roleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  qualificationContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  qualificationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 10,
    textAlign: 'center',
  },
  qualificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Profile;
