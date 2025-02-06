import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useDrugs } from '../../provider/DrugsProvider';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter,Stack } from 'expo-router';
import { useAuth } from '../../provider/AuthProvider';

const SelectedDrugs = () => {
  const { selectedDrugs, onRemoveDrug } = useDrugs();
  const router = useRouter();
  const { isHcp } = useAuth();
  
  // Function to clear all selected drugs
  const clearAllDrugs = () => {
    selectedDrugs.forEach((drug) => {
      onRemoveDrug(drug.drug_id); 
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerTitle:'Selected Drugs' ,headerStyle: { backgroundColor: '#0a7ea4' }, headerTintColor: '#fff' }} />
      
      {/* Clear All Button */}
      {selectedDrugs.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAllDrugs}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}

      {selectedDrugs.length === 0 ? (
        <Text style={styles.emptyMessage}>No drugs selected.</Text>
      ) : (
        <FlatList
          data={selectedDrugs}
          keyExtractor={(item) => item.drug_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity
                style={{ width: '85%' }}
                onPress={() => {
                  if (isHcp) {
                    
                    router.push({
                      pathname: '/hcp_dynamic/drug-details/[id]',
                      params: { id: item.drug_id.toString(), name: item.drug_name },
                    });
                  } else{
                    
                    router.push({
                      pathname: '/patient_dynamic/int-drugs-pt/[id]',
                      params: { id: item.drug_id.toString(), name: item.drug_name },
                    });
                  }
                }}
              >
                <Text style={styles.drugName}>{item.drug_name}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={{ width: '15%' }} onPress={() => onRemoveDrug(item.drug_id)}>
                <FontAwesome name="minus-circle" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 7,
    
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
  },
  row: {
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 8,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#0a7ea4',
  },
  drugName: {
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '40%',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectedDrugs;
