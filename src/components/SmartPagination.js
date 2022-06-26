import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'

export const SmartPagination = ({ callbackChangePage, currentPage, totalPages }) => {
  let pagination = []

  if (currentPage > 3) {
    pagination.push(
      <CPaginationItem 
        disabled
      >
        ...
      </CPaginationItem>
    )
  }
  for (
      let index = currentPage > 3 ? currentPage-2 : 0;
      index <= (totalPages-currentPage > 3 ? currentPage+3 : totalPages-1);
      index++) {
    pagination.push(
      <CPaginationItem 
        onClick={() => callbackChangePage(index)}
        active={currentPage === index}
      >
        {index+1}
      </CPaginationItem>
    )
  }
  if (totalPages-1 - currentPage > 3) {
    pagination.push(
      <CPaginationItem 
        disabled
      >
        ...
      </CPaginationItem>
    )
  }
  
  return (
    <CPagination align="center" aria-label="Page navigation">
    <CPaginationItem 
        aria-label="Previous"
        onClick={() => callbackChangePage(currentPage-1)}
        disabled={currentPage === 0}
    >
      <span aria-hidden="true">&lt;</span>
    </CPaginationItem>
    {
      pagination
    }
    <CPaginationItem
        aria-label="Next"
        onClick={() => callbackChangePage(currentPage+1)}
        disabled={currentPage === totalPages-1}
    >
      <span aria-hidden="true">&gt;</span>
    </CPaginationItem>
  </CPagination>
  )
}
