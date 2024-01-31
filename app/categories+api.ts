import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Category } from "../src/types";

const testCategories: { [categoryName: string]: Category } = {
  "Food & Drinks": {
    color: "#0068FF33",
    icon: "utensils",
  },
  Wage: {
    color: "#FFB80033",
    icon: "wage",
  },
  Transfer: {
    color: "#00333333",
    icon: "transfer",
  },
};

export async function GET(request: ExpoRequest) {
  const resp = ExpoResponse.json(testCategories);
  return resp;
}
