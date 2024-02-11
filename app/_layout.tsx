import { Stack, useRouter } from "expo-router";
import Head from "expo-router/head";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useSession from "../src/hooks/useSession";
import { RootSiblingParent } from "react-native-root-siblings";
import { useUpdateData } from "../src/hooks/useUpdateData";
import * as SplashScreen from "expo-splash-screen";

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
  const {
    pullAccounts,
    pullCategories,
    pullEntries,
    getLocalAccounts,
    getLocalCategories,
    getLocalEntries,
  } = useUpdateData();

  useEffect(() => {
    if (!hasRendered.current) return;
    if (!(session && session.user)) router.replace("/auth/login");
    getLocalAccounts();
    getLocalCategories();
    getLocalEntries();

    pullAccounts();
    pullCategories();
    pullEntries();
  }, [session, hasRendered.current]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    getFonts().then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (fontsLoaded) {
    SplashScreen.hideAsync();
    return (
      <>
        <RootSiblingParent>
          <Head>
            <title>WalletWise</title>
            <meta name="description" content="A simple budget tracker app" />
          </Head>
          <StatusBar style="dark" translucent={false} />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </GestureHandlerRootView>
        </RootSiblingParent>
      </>
    );
  }
}
