import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import Dash from "./screens/dash";

const getFonts = () =>
  Font.loadAsync({
    Inter: require("./assets/fonts/Inter.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Dash />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onError={(error) => console.error(error)}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}
