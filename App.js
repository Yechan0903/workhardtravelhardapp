import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,
 } from 'react-native';
import { theme } from './colors';

export default function App() {
  const[working,setWorking] = useState(true);
  const [text,setText] = useState("");
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: working ? theme.grey : "white"}}>Travel</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input} 
      />
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:20,
  },
  header:{
    flexDirection:"row",
    marginTop:50,
    justifyContent:"space-between"
  },
  btnText:{
    fontSize:40,
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:30,
    marginTop:10,
  },
});