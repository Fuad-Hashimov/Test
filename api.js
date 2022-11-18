import postFormData from "./postFormData.js";
const baseUrlCategory =
  "https://testyesweprint.secure-decoration.com/shared/lookups/product_categories";
const baseUrlProducts =
  "https://testyesweprint.secure-decoration.com/shared/lookups/idx_products";

async function getCategoriesApi() {
  const fetchRequest = await fetch(baseUrlCategory);
  const responceFetch = await fetchRequest.json();
  return responceFetch;
}

async function getProductsApi(page=1) {
  const fetchRequest = await fetch(baseUrlProducts, {
    method:"POST",
    body:postFormData(page),
  });
  const responceFetch = await fetchRequest.json();
  return responceFetch;
}

export { getCategoriesApi, getProductsApi };
