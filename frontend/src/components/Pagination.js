import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) {
    return null;
  }
  return (
    <nav>
      <ul className='pagination'>
        {[...Array(pages).keys()].map((x) => {
          return (
            <li
              key={x + 1}
              className={`page-item ${page === x + 1 && 'active'}`}
            >
              <Link
                className='page-link'
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
