import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../src/screens/dashboard";
import Details from "../src/screens/details";
import Settings from "../src/screens/settings";
import NewEntry from "../src/screens/newentry";
import { StatusBar } from "expo-status-bar";

const getFonts = () =>
  Font.loadAsync({
    InterLight: require("../src/assets/fonts/Inter-Light.ttf"),
    InterRegular: require("../src/assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../src/assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../src/assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../src/assets/fonts/Inter-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const Stack = createStackNavigator();

  if (fontsLoaded) {
    return (
      <View>
        <StatusBar style="auto" translucent={false} backgroundColor="#FFFFFF" />
        {/* <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
          > */}
        {/* <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Settings" component={Settings} /> */}
        <NewEntry />
        {/* </Stack.Navigator> */}
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
