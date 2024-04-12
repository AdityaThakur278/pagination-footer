import { useEffect, useState } from "react";
import _get from "lodash/get";
import _map from "lodash/map";

import FooterCard from "./components/FooterCard/FooterCard";
import Loader from "./components/Loader/Loader";
import { fetchProducts } from "./app.actions";
import styles from "./app.module.css";

const initialState = {
  products: [],
  currentPage: 0,
  totalProducts: 0,
  isFetching: true,
};

export default function App() {
  const [productsData, setProductsData] = useState(initialState);
  const products = _get(productsData, "products", []);
  const totalProducts = _get(productsData, "totalProducts", 0);
  const currentPage = _get(productsData, "currentPage", 0);
  const isFetching = _get(productsData, "isFetching", false);
  const totalPages = Math.ceil(totalProducts / 21);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { products, totalProducts } = await fetchProducts(currentPage);
        setProductsData({
          products,
          totalProducts,
          currentPage,
          isFetching: false,
        });
      };

      setProductsData((data) => ({ ...data, isFetching: true }));
      fetchData();
    } catch (error) {
      alert("Something went wrong");
    }
  }, [currentPage]);

  const handlePageSelect = async (value) => {
    setProductsData((data) => ({ ...data, currentPage: value }));
  };

  const handleLeftClick = () => {
    if (currentPage !== 0) {
      setProductsData((data) => ({ ...data, currentPage: currentPage - 1 }));
    }
  };

  const handleRightClick = () => {
    if (currentPage !== totalPages - 1) {
      setProductsData((data) => ({ ...data, currentPage: currentPage + 1 }));
    }
  };

  return (
    <div>
      {isFetching ? (
        <div className={styles.cardContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.cardContainer}>
          {_map(products, (product) => {
            const id = _get(product, "id");
            const images = _get(product, "images", []);
            const title = _get(product, "title", "");

            return (
              <div key={id} className={styles.card}>
                <img src={images[0]} className={styles.image} />
                <span className={styles.imageTitle}>{title}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.footerContainer}>
        <FooterCard
          value="<"
          isDisabled={currentPage === 0}
          onClick={handleLeftClick}
          isFetching={isFetching}
        />
        {_map(Array(totalPages), (_, index) => {
          return (
            <FooterCard
              value={index + 1}
              currentPage={currentPage + 1}
              onClick={handlePageSelect}
              isFetching={isFetching}
            />
          );
        })}
        <FooterCard
          value=">"
          isDisabled={currentPage === totalPages - 1}
          onClick={handleRightClick}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}
