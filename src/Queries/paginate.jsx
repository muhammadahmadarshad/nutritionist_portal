import React from 'react';
import Pagination from 'react-js-pagination';

const Paginate = ({total_results,history,match}) => {

  const {push}=history
  let{page}= match.params



  function setPage(number){

      push(`/queries/${number}`)

  }



  return (
    <div className='d-flex justify-content-center'>
      <Pagination
      
        activePage={parseInt(page)}
        itemCountPerPage={12} 
        pageRangeDisplayed={5}
        totalItemsCount={parseInt(total_results)}
        onChange={setPage}
        itemClass='page-item'
        linkClass='page-link'
        nextPageText='Next'
        prevPageText='Prev'
        lastPageText='Last'
        firstPageText='First'
        >
        


      </Pagination>
    </div>
  );
}

export default Paginate;