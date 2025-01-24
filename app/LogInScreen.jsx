import { Text, StyleSheet, Alert, Button, TextInput, View} from "react-native"
import {useState} from "react"
import { doc, getDoc } from "firebase/firestore";
import {db, auth} from "../FirebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";

export default function LoginScreen() {
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
      Alert.alert("todo ok");
      console.log("todo ok");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log("contraseña incorrecta!!");
    }
  };

  return (
    <View>
      <Text>INICIO DE SESIÓN</Text>
      <Text>Correo:</Text>
      <TextInput
        placeholder="correo@correo.com"
        keyboardType="email-address"
        value={mail}
        onChangeText={(text) => setMail(text)}
        style={styles.input}
      />
      <Text>Contraseña:</Text>
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
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "purple",
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

