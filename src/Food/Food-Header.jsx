import React from 'react'

const Header = (props) => {
    
    const {search, onSearchClick,onInputChange } = props


    return (
        <div>

        <div className="jumbotron">
            <h1 className='text-center' >
                <i className='fa fa-book'></i>  Search Food  
            </h1>
            <div className="input-group w-50 mx-auto " >
                <input type="text" className="form-control" placeholder="Search Food" value={search} onChange={onInputChange} />
                <div className="input-group-append">
                    <button className="btn btn-danger" onClick={()=>onSearchClick()}> <i className='fa fa-search fa-lg'></i></button>
                </div>
            </div>
        </div>




        </div>

    )

}
export default Header