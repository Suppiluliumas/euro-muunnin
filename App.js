import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
export default function App() {
  const [euro, setEuro] = useState("");
  const [symbols, setSymbols] = useState({});
  const [selectedValue, setSelectedValue] = useState();
  const [tulos, setTulos] = useState({});
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      apikey: "OIG2gkvFfYJxHqUAl5L5K4A9JWsriw5N",
    },
  };

  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSymbols(data.symbols);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }, []);
  const convertEuros = () => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedValue}&amount=${euro}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setTulos(data);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>
      {tulos.result}€</Text>
      <TextInput
      style= {styles.input}
        keyboardType="numeric"
        placeholder="Euro"
        value={euro}
        onChangeText={(text) => setEuro(text)}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {Object.keys(symbols).map((currencyCode) => (
          <Picker.Item
            label={`${currencyCode} - ${symbols[currencyCode]}`}
            value={currencyCode}
            key={currencyCode}
          />
        ))}
      </Picker>
      <Button title="Convert" onPress={convertEuros} />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  text: {
    fontWeight:"bold",
    color:"blue",
    marginBottom:20,
    fontSize:40
  },
  input: {
    borderWidth: 1,         
    borderColor: '#ccc',    
    borderRadius: 8,       
    paddingHorizontal: 12, 
    paddingVertical: 8,    
    fontSize: 16,          
  }
});
