import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { addAccount } from "../src/utils/supabase";
import useSession from "../src/hooks/useSession";

function NewAcc() {
  const [name, setName] = useState("");
  const [bal, setBal] = useState(0);
  const { session } = useSession();

  async function createAccount() {
    await addAccount({
      name: name,
      balance: bal,
      color1: "#000000",
      color2: "#000000",
      owner: String(session?.user.id),
    });
  }
  return (
    <ScrollView>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="My Wallet"
        autoCapitalize={"none"}
      />
      {/* <TextInput
        onChangeText={(text) => setBal(text)}
        value={bal}
        placeholder="0"
        autoCapitalize={"none"}
      /> */}
      <Button title="Add" onPress={() => createAccount()} />
    </ScrollView>
  );
}

export default NewAcc;
