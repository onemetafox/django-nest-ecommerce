import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { useStore } from 'react-redux';

// React select style
const menuListStyle = {
  menu: provided => ({
    ...provided,
    position: 'relative',
  }),
  menuList: (provided, state) => ({
    ...provided,
    height: 'auto',
    padding: 0,
    display: 'block',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    display: 'flex',
  }),
};

const dropsColors = [
  '#C25975',
  '#575853',
  '#F4D03F',
  '#E45E66',
  '#2B2B2B',
  '#F2994A',
  '#E3E3E3',
  '#979797',
  '#BDBDBD',
  '#000000',
  '#3B6C63',
];

const { Option } = components;
const IconOption = props => (
  <Option {...props}>
    <div className="row justify-content-between">
      <span className="col-auto">{props.data.label}</span>
      <span className="col-auto">
        {[...Array(props.value)].map((_, i) => (
          <i
            key={'color' + i}
            className="fa fa-tint"
            aria-hidden="true"
            style={{ color: dropsColors[i] }}
          ></i>
        ))}
      </span>
    </div>
  </Option>
);
const { Input } = components;
const IconInput = props => {
  let option = props.getValue();
  return option.length && typeof props.selectOption !== 'object' ? (
    <div css={{ display: 'contents' }}>
      <Input {...props} />
      {[...Array(option[0].value)].map((_, i) => (
        <i
          key={'color_' + i}
          className="fa fa-tint"
          aria-hidden="true"
          style={{ color: dropsColors[i] }}
        ></i>
      ))}
    </div>
  ) : (
    <Input {...props} />
  );
};

const EngravingTechnique = ({
  techniques,
  setColors,
  setEngravingTechnique,
}) => {
  const { t } = useTranslation('common');
  const store = useStore();
  const [options, setOptions] = useState([]);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedColors, setSelectedColors] = useState(null);

  useEffect(() => {
    setEngravingTechnique(selectedTechnique);
  }, [selectedTechnique]);

  useEffect(() => {
    if (techniques) {
      setOptions(techniques);
      setSelectedTechnique(null);
      setColors(null);
      setSelectedColors(null);
    }
  }, [techniques]);

  const setSelectedUserColors = (color, i) => {
    setSelectedColors({ ...selectedColors, ['color' + i]: color });
  };

  return (
    <div className="product-collapse-panel">
      <h3 className="product-collapse-title my-3">
        {t('AVAILABLE_TECHIQUES')}
      </h3>
      <p>{t('AREAS_TEXT')}</p>
      <div className="product-collapse-body">
        <div className="collapse-body-wrapper pl-0">
          <div className="product-size-content">
            <div className="row align-items-start justify-content-between">
              <div className="col-12 col-md-6 form-group">
                <Select
                  options={options}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                  onChange={option => {
                    setSelectedTechnique(option);
                    setColors(null);
                    setSelectedColors(null);
                  }}
                  value={selectedTechnique}
                  placeholder={t('SELECT_TECHNIQUE')}
                  isLoading={techniques?.length === 0}
                  styles={menuListStyle}
                />
              </div>
              <div className="col-12 col-md-6 form-group">
                <Select
                  options={[...Array(selectedTechnique?.max_color)].map(
                    (_, i) => ({
                      label: `${t(
                        i === 0 ? 'WITH_ONE_COLOR' : 'WITH_N_COLORS',
                        {
                          count: i + 1,
                        },
                      )}`,
                      value: i + 1,
                    }),
                  )}
                  onChange={option => {
                    setSelectedColors(option);
                    setColors(option.value);
                  }}
                  value={selectedColors}
                  placeholder={t('SELECT_COLOR')}
                  styles={menuListStyle}
                  isDisabled={!selectedTechnique}
                  components={{ Option: IconOption, Input: IconInput }}
                  onMenuOpen={() => {
                    setColors(null);
                    setSelectedColors(null);
                  }}
                />
              </div>
              <div className="col-12 col-md-6 offset-lg-6 text-right">
                {selectedColors &&
                  [...Array(selectedColors.value)].map((_, i) => (
                    <input
                      type={'color'}
                      key={'color' + i}
                      onChange={e => setSelectedUserColors(e.target.value, i)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngravingTechnique;
