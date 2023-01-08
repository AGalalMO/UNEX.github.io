import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";

import ALink from "~/src/components/features/alink";
import Qty from "~/src/components/features/qty";
import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";
import { getCart } from "~/src/store/cart";
import { useTranslation } from "next-i18next";

function DetailOne(props) {
  const { t } = useTranslation(["shop", "common"]);
  const router = useRouter();
  const { id } = router.query;
  const ref = useRef(null);
  const { product } = props;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(1);
  const [color, setColor] = useState(1);
  const [selectedInfo, setSelectedInfo] = useState(product?.info?.[0]);
  const [selectedSizeCount, setSelectedSizeCount] = useState(
    product?.info?.[0]?.countBySize?.[0]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    scrollHandler();
  }, [router.pathname]);

  function scrollHandler() {
    if (router.pathname.includes("/product/default")) {
      let stickyBar = ref.current.querySelector(".sticky-bar");
      if (
        stickyBar.classList.contains("d-none") &&
        ref.current.getBoundingClientRect().bottom < 0
      ) {
        stickyBar.classList.remove("d-none");
        return;
      }
      if (
        !stickyBar.classList.contains("d-none") &&
        ref.current.getBoundingClientRect().bottom > 0
      ) {
        stickyBar.classList.add("d-none");
      }
    }
  }

  function selectSize(value) {
    setSize(value.size);
    const filter = selectedInfo?.countBySize.filter(
      (item) => item.size == value
    );
    setSelectedSizeCount(filter[0]);
    setQty(0);
  }

  function onChangeQty(current) {
    setQty(current);
  }

  async function onCartClick(e, index = 0) {
    if (qty) {
      e.preventDefault();
      if (e.currentTarget.classList.contains("btn-disabled")) return;
      console.log({ product });

      await axiosInstance.post(APIS.CART.ADD, null, {
        params: {
          itemId: selectedSizeCount.itemId,
          token: localStorage.getItem("accessToken"),
          count: qty,
        },
      });
      dispatch(getCart());
    }
  }

  return (
    <div className="product-details" ref={ref}>
      {Boolean(product) && Boolean(selectedInfo) && (
        <>
          <h1 className="product-title" style={{ display: "flex" }}>
            {product?.name}
          </h1>

          <div className="product-price">
            {product.discount ? (
              <span style={{ fontSize: "2rem" }}>
                <span
                  style={{ textDecoration: "line-through", color: "black" }}
                >
                  {product.price.toFixed(2)}
                </span>{" "}
                {product.discountedPrice.toFixed(2)} EGP
              </span>
            ) : (
              <span>{product.price.toFixed(2)} EGP</span>
            )}
          </div>

          <div className="product-content">
            <p>{product?.short_desc}</p>
          </div>

          {
            <>
              <div className="details-filter-row details-row-size">
                <label style={{ display: "flex !important" }}>
                  {t("COLOR")}:
                </label>

                <div
                  className="product-nav product-nav-dots"
                  style={{ marginInlineStart: "0 !important" }}
                >
                  {product?.info?.map((item, index) => (
                    <span
                      className={`${item == selectedInfo ? "active " : ""}`}
                      style={{
                        backgroundColor: item.color,
                        width: 36,
                        height: 36,
                      }}
                      key={index}
                      onClick={() => {
                        console.log("item", item);
                        setSelectedInfo(item);
                        setSelectedSizeCount(item.countBySize?.[0]);
                        setSize(item.countBySize?.[0]?.size);
                        setQty(0);
                      }}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="details-filter-row details-row-size">
                <label htmlFor="size" style={{ display: "flex !important" }}>
                  {t("SIZE")}:
                </label>
                <div
                  className="select-custom"
                  style={{ marginInlineStart: "0 !important" }}
                >
                  <select
                    name="size"
                    className="form-control"
                    value={size}
                    onChange={(e) => {
                      selectSize(e.target.value);
                    }}
                  >
                    <option value="">Select a size</option>
                    {selectedInfo.countBySize?.map((item, index) => (
                      <option value={item.size} key={index}>
                        {item.size}
                      </option>
                    ))}
                  </select>
                </div>

                <ALink href="#" className="size-guide mr-4">
                  <i className="icon-th-list"></i>
                  {t("SIZE_GUIDE")}
                </ALink>
              </div>
            </>
          }

          <div className="details-filter-row details-row-size">
            <label htmlFor="qty" style={{ display: "flex !important" }}>
              {t("QUANTITY")}:
            </label>
            {selectSize.count == 0 ? (
              <span className="product-label label-out">
                {t("OUT_OF_STOCK")}
              </span>
            ) : (
              <Qty
                changeQty={onChangeQty}
                max={selectedSizeCount?.count}
                value={qty}
              ></Qty>
            )}
          </div>

          {Boolean(selectedSizeCount) && Boolean(qty) && (
            <div className="product-details-action">
              <a
                href="#"
                className={`btn-product btn-cart`}
                onClick={(e) => onCartClick(e, 0)}
              >
                <span>{t("ADD_TO_CART")}</span>
              </a>
            </div>
          )}

          <div className="product-details-footer">
            <div
              className="product-cat w-100 text-truncate"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <span style={{ fontWeight: "500" }}>{t("CATEGORY")}:</span>
              <span>
                <ALink
                  href={{
                    pathname: "/shop/3cols",
                    query: { category: product?.subCategoryName },
                  }}
                >
                  {product?.subCategoryName}
                </ALink>
              </span>
            </div>
          </div>
          <div className="product-details-footer">
            <div className="product-des">
              <p style={{ fontWeight: "500", display: "flex" }}>
                {t("PRODUCT_DESC")}
              </p>
              <span>
                We deliver to over 100 countries around the world. For full
                details of the delivery options we offer, please view our
                Delivery information We hope you’ll love every purchase, but if
                you ever need to return an item you can do so within a month of
                receipt. For full details of how to make a return, please view
                our Returns information We deliver to over 100 countries around
                the world. For full details of the delivery options we offer,
                please view our Delivery information We hope you’ll love every
                purchase, but if you ever need to return an item you can do so
                within a month of receipt. For full details of how to make a
                return, please view our Returns information We deliver to over
                100 countries around the world. For full details of the delivery
                options we offer, please view our Delivery information We hope
                you’ll love every purchase, but if you ever need to return an
                item you can do so within a month of receipt. For full details
                of how to make a return, please view our Returns information
              </span>
            </div>
          </div>
        </>
      )}

      {/* <div className="sticky-bar d-none">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <figure className="product-media">
                                <ALink href={`/product/default/${product?.slug}`}>
                                    <img src={product?.images?.[0]} alt="product" width={250} height={250} />
                                </ALink>
                            </figure>
                            <h3 className="product-title">
                                <ALink href={`/product/default/${product?.slug}`}>{product?.name}</ALink>
                            </h3>
                        </div>
                      
                    </div >
                </div >
            </div > */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartlist: [],
    wishlist: [],
  };
};

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(
  DetailOne
);
