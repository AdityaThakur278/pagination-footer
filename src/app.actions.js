import _get from "lodash/get";

const apiEndPoint = "https://dummyjson.com/products";
const NO_OF_ROWS_TO_FETCH = 21;

export const fetchProducts = async (page = 0) => {
  const response = await fetch(
    `${apiEndPoint}/?limit=${NO_OF_ROWS_TO_FETCH}&skip=${page * NO_OF_ROWS_TO_FETCH}`,
  );
  const responseData = await response.json();
  const products = _get(responseData, "products", []);
  const totalProducts = _get(responseData, "total", 0);
  return { products, totalProducts };
};
