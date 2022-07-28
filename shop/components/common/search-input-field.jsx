import useTranslation from 'next-translate/useTranslation';

export function SearchInputField() {
  const { t } = useTranslation('common');

  return (
    <form
      action=""
      method=""
      onSubmit={e => e.preventDefault()}
      css={{
        width: '80%',
        position: 'relative',
        margin: 0,
        '@media (min-width: 992px)': { width: '75%' },
        '@media (min-width: 1200px)': { width: '65%' },
      }}
    >
      <input
        autoComplete="off"
        type="search"
        name="search"
        id="search"
        placeholder={t('SEARCH')}
        data-container="body"
        data-toggle="popover"
        data-placement="bottom"
        data-content="Estas buscando en  todas las categorias"
        css={{
          display: 'block',
          width: '100%',
          height: '38px',
          border: 'none',
          borderRadius: 1000,
          padding: '4px 64px 4px 22px',
          verticalAlign: 'middle',
          font: "400 1.3rem/1 'Open Sans',sans-serif",
          backgroundColor: '#efefef',
          color: '#8d8d8d',
          transition: '.25s ease-in',
          boxShadow: '0 0 0 3px transparent',

          '&:focus': {
            outline: 0,
            backgroundColor: '#fff',
            boxShadow: '0 0 0 3px rgba(210, 210, 210, 0.3)',
          },
        }}
      />

      <button
        className="btn"
        css={{
          position: 'absolute',
          right: -1,
          top: -1,
          bottom: -1,
          padding: '0 20px',
          borderRadius: '0 1000px 1000px 0',
          backgroundColor: 'rgba(51, 97, 136, 0.3)',
          color: '#333',
          fontWeight: 'bold',
          lineHeight: 1,
          verticalAlign: 'middle',
          transition: '.25s ease-in',
          userSelect: 'none',
          boxShadow: '0 0 0 2px transparent',

          '&:hover, &:focus': {
            color: '#fff',
            backgroundColor: 'rgba(51, 97, 136)',
            boxShadow: '0 0 0 2px rgba(210, 210, 210, 0.3)',
          },
        }}
        type="submit"
      >
        <i className="icon-magnifier"></i>
      </button>
    </form>
  );
}
