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
    const response = await fetch("/api/accounts");
    const data = await response.json();
    setAccounts(data);
  }

  async function fetchCategories() {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
  }

  async function fetchEntries() {
    const response = await fetch("/api/entries");
    const data = await response.json();
    setEntries(data);
  }

  return { accounts, categories, entries };
}

// example of how to use the hook
// const { accounts, entries, categories } = useData();
