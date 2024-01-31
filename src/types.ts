export interface Account {
  name: string;
  balance: number;
  gradient: [string, string];
}

export interface Category {
  color: string;
  icon: string;
}

export interface Entry {
  name: string;
  amount: number;
  date: Date;
  category: string;
  account: string;
  type: 0 | 1 | 2; //0 = expense, 1 = income, 2 = transfer
}
