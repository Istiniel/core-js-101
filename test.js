function encodeToRot13(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const unicode = str.charCodeAt(i);
    if (unicode >= 65 && unicode <= 90) {
      result.push(String.fromCharCode(((unicode - 65 + 13) % 26) + 65));
    } else if (unicode >= 97 && unicode <= 122) {
      result.push(String.fromCharCode(((unicode - 97 + 13) % 26) + 97));
    } else {
      result.push(str[i]);
    }
  }
  return result.join('');
}

console.log(encodeToRot13('Why did the chicken cross the road?'));
