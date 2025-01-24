import { useState } from 'react';
import {Calendario} from '../components/Calendario';
import { View } from 'react-native';
import LogInScreen from './LogInScreen';

export default function Index () {
  const [user, setUser] = useState(null)
  {/* user ? main : login */}
  return (
    <View>
    { user ? (
      <Calendario />
    ) : (
      <LogInScreen />
    ) }  
    </View>
  )
}