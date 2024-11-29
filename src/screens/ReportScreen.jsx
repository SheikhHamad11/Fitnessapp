import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import CommonHeader from '../components/CommonHeader';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Beginner');

  const workoutData = {
    Beginner: [
      {id: '1', name: 'Push-ups'},
      {id: '2', name: 'Jumping Jacks'},
    ],
    Intermediate: [
      {id: '3', name: 'Planks'},
      {id: '4', name: 'Squats'},
    ],
    Advanced: [
      {id: '5', name: 'Burpees'},
      {id: '6', name: 'Mountain Climbers'},
    ],
  };

  return (
    <View style={styles.container}>
      {/* Tabs Section */}
      <CommonHeader title={'Report'} />
      <View style={styles.tabContainer}>
        {['Beginner', 'Intermediate', 'Advanced'].map(tab => (
          <Pressable
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Workout List */}
      <FlatList
        data={workoutData[activeTab]}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#ff6347',
  },
  tabText: {
    color: '#333',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  workoutItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 2,
  },
  workoutText: {
    fontSize: 18,
    color: '#333',
  },
});

export default HomeScreen;
