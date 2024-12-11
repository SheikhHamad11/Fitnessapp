import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {exercisebyParts} from '../constants/constant';
const WorkoutDetailsScreen = ({route, navigation}) => {
  const {image, name, id} = route.params;
  const [numofcol, setnumofcol] = useState(2);
  return (
    // <ScrollView style={styles.container}>

    <FlatList
      data={exercisebyParts}
      numColumns={numofcol}
      key={numofcol}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="black" />
            </Pressable>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Workout Details
            </Text>
            <Icon name="ellipsis-v" size={25} color="black" />
          </View>
          <Image
            source={image}
            style={{width: '100%', height: 200, borderRadius: 10}}
          />
          {/* <Text style={styles.title}>{workout.name}</Text> */}
          <Text style={styles.description}>
            Here are detailed instructions on how to do '{name}'!
          </Text>
          {/* <Image source={{uri: workout.image}} style={styles.image} /> */}
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, in
            dolores. Quam et, accusantium incidunt explicabo reprehenderit culpa
            quidem nulla officia provident iure. Corrupti accusantium omnis,
            velit perspiciatis numquam explicabo?
          </Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>🕒 Duration: {10} minutes</Text>
            <Text style={styles.detailText}>🔥 Difficulty: Intermediate</Text>
          </View>
        </View>
      }
      renderItem={({item}) => (
        <View
          style={{
            marginHorizontal: 'auto',
            marginVertical: 10,
          }}>
          <Image
            source={item.image}
            style={{width: 150, height: 150, gap: 10}}
          />
          <Text style={{textAlign: 'center'}}>{item.name}</Text>
        </View>
      )}
      ListFooterComponent={
        <View style={{margin: 10}}>
          <Button
            title="Start Workout"
            onPress={() =>
              navigation.navigate('WorkoutTimer', {workoutId: id, duration: 1})
            }
          />
          <View style={{height: 40}} />
        </View>
      }
    />

    // </ScrollView>
  );
};

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
