import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/homeScreen";
import CadastroMusicaScreen from "../screens/cadastroMusicaScreen";
import EditarMusicaScreen from "../screens/editarMusicaScreen";
import PlayerScreen from "../screens/playerScreen";

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

        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
