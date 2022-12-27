import React from 'react'
import './NewsCard.scss'

const NewsCard = () => {
  return (
    <>
        <div className="card news-card">
            <div className="card-body m-1 ">
                 <h5 className="card-title ">Latest News</h5>
                 <ul>
                        <li>
                         <h6>Corona returns</h6>  
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, suscipit.</p>
                        </li>
                 </ul>
            </div>
        </div>
    </>
  )
}

export default NewsCard