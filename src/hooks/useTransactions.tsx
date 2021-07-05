import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionsContextData{
    transactions:Transaction[],
    createTransaction: (transaction:TransactionInput)=> Promise<void>;
}

// Herança
type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

function TransactionsProvider(props: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    api
      .get("transactions")
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  async function createTransaction(transactionParam: TransactionInput) {
    const response = await api.post("transactions", {
        ...transactionParam,
        createdAt:new Date()
    });
    const {transaction} = response.data;
    setTransactions([...transactions,transaction])
  }

  return (
    <TransactionsContext.Provider value={{transactions,createTransaction}}>
      {props.children}
    </TransactionsContext.Provider>
  );
}

function useTransactions(){
  const context = useContext(TransactionsContext)
  return context
}

export {  TransactionsProvider,useTransactions };
