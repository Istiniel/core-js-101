function group(array, keySelector, valueSelector) {
  const result = array.reduce((acc, el) => {
    const values = acc.get(keySelector(el));
    const newValue = valueSelector(el);
    return acc.set(
      keySelector(el),
      values ? [...values, newValue] : [valueSelector(el)]
    );
  }, new Map());

  return JSON.stringify(Array.from(result.entries()));
}
console.log(
  group(
    [
      { country: 'Belarus', city: 'Brest' },
      { country: 'Russia', city: 'Omsk' },
      { country: 'Russia', city: 'Samara' },
      { country: 'Belarus', city: 'Grodno' },
      { country: 'Belarus', city: 'Minsk' },
    ],
    (item) => item.country,
    (item) => item.city
  )
);
