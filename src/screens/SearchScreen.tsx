import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

interface BirdSchema {
  species: string;
  weightLossGoal: number;
  incubationDays: number;
}

const calculateWeightLoss = (startingWeight: number, currentWeight: number) => {
  return ((startingWeight - currentWeight) / startingWeight) * 100;
};

const calculateDaysIncubating = (startingDate: string) => {
  const startDate = new Date(startingDate);
  const today = new Date();
  return Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
  );
};

const Incubator: React.FC = () => {
  const [startingWeight, setStartingWeight] = useState('');
  const [eggname, setEggName] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [humidity, setHumidity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [selectedBird, setSelectedBird] = useState('');
  const [weightLoss, setWeightLoss] = useState<number | null>(null);
  const [daysIncubating, setDaysIncubating] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [birdsData, setBirdsData] = useState<Array<BirdSchema>>([]);

  useEffect(() => {
    axios
      .get('http://192.168.60.26:8080/birdsData')
      .then(res => setBirdsData(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (startingWeight && currentWeight) {
      setWeightLoss(
        calculateWeightLoss(
          parseFloat(startingWeight),
          parseFloat(currentWeight),
        ),
      );
    } else {
      setWeightLoss(null);
    }
  }, [startingWeight, currentWeight]);

  useEffect(() => {
    if (startingDate) {
      setDaysIncubating(calculateDaysIncubating(startingDate));
    }
  }, [startingDate]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!startingWeight) errors.startingWeight = 'Starting weight is required.';
    if (!currentWeight) errors.currentWeight = 'Current weight is required.';
    if (!humidity) errors.humidity = 'Humidity is required.';
    if (!temperature) errors.temperature = 'Temperature is required.';
    if (!startingDate) errors.startingDate = 'Starting date is required.';
    if (!selectedBird) errors.selectedBird = 'Please select a bird species.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post('http://192.168.60.26:8080/calculatedData', {
          selectedBird,
          eggname,
          startingWeight,
          currentWeight,
          humidity,
          temperature,
          startingDate,
          daysIncubating,
        })
        .then(() => Alert.alert('Success', 'Data submitted successfully'))
        .catch(err => Alert.alert(err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Incubation Mentor</Text>

      <Text style={styles.label}>Select Bird Species</Text>
      <Picker
        selectedValue={selectedBird}
        onValueChange={itemValue => setSelectedBird(itemValue)}
        style={styles.input}>
        <Picker.Item label="-- Select Bird --" value="" />
        {birdsData.map(bird => (
          <Picker.Item
            key={bird.species}
            label={bird.species}
            value={bird.species}
          />
        ))}
      </Picker>
      {formErrors.selectedBird && (
        <Text style={styles.error}>{formErrors.selectedBird}</Text>
      )}

      <Text style={styles.label}>Egg Name</Text>
      <TextInput
        style={styles.input}
        value={eggname}
        onChangeText={setEggName}
      />

      <Text style={styles.label}>Starting Weight</Text>
      <TextInput
        style={styles.input}
        value={startingWeight}
        onChangeText={setStartingWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Current Weight</Text>
      <TextInput
        style={styles.input}
        value={currentWeight}
        onChangeText={setCurrentWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Humidity (%)</Text>
      <TextInput
        style={styles.input}
        value={humidity}
        onChangeText={setHumidity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Temperature (°C)</Text>
      <TextInput
        style={styles.input}
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Starting Date</Text>
      <TextInput
        style={styles.input}
        value={startingDate}
        onChangeText={setStartingDate}
        placeholder="YYYY-MM-DD"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Incubator;
