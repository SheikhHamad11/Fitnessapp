import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonHeader from '../components/CommonHeader';
import Carousel from '../components/Carousal';
const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Beginner');

  const workoutData = {
    Beginner: [
      {id: 1, title: 'Full Body Workout', image: require('../images/3.jpg')},
      {id: 2, title: 'Abs Workout', image: require('../images/4.jpg')},
      {id: 3, title: 'Legs Workout', image: require('../images/5.jpg')},
      {id: 4, title: 'Arms Workout', image: require('../images/6.jpg')},
    ],
    Intermediate: [
      {id: 5, title: 'Full Body Workout', image: require('../images/3.jpg')},
      {id: 6, title: 'Abs Workout', image: require('../images/4.jpg')},
      {id: 7, title: 'Legs Workout', image: require('../images/5.jpg')},
      {id: 8, title: 'Arms Workout', image: require('../images/6.jpg')},
    ],
    Advanced: [
      {id: 9, title: 'Full Body Workout', image: require('../images/3.jpg')},
      {id: 10, title: 'Abs Workout', image: require('../images/4.jpg')},
      {id: 11, title: 'Legs Workout', image: require('../images/5.jpg')},
      {id: 12, title: 'Arms Workout', image: require('../images/6.jpg')},
    ],
  };

  return (
    <>
      <CommonHeader title={'Home Workout'} />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.heroSection}>
              {/* <Image
                source={require('../images/1.jpg')}
                style={styles.heroImage}
              /> */}
              <Carousel />
              <Text style={styles.heroText}>
                Your Fitness Journey Starts Here!
              </Text>
            </View>
            <View style={styles.tabContainer}>
              {['Beginner', 'Intermediate', 'Advanced'].map(tab => (
                <Pressable
                  key={tab}
                  style={[
                    styles.tabButton,
                    activeTab === tab && styles.activeTab,
                  ]}
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
            <Text style={{fontSize: 18, fontWeight: '600', marginVertical: 10}}>
              {activeTab}
            </Text>
          </>
        }
        style={{marginHorizontal: 10}}
        data={workoutData[activeTab]}
        keyExtractor={item => item.id}
        nestedScrollEnabled={true}
        renderItem={({item, index}) => (
          <>
            <Pressable
              key={index}
              style={styles.categoriesContainer}
              onPress={() =>
                navigation.navigate('WorkoutDetails', {
                  image: item.image,
                  name: item.title,
                  id: item.id,
                })
              }>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </Pressable>
          </>
        )}
        ListFooterComponent={<View style={{height: 20}} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 0,
    // alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
  heroSection: {
    marginTop: 20,
    alignItems: 'center',
    borderTopLeftRadius: 10,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  heroText: {
    marginVertical: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  categoriesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
    // paddingHorizontal: 16,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  // categoryCard: {
  //   backgroundColor: '#fff',
  //   // width: '47%',
  //   marginBottom: 16,
  //   borderRadius: 8,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: {width: 0, height: 4},
  //   shadowRadius: 8,
  //   elevation: 4,
  //   alignItems: 'center',
  //   padding: 10,
  // },
  categoryImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    top: '35%',
    left: 30,
    // alignSelf: 'center',
  },
});

export default HomeScreen;
