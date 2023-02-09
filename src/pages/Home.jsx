import React from 'react';
import DateField from '../components/Date';
import { BASE_URL } from '../constant/Api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './style.css'
const Home = () => {
  const { articles, loading, hasMore, observerTargetRef } = useInfiniteScroll(BASE_URL);

  return (
    <>
      {articles.map((article) => (
        <div key={article.path} className='outer-conatiner'>

          <img src={article.node.field_photo_image_section} alt={article.title}  />
        <div>  
         <h3>{article.node.title}</h3>
        
         <DateField unixTime={article?.node?.last_update}/>
        </div>
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {!loading && !hasMore && <div>No more articles to display</div>}
      <div ref={observerTargetRef} />
    </>
  );
};

export default Home;
