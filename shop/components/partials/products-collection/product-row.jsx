import ProductTwo from '../../features/products/product-two';

export default function ProductsRow(props) {
  const {
    products = [],
    gridClass = 'col-6 col-sm-12',
    loading,
    perPage,
    addClass = '',
  } = props;

  return (
    <>
      <div
        className={`row skeleton-body skel-shop-products ${addClass} ${
          !loading ? 'loaded' : ''
        }`}
      >
        {loading
          ? new Array(parseInt(perPage)).fill(1).map((item, index) => (
              <div className={gridClass} key={`skel-pro-${index}`}>
                <div className="skel-pro skel-pro-list"></div>
              </div>
            ))
          : products.map((item, index) => (
              <div className={gridClass} key={`product-${index}`}>
                <ProductTwo product={item} />
              </div>
            ))}
      </div>
      {!loading && products.length === 0 ? (
        <div className="info-box with-icon">
          <p>No products were found matching your selection.</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
