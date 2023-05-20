function toNumber(value, def) {
  const result = Number(value);

  console.log(result);
  if (
    !Number.isNaN(result) &&
    Object.prototype.toString.call(result) === '[object Number]'
  ) {
    return result;
  }
  return def;
}

console.log(toNumber(null, 0));
