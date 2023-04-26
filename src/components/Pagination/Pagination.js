import React, { useState } from 'react';
import { Button } from '@mui/material';
import style from './style.module.css';

export function Pagination({ itemsPerPage, data, renderItem }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNeighbours = 2;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  function range(from, to) {
    const range = [];

    for (let i = from; i <= to; i++) {
      range.push(i);
    }

    return range;
  }

  function getPageNumbers() {
    const totalNumbers = pageNeighbours * 2 + 1;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = ['LEFT', ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, 'RIGHT'];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = ['LEFT', ...pages, 'RIGHT'];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  function handleClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const pageNumbers = getPageNumbers();

  return (
    <div>
      {currentItems.map((item, index) => (
        <p key={index}>{renderItem(item)}</p>
      ))}
      <div className={style.button}>
        {pageNumbers.map((page, index) => {
          if (page === 'LEFT') {
            return (
              <Button
                shape="rounded"
                variant="contained"
                key={index}
                onClick={() =>
                  handleClick(currentPage - pageNeighbours * 2 - 1)
                }
                color="error"
              >
                {'<<'}
              </Button>
            );
          }

          if (page === 'RIGHT') {
            return (
              <Button
                shape="rounded"
                variant="contained"
                key={index}
                onClick={() =>
                  handleClick(currentPage + pageNeighbours * 2 + 1)
                }
                color="error"
              >
                {'>>'}
              </Button>
            );
          }

          return (
            <Button
              shape="rounded"
              variant={page === currentPage ? 'contained' : 'outlined'}
              col
              key={index}
              onClick={() => handleClick(page)}
              color="error"
            >
              {page}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
