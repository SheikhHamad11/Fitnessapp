import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const WorkoutTimerScreen = ({route, navigation}) => {
  const {workoutId, duration} = route.params; // Workout ID and duration passed via navigation
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup on unmount
  }, [isRunning, timeLeft]);

  // Helper to format time (MM:SS)
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isRunning ? 'Pause' : 'Start'}
          onPress={() => setIsRunning(!isRunning)}
        />
        <Button
          title="Reset"
          onPress={() => {
            setIsRunning(false);
            setTimeLeft(duration * 60);
          }}
        />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      {timeLeft === 0 && (
        <Text style={styles.complete}>Workout Complete! 🎉</Text>
      )}
    </View>
  );
};

export default WorkoutTimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  complete: {
    fontSize: 24,
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
});
