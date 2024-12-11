import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import Carousoul from 'react-native-snap-carousel';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  const data = [
    {title: 'Image 1', img: require('../images/1.jpg')},
    {title: 'Image 2', img: require('../images/2.jpg')},
    {title: 'Image 3', img: require('../images/3.jpg')},
  ];

  const renderItem = ({item}) => (
    <View style={{borderRadius: 8, overflow: 'hidden', marginBottom: 10}}>
      <Image source={item.img} style={{width: '100%', height: 200}} />
      {/* <Text style={{padding: 10, textAlign: 'center'}}>{item.title}</Text> */}
    </View>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Carousoul
        layout="default"
        data={data}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.8}
        renderItem={renderItem}
        loop={true}
        onSnapToItem={index => setActiveIndex(index)}
      />
      {/* <Text>Active Slide: {activeIndex + 1}</Text> */}
    </View>
  );
};

export default Carousel;
