
const testCategories = {
  "Food & Drinks": {
    color: "#0068FF33",
    icon: "utensils",
  },
  "Wage": {
    color: "#FFB80033",
    icon: "wage",
  },
  "Transfer": {
    color: "#00333333",
    icon: "transfer",
  }
}

const testEntries = [{
  name: "My McDonald's",
  amount: 500,
  date: new Date(),
  category: testCategories['Food & Drinks'],
  account: "Cash",
  type: 0, //0 = expense, 1 = income, 2 = transfer
},
{
  name: "Wage",
  amount: 1000,
  date: new Date(),
  category: testCategories['Wage'],
  account: "Octopus",
  type: 1, //0 = expense, 1 = income, 2 = transfer
},
{
  name: "Materialize",
  amount: 52.99,
  date: new Date(),
  category: testCategories['Transfer'],
  account: [0, 1],
  type: 2, //0 = expense, 1 = income, 2 = transfer
}]

const testAccounts = [
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
  {
    name: "Super wallet",
    balance: 1000,
    gradient: ["#e70cff", "#ff74e5"],
  },
  {
    name: "My balls",
    balance: -0.08,
    gradient: ["#626262", "#898989"],
  },
]

export { testAccounts }
export { testEntries }
export { testCategories }