import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { connect, useStore } from 'react-redux';
import ALink from '../../../common/ALink';
import EngravingAreas from './engravingAreas';
import EngravingTechnique from './engravingTechnique';
import PtDropzone from '../../../features/dropzone';
import { actions as ProductActions } from '../../../../store/product';

const Resume = ({ units, prices, webConfig, t }) => {
  return (
    <div className="text-right price-box">
      <h3 className="section-title font-weight-normal">
        {prices.priceUnit} €/Ud
      </h3>
      <h3 className="section-title">Total: {prices.totalGross} €</h3>
      <h4 className="product-price-vat">
        {prices.totalNet}{' '}
        <span>
          {webConfig.vat_show_in_products
            ? t('VAT_NOT_INCLUDE')
            : t('VAT_INLUDE')}
        </span>
      </h4>
    </div>
  );
};

const ProductCustomization = ({
  areas,
  selectedVariants,
  webConfig,
  selectedArea,
  price,
  addToCart,
}) => {
  const { t } = useTranslation('common');
  const store = useStore();
  const [colors, setColors] = useState(1);
  const [units, setUnits] = useState(0);
  const [techniques, setTechniques] = useState([]);
  const [engravingTechnique, setEngravingTechnique] = useState(null);
  const [variantPrice, setVariantPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [active, setActive] = useState(false);
  const [prices, setPrices] = useState({
    priceUnit: 0,
    totalGross: 0,
    totalNet: 0,
  });

  useEffect(() => {
    if (engravingTechnique) {
      getPrices();
      setActive(canAddToCart());
    }
  }, [
    selectedVariants,
    engravingTechnique,
    colors,
    selectedArea,
    description,
    image,
    webConfig,
  ]);

  useEffect(() => {
    if (!variantPrice) {
      setVariantPrice(price);
    }
  }, [price]);

  useEffect(() => {
    if (selectedArea) {
      setTechniques(selectedArea.engraving_technique);
    }
  }, [selectedArea]);

  // Unmount component
  useEffect(() => {
    return () => {
      store.dispatch(ProductActions.cleanVariant());
    };
  }, []);

  const getPrices = () => {
    let totalUds = 0;
    selectedVariants.forEach(variant => {
      totalUds += variant.qty;
    });

    let nColors = colors ? colors : 1;
    setUnits(totalUds);

    const {
      cliche_price,
      minimum_work,
      repeated_cliche_price,
      is_cliche_repeated,
      color1_price,
      color2_price,
      color3_price,
      color4_price,
      color5_price,
      color6_price,
      color7_price,
      min_amount,
      min_amount_1,
      min_amount_2,
      min_amount_3,
      min_amount_4,
      min_amount_5,
      min_amount_6,
      min_amount_7,
    } = engravingTechnique;

    let colorPrice = 0;
    let clichePrice = is_cliche_repeated ? repeated_cliche_price : cliche_price;
    let price = clichePrice;
    let minPriceUd = (clichePrice * nColors) / totalUds;

    switch (true) {
      case minPriceUd < min_amount:
        colorPrice = parseFloat(color1_price) * nColors;
        price = parseFloat(minimum_work) * nColors;
        break;

      case totalUds < min_amount_1:
        colorPrice = parseFloat(color1_price) * nColors;
        break;
      case totalUds < min_amount_2:
        colorPrice = parseFloat(color2_price) * nColors;
        break;
      case totalUds < min_amount_3:
        colorPrice = parseFloat(color3_price) * nColors;
        break;
      case totalUds < min_amount_4:
        colorPrice = parseFloat(color4_price) * nColors;
        break;
      case totalUds < min_amount_5:
        colorPrice = parseFloat(color5_price) * nColors;
        break;
      case totalUds < min_amount_6:
        colorPrice = parseFloat(color6_price) * nColors;
        break;
      case totalUds < min_amount_7:
        colorPrice = parseFloat(color7_price) * nColors;
        break;
      default:
        colorPrice = parseFloat(color7_price) * nColors;
        break;
    }

    let total = 0;
    let priceUd = 0;
    let totalNet = 0;

    if (webConfig && webConfig.vat_show_in_products) {
      total =
        (price + colorPrice * totalUds) * nColors +
        (totalUds * variantPrice) / 1.21;
      priceUd = (clichePrice * nColors) / totalUds + variantPrice / 1.21;
      totalNet = total / 1.21;
    } else {
      total =
        (price + colorPrice * totalUds) * nColors + totalUds * variantPrice;
      priceUd = (clichePrice * nColors) / totalUds + variantPrice;
      totalNet = total * 1.21;
    }

    setPrices({
      priceUnit: priceUd.toFixed(2).replace(/[.,]00$/, ''),
      totalGross: total.toFixed(3).replace(/[.,][1-9]00$/, '.00'),
      totalNet: totalNet.toFixed(2).replace(/[.,]00$/, ''),
    });
  };

  const canAddToCart = () =>
    selectedArea.length !== 0 &&
    engravingTechnique &&
    colors &&
    (image || description);

  const handleAddToCart = e => {
    e.preventDefault();

    if (
      selectedArea.length !== 0 &&
      engravingTechnique &&
      colors &&
      (image || description)
    ) {
      document
        .querySelector('.add-to-cart-customization')
        .classList.add('disabled');
    }

    //addToCart(products)
  };

  return (
    <div className="product-collapse-panel mt-3 product-single-details">
      <h3 className="section-title heading-border ls-20 border-0 nav-link active font-bolder">
        <ALink href="#">{t('CUSTOMIZE_PRODUCT')}</ALink>
      </h3>
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-md-4">
            <EngravingAreas areas={areas} />
          </div>
          <div className="col-12 col-md-8 col-lg-7 offset-lg-1">
            <EngravingTechnique
              techniques={techniques}
              setColors={setColors}
              setEngravingTechnique={setEngravingTechnique}
            />
            <div className="row">
              <div className="col-12 col-lg-6 mb-2">
                <PtDropzone onUpload={setImage} maxFiles={colors} />
              </div>
              <div className="col-12 col-lg-6 form-group">
                <div className="form-group">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder={t('CUSTOMIZATION_INPUT_DESCRIPTION')}
                    className="form-control mb-2 rounded"
                    style={{ height: '38px', borderColor: 'hsl(0, 0%, 70%)' }}
                    onChange={e => setDescription(e.target.value)}
                    css={{
                      '&:focus': {
                        borderColor: '#2684FF !important',
                        borderWidth: '2px !important',
                      },
                    }}
                  />
                  <label className="form-label" htmlFor="description">
                    {t('CUSTOMIZATION_INPUT_TEXT')}
                  </label>
                  <div className="col-12 my-5 product-single-details">
                    {units && engravingTechnique ? (
                      <Resume
                        units={units}
                        prices={prices}
                        webConfig={webConfig}
                        t={t}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 my-5 product-single-default p-0">
              <div className="product-action text-right d-block">
                {' '}
                <a
                  href="#"
                  className={`btn btn-primary add-cart shopping-cart w-100 mr-2 add-to-cart-customization ${
                    active ? '' : 'disabled'
                  }`}
                  title={t('ADD_TO_THE_CART')}
                  onClick={e => handleAddToCart(e)}
                >
                  {t('ADD_TO_THE_CART')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedArea: state.product.selectedArea,
    webConfig: state.landing.webCommons.web_config,
  };
};

export default connect(mapStateToProps, null)(ProductCustomization);
