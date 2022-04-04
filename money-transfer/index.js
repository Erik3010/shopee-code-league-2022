const solution = (input) => {
  const [parameters, ...rest] = input.split("\n");
  const [usersCount, transactionsCount] = parameters.split(" ");

  const users = rest.slice(0, usersCount);
  const transactions = rest.slice(usersCount, usersCount + transactionsCount);

  const usersMap = users.reduce((total, userString) => {
    const [user, balance] = userString.split(" ");
    total[user] = +balance;
    return total;
  }, []);

  for (let i = 0; i < transactions.length; i++) {
    const [from, to, balance] = transactions[i].split(" ");
    const fromBalance = usersMap[from];

    if (balance > fromBalance) continue;

    usersMap[from] -= +balance;
    usersMap[to] += +balance;
  }

  const map = Object.assign({}, usersMap);
  return Object.keys(map)
    .sort()
    .map((key) => `${key} ${map[key]}`)
    .join("\n");
};

console.log(
  solution(`3 4
amir 10
brenda 10
charlie 10
amir brenda 5
brenda charlie 5
charlie amir 20
charlie amir 7`)
);
