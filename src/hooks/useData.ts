import { useState, useEffect } from "react";

export function useData() {
  useEffect(() => {
    fetchAccounts();
    fetchCategories();
    fetchEntries();
  }, []);

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [entries, setEntries] = useState([]);

  async function fetchAccounts() {
    const response = await fetch("/accounts");
    const data = await response.json();
    setAccounts(data);
  }

  async function fetchCategories() {
    const response = await fetch("/categories");
    const data = await response.json();
    setCategories(data);
  }

  async function fetchEntries() {
    const response = await fetch("/entries");
    const data = await response.json();
    setEntries(data);
  }

  return { accounts, categories, entries };
}

// example of how to use the hook
// const { accounts, entries, categories } = useData();
