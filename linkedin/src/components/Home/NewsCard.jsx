import React, { useEffect, useState } from 'react'
import './NewsCard.scss'

const NewsCard = () => {

  const [news, setNews] = useState([]);
  useEffect(() => {
    const URL = 'https://newsapi.org/v2/top-headlines?category=science&apiKey=723a196e35d644539931d470e9511203';
    fetch(URL).then((response) => response.json()).then((data) => {
      setNews(data.articles);
    })
  }, [news]);

  return (
    <>
        <div className="card news-card">
            <div className="card-body m-1 ">
                 <h5 className="card-title ">Latest News</h5>
                 <ul>
                      {
                        news.slice(0, 5).map((object) => (
                          <li>
                              <h6 className='H6'><a className='UrlLink' href={object.url} target="_blank">{object.title.slice(0, 40)}</a></h6>  
                              <p className='P'>{object.publishedAt.slice(0, 10)}</p>
                          </li>
                        ))
                      }
                 </ul>
            </div>
        </div>
    </>
  )
}

export default NewsCard