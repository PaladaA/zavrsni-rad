const joinFirstAndCapital = (word) => {
  const result = word[0] + (word.slice(1).match(/[A-Z]/g)?.join("") ?? "");
  return result.toUpperCase();
};
export default joinFirstAndCapital;
