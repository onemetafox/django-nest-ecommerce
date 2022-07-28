import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';

export default function ALink({ children, className, style, href, ...props }) {
  const { pathname, locale, locales, defaultLocale } = useRouter();
  const store = useStore();
  const [userPrefs, setUserPrefs] = useState(null);
  useState(() => {
    !userPrefs && setUserPrefs(store.getState().user);
  }, [store]);

  if (typeof href === 'object') {
    if (!href.pathname) {
      href.pathname = pathname;
    }

    if (href.query && href.query.grid) {
      href.pathname.replace('[grid]', href.query.grid);
    }
  }

  return (
    <>
      {href !== '#' ? (
        <Link
          href={href}
          {...props}
          locale={
            userPrefs?.locale ||
            locales.find(lang => lang === userPrefs?.locale || false) ||
            defaultLocale
          }
        >
          <a
            className={className}
            style={style}
            target={props.target ? props.target : '_self'}
          >
            {children}
          </a>
        </Link>
      ) : (
        <a className={className} href="#" onClick={e => e.preventDefault()}>
          {children}
        </a>
      )}
    </>
  );
}
