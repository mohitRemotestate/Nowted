import React from 'react'
import archived from '../../assets/archived.svg'
import star from '../../assets/star.svg'
import trash from '../../assets/trash.svg'


function More({}){


    return(
        <div>
    <div className='px-5 font-semibold text-white h-6.5 pb-2'>More</div>
    <ul>
          <li key="1" className='list' ><img src={star} /> Favourites</li>
          <li key="2" className='list' ><img src={trash} /> Trash</li>
          <li key="3" className='list' ><img src={archived} />Archived Notes</li>
    </ul>
    </div>
    )
}

export default More