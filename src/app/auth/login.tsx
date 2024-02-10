import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Button,
  AppState,
  TextInput,
  SafeAreaView,
  Text,
} from "react-native";
import { supabase } from "../../utils/supabaseInit";
import useSession from "../../hooks/useSession";
import { Link, Redirect } from "expo-router";
import {
  OptionsWrapper,
  OptionRow,
  OptionRule,
  TouchableComponent,
} from "../../components/essentials";
import { Asterisk, Tag, User2 } from "lucide-react-native";
import { useUpdateData } from "../../hooks/useUpdateData";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const { pullAccounts, pullCategories, pullEntries } = useUpdateData();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  if (session && session.user) {
    pullAccounts();
    pullEntries();
    pullCategories();
    return <Redirect href={"/"} />;
  }
  return (
    <SafeAreaView className="bg-cbg dark:bg-dbg">
      <View className="flex items-center justify-center w-full h-full p-7 ">
        <Text className="text-2xl font-ib mb-7 ">
          <Text className="text-cpg dark:text-dpg">Wallet</Text>
          <Text className="text-cprimary dark:text-dprimary">Wise</Text>
        </Text>
        <OptionsWrapper>
          <OptionRow>
            <User2 className=" text-cpg dark:text-dpg" size="15px" />
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              className="w-full pl-4 text-base font-il text-cpg dark:text-dpg"
            />
          </OptionRow>
          <OptionRule />
          <OptionRow>
            <Asterisk className=" text-cpg dark:text-dpg" size="15px" />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              className="w-full pl-4 text-base font-il text-cpg dark:text-dpg"
            />
          </OptionRow>
          {/* <OptionRule />
          <OptionRow>
            <Tag className=" text-cpg dark:text-dpg" size="15px" />
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="Name (Signup)"
              autoCapitalize={"none"}
              className="w-full pl-4 text-base font-il text-cpg dark:text-dpg"
            />
          </OptionRow> */}
        </OptionsWrapper>
        <View className="flex w-full p-4 rounded-md mt-7 bg-cprimary dark:bg-dprimary mb-7">
          <TouchableComponent onPress={() => signInWithEmail()}>
            <Text className="text-center text-white font-ir">Sign in</Text>
          </TouchableComponent>
        </View>
        <Link href="/auth/signup" asChild>
          <TouchableComponent>
            <View className="flex w-full">
              <Text className="text-center text-cpg dark:text-dpg font-il">
                New user?
              </Text>
            </View>
          </TouchableComponent>
        </Link>
      </View>
    </SafeAreaView>
  );
}
