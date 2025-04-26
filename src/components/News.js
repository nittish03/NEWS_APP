import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

function News(props) {
  const [articles, setArticles] = useState([]);
  const loggedIn = true;

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  }

  useEffect(() => {
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  return (
    !loggedIn?
    <>
  <h1 style={{fontSize:"25vh",backgroundColor:"yellow"}} className="text-center" >LOG IN TO ACCESS</h1>
  </>:
       <>
    <div className="news-container">
      <h1 className="news-heading">News Daily - Top {props.category} Headlines</h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="news-grid">
          {articles.map((element) => (
            <div className="news-item" key={element.url}>
              <Newsitem
                author={element.author}
                title={element.title ? element.title.slice(0, 24) + "..." : ""}
                description={element.description ? element.description.slice(0, 60) + "..." : ""}
                source={element.source.name}
                newsUrl={element.url}
                imageUrl={element.urlToImage}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
    </>
    
  );
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
}

export default News;