import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/Pages/Main";
import Add from "./src/Pages/Add";
import Edit from "./src/Pages/Edit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerTitle: "Notes",
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerTitle: "Add Note",
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerTitle: "Edit Note",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
