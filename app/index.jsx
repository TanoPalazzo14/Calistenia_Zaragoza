import { useEffect, useState } from 'react';
import {Calendario} from '../components/Calendario';
import { View, ActivityIndicator } from 'react-native';
import LogInScreen from './LogInScreen';
import Admin from './Admin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index () {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  {/* user ? main : login */}

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user"); // Clave de almacenamiento
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log("user:",storedUser) // Convertir de string a objeto
        }
      } catch (error) {
        console.error("Error al obtener datos del AsyncStorage:", error);
      } finally {
        setIsLoading(false)
      }
    };

    checkUser();
  }, [])

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
    
  }
  // loding...


  return (
    <View>
    { user ? (
      <Calendario setUser={setUser} />
    ) : (
      <>
      <Admin />
      <LogInScreen setUser={setUser} />
      </>
    ) }  
    </View>
  )
}