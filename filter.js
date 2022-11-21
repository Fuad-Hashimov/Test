function getCategories(responceFetch) {
  const filterCategory = responceFetch.filter((f) => !f.hn.includes(" - "));
  const result = filterCategory.slice(2, 7);
  return result;
}

function getSubCategories(responceFetch) {
  const resultSub = responceFetch.filter((f) => f.hn.includes(" - "));
  return resultSub;
}

export { getCategories, getSubCategories };
