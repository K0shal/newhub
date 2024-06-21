import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const navigate = useNavigate();
  const favoriteArticles = localStorage.getItem("favorite");
  const favorite = JSON.parse(favoriteArticles || {});

  const [localFavorite, setLocalFavorite] = useState(
    Object.values(favorite).map((article) => article)
  );
  return (
    <div className="favoritesContainer w-100 bg-[#0F172A] min-h-screen text-white px-5 py-10 flex flex-col gap-10 sm:p-10">
      <div className="breadCrumbs text-lg select-none">
        <span
          className="text-orange-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </span>{" "}
        &gt; <span>Favorites</span> &gt;
      </div>
      <div className="favoritesContent sm:p-5 flex flex-col gap-5 w-100">
        <h1 className="text-4xl">Your Favorites</h1>
        <div className="flex bg-[#0F172A] m-auto flex-wrap w-100 justify-center gap-5 content-center">
          {localFavorite.map((article, index) => {
            return (
              <div
                key={index}
                className="newsCard m-4 p-4 rounded-lg w-72 shrink-0 text-white flex flex-col gap-3"
              >
                <h1 className="text-xl font-bold mb-2 line-clamp-2">
                  {article.title}
                </h1>
                <img
                  src={article.urlToImage || "/assets/generic-news-img.jpeg"}
                  alt=""
                  className="w-30 mb-3"
                />
                <p className=" line-clamp-5">{article.description}</p>
                {/* Remove & Read Buttons*/}
                <div className="btns flex gap-2 justify-between align-end mt-auto">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate("/content?title=" + article.title);
                    }}
                  >
                    {" "}
                    Read Now
                  </button>
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      delete favorite[article.title];
                      localStorage.setItem(
                        "favorite",
                        JSON.stringify(favorite)
                      );
                      setLocalFavorite(
                        Object.values(favorite).map((article) => article)
                      );
                    }}
                  >
                    {" "}
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {localFavorite.length == 0 && <span>No Favorites Added.</span>}
      </div>
    </div>
  );
};

export default Favorite;
