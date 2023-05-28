function getMatrixProduct(m1, m2) {
  const result = [];
  for (let i = 0; i < m2[0].length; i += 1) {
    const sub = [];
    for (let k = 0; k < m2[i].length; k += 1) {
      let n = 0;
      for (let j = 0; j < m1[0].length; j += 1) {
        n += m1[i][j] * m2[j][k];
        // console.log(i + '-' + j + ':' + n);
      }
      sub.push(n);
    }

    result.push(sub);
  }

  return result;
}

console.log(getMatrixProduct([[1, 2, 3]], [[4], [5], [6]]));
