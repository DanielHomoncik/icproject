import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectList from "./src/screens/ProjectList";
import TaskList from "./src/screens/TaskList";
import NotifierManager from "./src/components/NotifierManager";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NotifierManager />
      <Stack.Navigator>
        <Stack.Screen name="Projects" component={ProjectList} />
        <Stack.Screen name="Tasks" component={TaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
