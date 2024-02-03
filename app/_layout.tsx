import { Redirect, Stack } from "expo-router";
import Head from "expo-router/head";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import useSession from "../src/hooks/useSession";

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
  const { session } = useSession();
  if (fontsLoaded) {
    return (
      <>
        <Head>
          <title>WalletWise</title>
          <meta name="description" content="A simple budget tracker app" />
        </Head>
        <StatusBar style="auto" translucent={false} backgroundColor="#FFFFFF" />
        <Stack screenOptions={{ headerShown: false }} />
        {!(session && session.user) && <Redirect href={"/auth/login"} />}
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
