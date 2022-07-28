import useTranslation from 'next-translate/useTranslation';

const ResumeCustomization = ({ selectedVariants, onChange, onRemove }) => {
  const { t } = useTranslation('common');
  function getTotalUds() {
    let totalUds = 0;
    selectedVariants.forEach(variant => {
      totalUds += variant.qty;
    });
    return totalUds;
  }
  return (
    <div className="product-collapse-panel">
      <h3 className="product-collapse-title p-0">
        {t('CUSTOMIZATION_RESUME')}
      </h3>
      <div className="product-collapse-body">
        <div className="collapse-body-wrapper pl-0">
          <div className="product-desc-content">
            <div className="d-block">
              <table className="table pt-0 mt-0">
                <thead>
                  <tr>
                    <th>{t('COLOR')}</th>
                    <th>{t('QUANTITY')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVariants.map(({ item, qty }, i) => (
                    <tr key={i}>
                      <td>{item.color.color_name}</td>
                      <td className="text-center">{`x ${qty}`}</td>
                      <td
                        css={{
                          i: {
                            cursor: 'pointer',
                            color: 'red',
                          },
                        }}
                        className="text-left"
                        onClick={() => onRemove(item)}
                      >
                        <i
                          className="fa fa-times"
                          aria-hidden="true"
                          title={t('REMOVE')}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-weight-bold">
                    <td>Total Uds</td>
                    <td className="text-center">{getTotalUds()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCustomization;
