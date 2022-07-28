import useTranslation from 'next-translate/useTranslation';
import ALink from '../../../common/ALink';
import { mediaShare } from '../../../../services/constant/share-buttons';

const ShareButtons = () => {
  const { t } = useTranslation('common');
  return (
    <div className="product-single-share mb-3 justify-content-end">
      <p className="sr-only">{t('SHARE_THIS_PRODUCT')}:</p>

      <div className="social-icons mr-2">
        {mediaShare.map(item => (
          <ALink
            target="blank"
            href={item.href}
            className={`social-icon ${item.classes}`}
            title={item.title}
            key={item.title}
          ></ALink>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
