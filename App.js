import React, { useState, useEffect } from 'react';
import {Text, TextInput, View, Button, StyleSheet, Alert, ScrollView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Calculator = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState('')

  cal = (text) => {
    try {
      res = parseFloat(eval(text).toFixed(5))
      his = text.toString() + "=" + res + "\n"
      setResult(res)
      setHistory(history + his)
      save(history+his)
    } catch (error) {
      return ''
    }
  }

  const save = async (value) => {
    try {
      await AsyncStorage.setItem("history", value);
    } catch (error) {
      console.log('Error: ' + error );
    }
  }

  const load = async () => {
    try {
      const history = await AsyncStorage.getItem('history');
      if (history !== null) {
        setHistory(history);
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  clearHistory = async () => {
    try {
      setHistory("")
      await AsyncStorage.setItem("history", "");
    } catch(error) {
      console.log("Error: " + error)
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.resultBox}>
            {result}
        </Text>
      </View>
      <ScrollView style={styles.historyBox}>
        <Text>{history}</Text>
      </ScrollView>
      <Button
        onPress={() => clearHistory()}
        title='Xoá lịch sử'>
      </Button>
      <Text></Text>
      <Button
        onPress={() => cal(text)}
        title='Kết quả'>
      </Button>
      <TextInput
        style={styles.inputBox}
        placeholder="Nhập phép toán"
        multiline={true}
        onChangeText={setText}
        defaultValue={text}
      />
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  inputBox: {
    borderWidth:2,
    fontSize: 42,
    width: "100%"
  },
  resultBox: {
    marginTop: "10%",
    marginHorizontal: "0.5%",
    borderWidth:2,
    fontSize: 42,
    textAlign: 'right'
  },
  historyBox: {
    borderWidth: 4,
  }, 
});