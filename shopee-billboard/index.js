const solution = (input) => {
  const [_, barString] = input.split("\n");
  const bars = barString.split(" ").map((item) => +item);

  const lastIndex = bars.length - 1;
  const sum = { left: 0, right: bars[lastIndex] };
  let step = 0;
  for (let i = 0; i < bars.length; i++) {
    sum.left += bars[i];
    if (sum.left > sum.right) {
      sum.right += bars[lastIndex - 1];
      step++;
    }
    step++;
    if (step >= lastIndex) break;
  }

  return sum.left !== sum.right ? 0 : sum.left;
};

console.log(
  solution(`4
1 2 3 6`)
);
console.log(
  solution(`5
1 2 3 6 7`)
);
console.log(
  solution(`5
3 3 3 6 3`)
);
console.log(
  solution(`4
3 2 2 3`)
);
