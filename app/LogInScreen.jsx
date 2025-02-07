import { Text, StyleSheet, Alert, Button, TextInput, View} from "react-native"
import {useState} from "react"
import { doc, getDoc } from "firebase/firestore";
import {db, auth} from "../FirebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({setUser}) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        mail,
        password,
      );
      console.log(userCredentials);
      const uid = userCredentials.user.uid;
      console.log(uid);
      const userDoc = await getDoc(doc(db, "users", uid));
      console.log(userDoc);
      if (!userDoc.exists()) {
        Alert.alert("el correo o la contraseña no están correctos.");
        console.log("el correo o la contraseña no están correctos.");
        return;
      }
      // navigate a calendario
      await AsyncStorage.setItem("user", JSON.stringify(userCredentials));
      Alert.alert("todo ok");
      console.log("todo ok");
      setUser(uid)
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log("contraseña incorrecta!!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>INICIO DE SESIÓN</Text>
      <Text style={styles.label}>Correo:</Text>
      <TextInput
        placeholder="correo@correo.com"
        keyboardType="email-address"
        value={mail}
        onChangeText={(text) => setMail(text)}
        style={styles.input}
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        keyboardType="email-address"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button styles={styles.button} title="Aceptar" onPress={submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "purple",
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  button: {
    borderColor: "#fff",
    backgroundColor: "purple",
  },
});

