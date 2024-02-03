import { Stack, useRouter } from "expo-router";
import Head from "expo-router/head";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
  const router = useRouter();
  const hasRendered = useRef(false);

  useEffect(() => {
    if (!hasRendered.current) return;
    if (!(session && session.user)) router.replace("/auth/login");
  }, [session]);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (fontsLoaded) {
    return (
      <>
        <Head>
          <title>WalletWise</title>
          <meta name="description" content="A simple budget tracker app" />
        </Head>
        <StatusBar style="auto" translucent={false} backgroundColor="#FFFFFF" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </GestureHandlerRootView>
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
