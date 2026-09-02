import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import homeScreen from "../screens/homeScreen"
import cadastroMusicaScreen from "../screens/cadastroMusicaScreen"
import editarMusicaScreen from "../screens/cadastroMusicaScreen"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#FFFFFF",
          contentStyle: {
            backgroundColor: "#121212",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "MyMusic 🎵",
          }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroMusicaScreen}
          options={{
            title: "Adicionar música",
          }}
        />

        <Stack.Screen
          name="Editar"
          component={EditarMusicaScreen}
          options={{
            title: "Editar música",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}