import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },

  label: { fontSize: 14, color: '#888', marginTop: 10 },

  value: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },

  separator: { height: 1, backgroundColor: '#eee', marginVertical: 15 },

  statusValue: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },

  statusDone: { color: 'green' },

  statusPending: { color: 'red' },

  buttonContainer: { marginTop: 20 },

  customButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const DetailScreen = ({ route }) => {
  // Get task from navigation params
  const { task, onStatusUpdate } = route.params;

  // Local state to handle the "Bonus" toggle feature locally
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const toggleCompletion = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);

    if (onStatusUpdate) {
      onStatusUpdate(task.id);
    }

    Alert.alert('Status Updated', 'Task status changed locally.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Task ID:</Text>
        <Text style={styles.value}>{task.id}</Text>

        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{task.userId}</Text>

        <Text style={styles.label}>Title:</Text>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.separator} />

        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.statusValue,
            isCompleted ? styles.statusDone : styles.statusPending,
          ]}
        >
          {isCompleted ? '✓ Completed' : '✗ Incomplete'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.customButton,
            { backgroundColor: isCompleted ? '#d9534f' : '#5cb85c' },
          ]}
          onPress={toggleCompletion}
        >
          <Text style={styles.buttonText}>
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
