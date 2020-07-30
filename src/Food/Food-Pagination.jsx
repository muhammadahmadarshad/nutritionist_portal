import React from 'react';
import Pagination from 'react-js-pagination';


const Paginate = ({food,match,history}) => {

    let {query,page}=match.params
    let {push}=history



    function setPage(number){
        push(`/search_food/${query}/${number}`)
    }

  return (
    <div className='d-flex justify-content-center'>
      <Pagination
        onChange={setPage}
        totalItemsCount={parseInt(food.total_results)}
        pageRangeDisplayed={10}
        activePage={parseInt(page)}
        itemsCountPerPage={parseInt(food.max_results)}       
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