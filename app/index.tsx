import { SafeAreaView } from "react-native";
import Dash from "../src/screens/dash";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="auto" translucent={false} backgroundColor="#FAFAFA" />
      <SafeAreaView className="w-screen h-screen bg-cbg">
        <Dash />
      </SafeAreaView>
    </>
  );
}
