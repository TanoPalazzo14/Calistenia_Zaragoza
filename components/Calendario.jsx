import { Text, ScrollView, Button, ActivityIndicator, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Calendario({setUser}) {

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null)
    } catch (error) {
      console.error("Error al eliminar datos de AsyncStorage:", error);
    }
  }

  return (
    <ScrollView>
    <Text>Calendario</Text>
      <Button styles={styles.button} title="Log Out" onPress={logOut} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: "#fff",
    backgroundColor: "purple",
  },
});
