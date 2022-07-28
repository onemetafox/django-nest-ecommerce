import Link from 'next/link';

export function BannerCard({ children, href, title }) {
  return (
    <Link href={href} passHref>
      <a
        css={{
          display: 'block',
          width: '42vw',
          paddingTop: '83.33333333%',
          position: 'relative',
          transition: 'boxShadow 0.5s ease-in-out',

          '@media (min-width: 565px)': { width: '44vw' },
          '@media (min-width: 700px)': { width: '29.5vw' },
          '@media (min-width: 1200px)': { width: '20vw' },

          '& > figure > span': {
            transition: 'transform 0.5s ease-in-out',
          },

          '&:hover': {
            '& > figure > span': {
              transform: 'scale(1.1)',
            },
          },

          '&:focus': {
            boxShadow: '0 0 0 2px #fff, 0 0 0 4px #33618877',
          },

          '&:focus:not(:focus-visible)': {
            boxShadow: 'none',
          },
        }}
      >
        <figure
          css={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        >
          {children}
          <figcaption
            css={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              textAlign: 'center',
              textTransform: 'uppercase',
              padding: 5,
              fontSize: 11,
              color: '#4a505e',
              zIndex: 10,
              pointerEvents: 'none',
              backgroundColor: 'rgba(255, 255, 255, .8)',

              '@media (min-width: 565px)': { fontSize: 13 },
            }}
          >
            {title}
          </figcaption>
        </figure>
      </a>
    </Link>
  );
}
