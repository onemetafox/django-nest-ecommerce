import useTranslation from 'next-translate/useTranslation';

const infoSectionCardContent = t => {
  return [
    {
      heading: t('MAIN_ADV_TITLE_1'),
      description: t('MAIN_ADV_DESCRIPTION_1'),
      icon: <i className="icon-shipping" />,
    },
    {
      heading: t('MAIN_ADV_TITLE_2'),
      description: t('MAIN_ADV_DESCRIPTION_2'),
      icon: (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fa"
          data-icon="boxes"
          role="img"
          viewBox="0 0 576 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16zm-384-64h224c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16h-80v96l-32-21.3L256 96V0h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16z"
          ></path>
        </svg>
      ),
    },
    {
      heading: t('MAIN_ADV_TITLE_3'),
      description: t('MAIN_ADV_DESCRIPTION_3'),
      icon: <i className="icon-online-support" />,
    },
  ];
};

export function InfoSection() {
  const { t } = useTranslation('common');

  return (
    <div
      className="row justify-content-center align-items-center"
      css={{
        maxWidth: '560px',
        '@media (min-width: 992px)': { maxWidth: '1250px' },
        '@media (min-width: 1280px)': { maxWidth: '100%' },
      }}
    >
      <div className="col-12">
        <h2
          css={{
            textTransform: 'uppercase',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            fontSize: '3rem/1.1',
            fontWeight: '600',
            fontWeight: 'bold',
            letterSpacing: '.025em',
            marginBottom: '1.8rem',
          }}
        >
          {t('INFO_SECTION')}
        </h2>
      </div>

      <div className="col-12 col-md-9 my-3">
        <ul
          className="row"
          css={{
            verticalAlign: 'middle',
            lineHeight: 1.1,
            margin: 0,
            listStyleType: 'none',

            '& *': {
              verticalAlign: 'inherit',
            },

            '& li:not(:last-of-type)': {
              borderBottom: '1px solid #fff',
            },

            '@media (min-width: 992px)': {
              '& li:not(:last-of-type)': {
                borderBottom: 'none',
                borderRight: '1px solid #fff',
              },
            },
          }}
        >
          {infoSectionCardContent(t).map(({ icon, heading, description }) => (
            <li
              key={heading}
              className="col-12 col-lg-4 d-flex align-items-center justify-content-center"
              css={{ padding: '10px 15px' }}
            >
              <div
                css={{
                  flexBasis: '4.7rem',
                  fontSize: '4.7rem',
                  lineHeight: 1,
                  marginRight: '1.8rem',
                  '& > *': {
                    width: '4.7rem',
                    height: '4.7rem',
                    display: 'block',
                  },
                }}
              >
                {icon}
              </div>
              <div>
                <h6
                  className="m-0"
                  css={{
                    textTransform: 'uppercase',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                  }}
                >
                  {heading}
                </h6>
                <p
                  className="m-0"
                  css={{
                    fontSize: '1.5rem',
                    lineHeight: '1.6',
                    letterSpacing: '.01em',
                    color: '#839199',
                  }}
                >
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
