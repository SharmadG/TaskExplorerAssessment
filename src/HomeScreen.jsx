import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  errorText: { marginBottom: 10, fontSize: 16, color: 'red' },

  // Filter Styles
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },

  activeFilter: {
    backgroundColor: '#007bff',
  },

  filterText: { color: '#333' },

  activeFilterText: { color: '#fff', fontWeight: 'bold' },

  // List Item Styles
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // Shadow for Android
  },

  textContainer: { flex: 1, marginRight: 10 },

  title: { fontSize: 16, fontWeight: '500', color: '#333' },

  status: { fontSize: 12, fontWeight: 'bold' },

  statusDone: { color: 'green' },

  statusPending: { color: 'red' },

  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
});

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter Logic
  const getFilteredTasks = () => {
    if (filterStatus === 'Completed') {
      return tasks.filter(task => task.completed);
    } else if (filterStatus === 'Incomplete') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const toggleTaskStatus = id => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  };

  const handleTaskPress = item => {
    navigation.navigate('Detail', {
      task: item,
      onStatusUpdate: toggleTaskStatus,
    });
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      setTasks(response?.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  // Loading Indicator
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading tasks...</Text>
      </View>
    );
  }

  // Retry mechanism if API fetch fails
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load tasks.</Text>
        <Button title="Retry" onPress={fetchTasks} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Controls */}
      <View style={styles.filterContainer}>
        {['All', 'Completed', 'Incomplete'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.activeFilter,
            ]}
            onPress={() => setFilterStatus(status)}
          >
            <Text
              style={[
                styles.filterText,
                filterStatus === status && styles.activeFilterText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      <FlatList
        data={getFilteredTasks()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleTaskPress(item)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <Text
              style={[
                styles.status,
                item.completed ? styles.statusDone : styles.statusPending,
              ]}
            >
              {item.completed ? 'Completed' : 'Incomplete'}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found.</Text>
        }
      />
    </View>
  );
};

export default HomeScreen;
