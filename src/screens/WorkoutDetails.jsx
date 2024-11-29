import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function WorkoutDetailsScreen({route}) {
  const {image, name} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={{width: '100%', height: 200, borderRadius: 10}}
      />
      {/* <Text style={styles.title}>{workout.name}</Text> */}
      <Text style={styles.description}>
        Here are detailed instructions on how to do '{name}'!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
