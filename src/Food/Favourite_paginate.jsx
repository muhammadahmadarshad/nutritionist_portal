import React from 'react';
import Pagination from 'react-js-pagination';

const Paginate = ({activePage,total_results,history}) => {

  const {push}=history
  



  function setPage(number){

      push(`/my_foods/${number}`)

  }



  return (
    <div className='d-flex justify-content-center'>
      <Pagination
      
        activePage={parseInt(activePage)}
        itemCountPerPage={2} 
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