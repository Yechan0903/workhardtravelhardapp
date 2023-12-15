import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const STORAGE_KEY="@toDos";

export default function App() {
  const [working,setWorking] = useState(true);
  const [text,setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    s !== null ? setToDos(JSON.parse(s)) : null;
    setWorking(JSON.parse(await AsyncStorage.getItem("@Work")))
  }
  const travel = () => {
    setWorking(false)
    saveWork(false)
  }
  const work = () => {
    setWorking(true)
    saveWork(true)
  }
  const saveWork = async(w) => {
    await AsyncStorage.setItem("@Work",JSON.stringify(w))
  }
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async(toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(toSave));
  }; 

  const addToDo = async() => {
    if(text ===""){
      return
    }
    const newToDos = Object.assign(
      {}, 
      toDos, 
      {[Date.now()]:{text, working ,done:false}}
    );
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (id) => {
    Alert.alert("Delete To Do","Are you sure?", [
      {text: "Cancel"},
      {text: "I'm Sure",
      style: "destructive", 
      onPress: async() => {
        const newToDos ={...toDos}
        delete newToDos[id]
        setToDos(newToDos);
        await saveToDos(newToDos);
      }},
    ]);
  }
  const doneToDo = async(id) => {
    const newToDos = {...toDos}
    newToDos[id].done = !newToDos[id].done
    setToDos(newToDos)
    await saveToDos(newToDos);
  }

 
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
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input} 
      />
      
      <ScrollView>
        {Object.keys(toDos).map((key) => toDos[key].working === working ?
        <View style={styles.toDo} key={key}>
     
            {toDos[key].done === false ?
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              : <Text style={{...styles.toDoText, textDecorationLine:"line-through", opacity: 0.5}}>{toDos[key].text}</Text>
            }

          <View style={styles.btnView}>
            <TouchableOpacity>
              <Text><Feather name="edit" size={22} color="white" /></Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => doneToDo(key)}>
              <Text style ={styles.checkBtn}>
                {toDos[key].done === false ?
                 <Fontisto name="checkbox-passive" size={18} color="white" />
                 : <Fontisto name="checkbox-active" size={18} color="white" />
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteToDo(key)}>
              <Text style ={styles.deleteBtn}><Feather name="x" size={24} color="white" /></Text>
            </TouchableOpacity>
          </View>
        </View> : null)}
      </ScrollView>
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
    marginVertical:10,
  },
  toDo:{
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius:15,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",

  },
  toDoText:{
    color:"white",
    fontSize: 16,
    fontWeight:"500",
  },
  deleteBtn:{
    color:"white",
    fontSize: 16,
    fontWeight:"900",
    marginLeft:3,
  },
  btnView:{
    flexDirection:"row",
    alignItems:"center"
  },
  checkBtn: {
    marginLeft:7,
  },
  editToDoText: {
    backgroundColor: "white"
  }
});
