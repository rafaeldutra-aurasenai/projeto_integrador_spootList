import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/appNavigator';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}