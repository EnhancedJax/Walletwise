import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import Dash from "./screens/dash";
import { StatusBar } from "expo-status-bar";

const getFonts = () =>
  Font.loadAsync({
    Inter: require("./assets/fonts/Inter.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <View>
        <NavigationContainer>
          <StatusBar
            style="auto"
            translucent={false}
            backgroundColor="#FAFAFA"
          />
          <Dash />
        </NavigationContainer>
      </View>
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
