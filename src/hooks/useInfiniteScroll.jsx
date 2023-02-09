import React, { useState, useEffect, useRef } from "react";

const useInfiniteScroll = (url) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${url}${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.nodes.length) {
          setHasMore(false);
        }
        setArticles([...articles, ...data.nodes]);
        setLoading(false);
      });
  }, [page, url, articles]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage(page + 1);
      }
    });
    return () => {
      observerRef.current.disconnect();
    };
  }, [loading, page, hasMore]);

  const observerTargetRef = useRef(null);

  useEffect(() => {
    if (observerRef.current && observerTargetRef.current) {
      observerRef.current.observe(observerTargetRef.current);
    }
  }, [observerRef, observerTargetRef]);

  return { articles, loading, hasMore, observerTargetRef };
};

export default useInfiniteScroll