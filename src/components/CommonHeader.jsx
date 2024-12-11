import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function CommonHeader({title}) {
  // console.log('title', title);
  return (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, {textTransform: 'uppercase'}]}>
        {title}
      </Text>
      {/* Left Blue Expanded Shape */}
      <View style={styles.blueExpansion} />
      <Icon name="fire" size={25} color="orange" style={{marginTop: -20}} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#152B43',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomRightRadius: 50,
    padding: 24,
    elevation: 1,
    gap: 10,
    // flex: 1,
  },
  // blueExpansion: {
  //   position: 'absolute',
  //   bottom: -50,
  //   left: 0,
  //   width: 50, // Adjust width for the desired look
  //   height: 50, // Adjust height for the desired look
  //   backgroundColor: '#152B43', // Blue color for the shape
  //   borderBottomRightRadius: 120, // Rounded shape effect
  //   zIndex: 0, // Keep it behind the header content
  // },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'white',
    marginTop: -20,
  },
});
