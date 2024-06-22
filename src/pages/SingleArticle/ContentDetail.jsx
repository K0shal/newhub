import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ContentDetail = () => {
  //useSelector to get articles from redux store
  const data = useSelector((state) => state.articles);

  //articles from redux store
  const articles = data?.articles;

  //useLocation to get query parameter
  let { search } = useLocation();

  const [content, setContent] = useState("");

  //get query parameter
  const query = new URLSearchParams(search);

  //get title from query parameter
  const title = query.get("title");

  const navigate = useNavigate();

  //get url of the article with title= title  from query parameter
  const url = articles[title]?.url;

  //get article from articles with title= title from query parameter

  let article = articles && articles[title];
  if (article) localStorage.setItem("article", JSON.stringify(article));
  else article = JSON.parse(localStorage.getItem("article"));

  //fetch content from url
  useEffect(() => {
    axios
      .get("http://localhost:8000/content" + "?url=" + article?.url)
      .then((res) => setContent(res.data.data))
      .catch((err) => setContent(null));
  }, [url]);

  return (
    <div className="singleArticleContainer bg-[#0F172A] w-100 min-h-screen text-white p-10 flex flex-col gap-10">
      <div className="breadCrumbs text-lg select-none">
        <span
          className="text-orange-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </span>{" "}
        &gt; <span>Article</span> &gt;
      </div>
      <div className="articleData flex flex-col gap-10 sm:p-10">
        <h2 className="text-4xl">{article.title}</h2>
        <div className="articleMetaData flex flex-col gap-5 justify-between items-start sm:flex-row sm:items-center">
          <div className="info flex flex-col gap-3">
            <span className="text-gray-400 text-sm">
              Published On: {article?.publishedAt?.toString().slice(0, 10)}
            </span>
            <span className="text-gray-400 text-sm">
              Published By: {article?.author}
            </span>
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              window.open(article?.url, "_blank");
            }}
          >
            Read Original
          </button>
        </div>

        <img src={article?.urlToImage} alt="" />
        <h4>{article?.description}</h4>
        <p className="text-xl">{content}</p>
        {content == null && (
          <p className="text-orange-500">
            "Couldn't fetch article. Try, if original source is available."
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentDetail;
// content == null ? <PageNotFound /> :  //hta diya ye maine lagana ho laga liyo
