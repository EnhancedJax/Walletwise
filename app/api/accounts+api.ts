import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Account } from "../../src/types";

const testAccounts: Account[] = [
  {
    name: "Cash",
    balance: 6942.01,
    gradient: ["#3385ff", "#4ECAFF"],
  },
  {
    name: "Octopus",
    balance: -0.08,
    gradient: ["#FF6320", "#FF984E"],
  },
];

export async function GET(request: ExpoRequest) {
  const resp = ExpoResponse.json(testAccounts);
  return resp;
}
