import { ITransaction } from "../type";

export function calculate(data: ITransaction[]) {
  if (data.length === 0) {
    return {
      entries: {
        amount: Number(0).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        amount: Number(0).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: Number(0).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      },
    };
  } else {
    const entriesTotal = data
      .filter((transaction) => transaction.type === "positive")
      .reduce(
        (acc, value) =>
          Number(acc) +
          parseFloat(
            value.amount
              .replace("R$", "")
              .trim()
              .replace(".", "")
              .replace(",", ".")
          ),
        0
      );

    const expensiveTotal = data
      .filter((transaction) => transaction.type === "negative")
      .reduce(
        (acc, value) =>
          Number(acc) +
          parseFloat(
            value.amount
              .replace("R$", "")
              .trim()
              .replace(".", "")
              .replace(",", ".")
          ),
        0
      );
    const total = entriesTotal - expensiveTotal;

    const lastTransactionEntries = getLastTransactionDate(data, "positive");
    const lastTransactionExpensives = getLastTransactionDate(data, "negative");
    const totalInterval = `01 A ${lastTransactionExpensives}`;

    return {
      entries: {
        amount: entriesTotal.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionEntries,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionExpensives,
      },
      total: {
        amount: total.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    };
  }
}

export function getLastTransactionDate(
  collection: ITransaction[],
  type: "positive" | "negative"
) {
  const filteredTransactions = collection.filter(
    (transaction) => transaction.type === type
  );

  const filterLastTransaction = filteredTransactions.reduce(
    (maxDate, transaction) => {
      if (transaction.date) {
        const [day, month, year] = transaction.date.split("/");
        const timestamp = new Date(
          `20${year}-${month}-${Number(day) + 1}`
        ).getTime();
        return isNaN(timestamp) ? maxDate : Math.max(maxDate, timestamp);
      }
      return maxDate;
    },
    0 as number
  );

  const dateTransaction = filterLastTransaction
    ? new Date(filterLastTransaction)
    : new Date();

  return `${dateTransaction?.getDate()} de ${dateTransaction?.toLocaleString(
    "pt-BR",
    { month: "long" }
  )}`;
}
