import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import Dash from "./screens/dash";
import { StatusBar } from "expo-status-bar";

const getFonts = () =>
  Font.loadAsync({
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <StatusBar style="auto" translucent={false} backgroundColor="#FAFAFA" />
        <SafeAreaView className="w-screen h-screen bg-cbg">
          <Dash />
        </SafeAreaView>
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
