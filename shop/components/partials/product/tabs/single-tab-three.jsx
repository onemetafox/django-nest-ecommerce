import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { connect, useStore } from 'react-redux';
import { actions as CartAction } from '../../../../store/cart';
import { actions as ProductAction } from '../../../../store/product';
import { actions as UserActions } from '../../../../store/user';

// Import Custom Component
import ALink from '../../../common/ALink';
import Accordion from '../../../features/accordion/accordion';
import ProductCustomization from '../customization/product-customization';
import AddReview from '../reviews/add-review';
import ProductReviews from '../widgets/product-reviews';
import VariantCarousel from '../variants/variant-carousel';

function SingleTabThree(props) {
  const { t } = useTranslation('common');
  const { product, adClass = '' } = props;
  const store = useStore();

  const [variant, setVariant] = useState(null);
  const [options, setOptions] = useState(null);
  const [engravingAreas, setEngravingAreas] = useState(
    product.engraved_area || [],
  );
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [customizeProduct, setCustomizeProduct] = useState(false);
  const [carouselVariants, setCarouselVariants] = useState(() => {
    return product.variants.reduce((acc, variant) => {
      let temp = acc.find(item => item.color.slug === variant.color.slug);
      if (!temp) {
        acc.push(variant);
      }
      return acc;
    }, []);
  });

  const [index, setIndex] = useState();
  const [qty, setQty] = useState();

  useEffect(() => {
    if (variant) {
      let opts = product.variants.filter(
        v => v.color.slug === variant.color.slug,
      );
      setOptions(opts);
      dispatchActions();
    }
  }, [variant]);

  function dispatchActions() {
    store.dispatch(ProductAction.selectVariant(variant));
  }

  function changeMediaIndex(index, e) {
    if (!e.currentTarget.classList.contains('active')) {
      let thumbs = e.currentTarget.closest('.prod-thumbnail');
      thumbs.querySelector('.owl-dot.active') &&
        thumbs.querySelector('.owl-dot.active').classList.remove('active');
      e.currentTarget.classList.add('active');
    }
    setIndex(index);
    setVariant(carouselVariants[index]);
  }

  function getAvailability(date) {
    let availability = new Date(date);
    return availability.getTime() < Date.now()
      ? t('IMMEDIATE_AVAILABILITY')
      : t('AVAILABILITY_IN') + ' ' + availability.toLocaleDateString();
  }

  function changeQty(productVariant, qty) {
    setQty(qty);
    let temp = selectedVariants.filter(
      v => v.item.reference !== productVariant.reference,
    );

    if (qty > 0) {
      setSelectedVariants([...temp, { item: productVariant, qty }]);
      setVariant({ ...productVariant, qty: qty, price: product.price[1] });
    } else {
      setSelectedVariants(temp);
    }
  }

  function onRemove(variant) {
    let temp = selectedVariants.filter(
      v => v.item.reference !== variant.reference,
    );
    setSelectedVariants(temp);
  }

  function getVariantStock(item) {
    let isSelected = selectedVariants.find(
      v => v.item.reference === item.reference,
    );

    return isSelected ? item.stock - isSelected.qty : item.stock;
  }

  function getVariantQty(ref) {
    return selectedVariants.find(v => v.item.reference === ref)?.qty || 0;
  }

  function getStock(variant) {
    let temp = product.variants.filter(
      v => v.color.slug === variant.color.slug,
    );
    if (temp) {
      return temp.find(v => v.stock > 0);
    }
  }

  function addToCart(e) {
    e.preventDefault();
    if (
      selectedVariants.length > 0 &&
      !e.currentTarget.classList.contains('disabled')
    ) {
      store.dispatch(CartAction.addToCart(product, qty, index));
    }
  }

  return (
    <>
      <div className="skel-pro-tabs"></div>
      <div className="product-collapse-panel mt-3 product-customization">
        {/* VARIATIONS OPTIONS */}
        <VariantCarousel
          variants={product.variants}
          carouselVariants={carouselVariants}
          changeMediaIndex={changeMediaIndex}
          getStock={getStock}
          options={options}
          onRemove={onRemove}
          getVariantStock={getVariantStock}
          getAvailability={getAvailability}
          getVariantQty={getVariantQty}
          changeQty={changeQty}
          setCustomizeProduct={setCustomizeProduct}
          customizeProduct={customizeProduct}
          selectedVariants={selectedVariants}
          variant={variant}
          engravingAreas={engravingAreas}
          addToCart={addToCart}
          t={t}
        />

        {/* CUSTOMIZATION */}
        <div id="customize-product"></div>
        <div className="container p-0 mt-5">
          {Boolean(customizeProduct) && (
            <ProductCustomization
              areas={engravingAreas}
              selectedVariants={selectedVariants}
              price={product.price[0]}
              addToCart={addToCart}
            />
          )}
        </div>

        {/* TABS */}
        <div className="container">
          <Accordion adClass={`product-single-collapse mt-5 ${adClass}`}>
            {/* PRODUCT DESCRIPTION */}
            <div className="product-collapse-panel">
              <h3 className="product-collapse-title">
                <ALink href="#">{t('DESCRIPTION')}</ALink>
              </h3>
              <div className="product-collapse-body">
                <div className="collapse-body-wrapper pl-0">
                  <div className="product-desc-content">
                    <p>{product.product_description_additional}</p>
                    <p>
                      <strong>{t('PRODUCT_DIMENSIONS')}:</strong>{' '}
                      {`${t('WIDTH')}: ${product.dimensions[0]} cm, ${t(
                        'HEIGHT',
                      )}: ${product.dimensions[1]} cm, ${t('DEPTH')}: ${
                        product.dimensions[2]
                      } cm `}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT PACKAGING */}
            <div className="product-collapse-panel">
              <h3 className="product-collapse-title">
                <ALink href="#">{t('PACKAGING')}</ALink>
              </h3>
              <div className="product-collapse-body">
                <div className="collapse-body-wrapper pl-0">
                  <div className="product-desc-content">
                    <ul className="single-info-list">
                      <li>
                        <div className="d-flex">
                          <div className="info-list-icon d-flex align-items-center">
                            <img
                              src={'/images/products/box.png'}
                              alt={`Medidas caja producto ${product?.product_name}`}
                            />
                            <div className="ml-4 text-capitalize">
                              <span className="d-block">
                                Uds: {product?.box_units.replace(/[.,]00$/, '')}
                              </span>
                              <span className="d-block">
                                {t('BOX_SIZE')}:{' '}
                                {product?.box_dimension.replace(/[.,]00$/, '')}{' '}
                                / {t('WEIGHT')}: {product?.box_weight} Kg
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT SIZE */}
            {Boolean(product.size_guide) && (
              <div className="product-collapse-panel">
                <h3 className="product-collapse-title">
                  <ALink href="#">Size Guid</ALink>
                </h3>
                <div className="product-collapse-body">
                  <div className="collapse-body-wrapper pl-0">
                    <div className="product-size-content">
                      <div className="row">
                        <div className="col-md-4">
                          <img
                            src="images/products/single/body-shape.png"
                            alt="body shape"
                            width="217"
                            height="398"
                          />
                        </div>

                        <div className="col-md-8">
                          <table className="table table-size">
                            <thead>
                              <tr>
                                <th>SIZE</th>
                                <th>CHEST (in.)</th>
                                <th>WAIST (in.)</th>
                                <th>HIPS (in.)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>XS</td>
                                <td>34-36</td>
                                <td>27-29</td>
                                <td>34.5-36.5</td>
                              </tr>
                              <tr>
                                <td>S</td>
                                <td>36-38</td>
                                <td>29-31</td>
                                <td>36.5-38.5</td>
                              </tr>
                              <tr>
                                <td>M</td>
                                <td>38-40</td>
                                <td>31-33</td>
                                <td>38.5-40.5</td>
                              </tr>
                              <tr>
                                <td>L</td>
                                <td>40-42</td>
                                <td>33-36</td>
                                <td>40.5-43.5</td>
                              </tr>
                              <tr>
                                <td>XL</td>
                                <td>42-45</td>
                                <td>36-40</td>
                                <td>43.5-47.5</td>
                              </tr>
                              <tr>
                                <td>XLL</td>
                                <td>45-48</td>
                                <td>40-44</td>
                                <td>47.5-51.5</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="product-collapse-panel">
              <h3 className="product-collapse-title">
                <ALink href="#">Reviews ({product.reviews?.length || 0})</ALink>
              </h3>

              <div className="product-collapse-body">
                <div className="collapse-body-wrapper pl-0">
                  <div className="product-reviews-content">
                    <ProductReviews />
                    <div className="divider"></div>
                    <AddReview />
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default connect(null, { ...CartAction, ...ProductAction })(
  SingleTabThree,
);
