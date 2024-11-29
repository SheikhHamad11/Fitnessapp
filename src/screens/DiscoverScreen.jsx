import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable, Image} from 'react-native';
import CommonHeader from '../components/CommonHeader';
const sections = [
  {
    title: 'Health Tips',
    detailPage: 'HealthTipDetails',
    data: [
      {title: 'Stay Hydrated', image: require('../images/1.jpg')},
      {title: 'Proper Sleep', image: require('../images/2.jpg')},
      {title: 'Manage Stress', image: require('../images/3.jpg')},
    ],
  },
  {
    title: 'Exercises',
    detailPage: 'ExerciseDetails',
    data: [
      {
        title: 'Full Body Workout',
        image: require('../images/4.jpg'),
      },
      {title: 'Cardio Blast', image: require('../images/5.jpg')},
      {
        title: 'Strength Training',
        image: require('../images/6.jpg'),
      },
    ],
  },
  {
    title: 'Nutrition',
    detailPage: 'NutritionDetails',
    data: [
      {
        title: 'Healthy Eating',
        image: require('../images/14.jpg'),
      },
      {
        title: 'Meal Planning',
        image: require('../images/15.jpg'),
      },
      {
        title: 'Boost Your Energy',
        image: require('../images/16.jpg'),
      },
    ],
  },
];
export default function DiscoverScreen({navigation}) {
  return (
    <>
      <CommonHeader title={'Discover'} />
      <FlatList
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSection}
        nestedScrollEnabled={true} // Enables nested scrolling
        contentContainerStyle={styles.container}
      />
    </>
  );
}

const renderSection = ({item}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{item.title}</Text>
    <FlatList
      data={item.data}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({item: sectionItem}) => (
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate(item.detailPage, {data: sectionItem})
          }>
          <Image source={sectionItem.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{sectionItem.title}</Text>
        </Pressable>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
