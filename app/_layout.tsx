import { Stack } from "expo-router";
import Head from "expo-router/head";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";

const getFonts = () =>
  Font.loadAsync({
    InterLight: require("../src/assets/fonts/Inter-Light.ttf"),
    InterRegular: require("../src/assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../src/assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../src/assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../src/assets/fonts/Inter-Bold.ttf"),
  });

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <>
        <Head>
          <title>WalletWise</title>
          <meta name="description" content="A simple budget tracker app" />
        </Head>
        <Stack screenOptions={{ headerShown: false }} />
      </>
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