import Link from 'next/link';

export function TopHeaderLink({ children, href }) {
  return (
    <Link passHref href={href}>
      <a
        css={{
          'header ul &': {
            color: '#ddd',
            transition: '.3s ease-in',
            textDecorationLine: 'underline',
            textDecorationColor: 'transparent',

            '&:hover, &:focus, &:active': {
              color: '#fff',
              textDecorationColor: 'currentcolor',
            },
          },
        }}
      >
        {children}
      </a>
    </Link>
  );
}
