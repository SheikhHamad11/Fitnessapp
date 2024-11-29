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
const HomeScreen = ({navigation}) => {
  const categories = [
    {title: 'Full Body Workout', image: require('../images/3.jpg')},
    {title: 'Abs Workout', image: require('../images/4.jpg')},
    {title: 'Legs Workout', image: require('../images/5.jpg')},
    {title: 'Arms Workout', image: require('../images/6.jpg')},
    {title: 'Arms Workout', image: require('../images/6.jpg')},
  ];

  const [activeTab, setActiveTab] = useState('Beginner');

  const workoutData = {
    Beginner: [
      {title: 'Full Body Workout', image: require('../images/3.jpg')},
      {title: 'Abs Workout', image: require('../images/4.jpg')},
      {title: 'Legs Workout', image: require('../images/5.jpg')},
      {title: 'Arms Workout', image: require('../images/6.jpg')},
    ],
    Intermediate: [
      {title: 'Full Body Workout', image: require('../images/3.jpg')},
      {title: 'Abs Workout', image: require('../images/4.jpg')},
      {title: 'Legs Workout', image: require('../images/5.jpg')},
      {title: 'Arms Workout', image: require('../images/6.jpg')},
    ],
    Advanced: [
      {title: 'Full Body Workout', image: require('../images/3.jpg')},
      {title: 'Abs Workout', image: require('../images/4.jpg')},
      {title: 'Legs Workout', image: require('../images/5.jpg')},
      {title: 'Arms Workout', image: require('../images/6.jpg')},
    ],
  };

  return (
    <>
      <CommonHeader title="HOME WORKOUT" />
      <ScrollView style={styles.container}>
        {/* Header */}
        {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>HOME WORKOUT</Text>
        <Icon name="fire" size={25} color="orange" />
      </View> */}

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={require('../images/1.jpg')} style={styles.heroImage} />
          <Text style={styles.heroText}>Your Fitness Journey Starts Here!</Text>
        </View>
        {/* Tabs Section */}
        <View style={styles.tabContainer}>
          {['Beginner', 'Intermediate', 'Advanced'].map(tab => (
            <>
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
            </>
          ))}
        </View>
        {/* Workout List */}
        <Text style={{fontSize: 18, fontWeight: '600', marginVertical: 10}}>
          {activeTab}
        </Text>
        <FlatList
          style={{marginBottom: 20}}
          data={workoutData[activeTab]}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <>
              <Pressable
                key={index}
                style={styles.categoriesContainer}
                onPress={() =>
                  navigation.navigate('WorkoutDetails', {
                    image: item.image,
                    name: item.title,
                  })
                }>
                <Image source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </Pressable>
            </>
          )}
        />

        {/* <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <Pressable key={index} style={styles.categoryCard}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </Pressable>
        ))}
      </View> */}
      </ScrollView>
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
