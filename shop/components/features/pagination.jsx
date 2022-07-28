import React from 'react';
import { useRouter } from 'next/router';

import ALink from '../common/ALink';

function Pagination({ totalPage }) {
  const query = useRouter().query;
  const page = query.page ? parseInt(query.page) : 1;
  let indexsToShow = [];

  for (let i = 0; i < Math.min(totalPage, 3); i++) {
    if (page < 4 || page > totalPage - 3) {
      if (page < 4) {
        indexsToShow[i] = i + 1;
      }

      if (totalPage > 4 && page > totalPage - 3) {
        indexsToShow[i] = totalPage - 2 + i;
      }
    } else {
      indexsToShow[i] = page - 1 + i;
    }
  }

  return (
    <>
      {totalPage > 1 && (
        <ul className="pagination toolbox-item">
          {page > 1 && (
            <li className="page-item">
              <ALink
                className="page-link page-link-btn"
                href={{ query: { ...query, page: page - 1 } }}
                scroll={false}
              >
                <i className="icon-angle-left"></i>
              </ALink>
            </li>
          )}

          {indexsToShow.map(item => (
            <li
              className={`page-item ${page === item ? 'active' : ''}`}
              key={`page-${item}`}
            >
              <ALink
                className="page-link"
                href={{ query: { ...query, page: item } }}
                scroll={false}
              >
                {item}
                {page === item && <span className="sr-only">(current)</span>}
              </ALink>
            </li>
          ))}

          {page < totalPage && (
            <li className="page-item">
              <ALink
                className="page-link page-link-btn"
                href={{ query: { ...query, page: page + 1 } }}
                scroll={false}
              >
                <i className="icon-angle-right"></i>
              </ALink>
            </li>
          )}
        </ul>
      )}
    </>
  );
}

export default React.memo(Pagination);
