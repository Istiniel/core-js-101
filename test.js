function getDigitalRoot(num) {
  let sum = (num * (num + 1)) / 2;
  while (sum >= 10) {
    sum = String(sum)
      .split('')
      .reduce((acc, a) => acc + +a, 0);
  }
  return sum;
}

console.log(getDigitalRoot(5));
