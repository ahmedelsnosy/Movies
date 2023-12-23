import React from 'react'
// import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from 'react-paginate';

export default function PagenationPeople({ getPagePeople }) {
    let handlePageClick = (data) => {
        let number =data.selected+1
        getPagePeople(number)
        

    }
    
    const pageCount = 500;
    return <>
    
        <ReactPaginate containerClassName={`pagination justify-content-center p-3`}
            pageClassName={`page-item`}
            pageLinkClassName={`page-link`}
            breakLabel="..."
            nextLabel=">>>"
            onPageChange={handlePageClick}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<<<"
            renderOnZeroPageCount={null}
            previousClassName={`page-item`}
            nextClassName={`page-item`}
            previousLinkClassName={`page-link`}
            nextLinkClassName={`page-link`}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            activeClassName='active'
        />

    
    </>
}
