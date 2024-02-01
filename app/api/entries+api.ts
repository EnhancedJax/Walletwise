import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Entry } from "../../src/types";

const testEntries: Entry[] = [
  {
    name: "My McDonald's",
    amount: 500,
    date: new Date(),
    category: "Food & Drinks",
    account: "Cash",
    type: 0, //0 = expense, 1 = income, 2 = transfer
  },
  {
    name: "Wage",
    amount: 1000,
    date: new Date(),
    category: "Wage",
    account: "Octopus",
    type: 1, //0 = expense, 1 = income, 2 = transfer
  },
  {
    name: "Materialize",
    amount: 52.99,
    date: new Date(),
    category: "Transfer",
    // account: [0, 1],
    account: "Octopus",
    type: 2, //0 = expense, 1 = income, 2 = transfer
  },
];

export async function GET(request: ExpoRequest) {
  const resp = ExpoResponse.json(testEntries);
  return resp;
}
