import "../global.css";
import { Stack, useRouter } from "expo-router";
import Head from "expo-router/head";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import useSession from "../hooks/useSession";
import { useUpdateData } from "../hooks/useUpdateData";

const getFonts = () =>
  Font.loadAsync({
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
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

    // pullAccounts();
    // pullCategories();
    // pullEntries();
  }, [session, hasRendered.current]);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (fontsLoaded) {
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
