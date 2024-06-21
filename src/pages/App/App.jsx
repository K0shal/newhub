import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useGetArticlesQuery } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import "./App.css";

//category array
const categoryArray = [
  { id: 1, name: "latest" },
  { id: 2, name: "general" },
  { id: 3, name: "business" },
  { id: 4, name: "entertainment" },
  { id: 5, name: "health" },
  { id: 6, name: "science" },
  { id: 7, name: "sports" },
  { id: 8, name: "technology" },
];

//main  index page
function App() {
  //query parameter for fetching articles
  const [query, setQuery] = useState("latest");

  //redux dispatch
  const dispatch = useDispatch();

  //get favorite articles from local storage
  const favoriteArticles = JSON.parse(localStorage.getItem("favorite") || "{}");

  //navigation used  to navigate to favorite page and content page
  const navigate = useNavigate();

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);

  //page size state
  const [pageSize, setPageSize] = useState(8);

  //pagination start state
  const [startPagination, setStartPagination] = useState(0);

  //local favorite state
  const [localFavorite, setLocalFavorite] = useState({});

  //total pages state
  const [totalPages, setTotalPages] = useState(0);

  //data fetching from api
  const { data, error, isSuccess } = useGetArticlesQuery({
    query: query,
    page: currentPage,
  });

  //if error navigate to something went wrong page
  if (error) {
    navigate("/something-went-wrong");
  }

  useEffect(() => {
    if (data) {
      dispatch({ type: "articles/addArticles", payload: data.articles });
    }
  }, [data]);

  function searchResults(e) {
    e.preventDefault();
    const searchValue = e.target[0].value;
    setQuery(searchValue);
  }

  return (
    <>
      {/* header */}
      <div className="bg-[#0F172A] flex justify-between sm:p-10 select-none items-center gap-10 px-5 py-10 flex-wrap">
        <div className="logo text-orange-500  text-xl">HeadlineHub</div>
        <span className="bg-[#0F172A] min-w-[300px] basis-7/12  ">
          <form onSubmit={searchResults}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search...."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Search
              </button>
            </div>
          </form>
        </span>

        <div className="rightCol flex flex-col gap-2 sm:items-center sm:gap-10 sm:flex-row ">
          <select
            className="select p-2 bg-[#0F172A] text-white border border-white outline-none rounded"
            name="category"
            id="category"
            onChange={(e) => {
              if (e.target.value) setQuery(e.target.value);
            }}
          >
            <option value={null} defaultChecked={true}>
              Select Category
            </option>
            {categoryArray.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <a
            className=" hover:bg-gray-700 text-white  py-2 px-4 rounded bg-gray-800"
            onClick={() => navigate("/favorite")}
          >
            Favorites
          </a>
        </div>
      </div>

      {/* news cards */}
      <div className="flex bg-[#0F172A] m-auto flex-wrap w-100 justify-center gap-5 content-center min-h-screen">
        {isSuccess ? (
          data.articles.map((article, index) => {
            let isFavorite = false;

            if (favoriteArticles[article.title]) isFavorite = true;
            return (
              <div
                key={index}
                className="newsCard m-4 p-4 rounded-lg w-72 shrink-0 text-white flex flex-col gap-3" //bg-gray-500
              >
                <h1 className="text-xl font-bold line-clamp-2">
                  {article.title}
                </h1>
                <img
                  src={article.urlToImage || "/assets/generic-news-img.jpeg"}
                  alt=""
                  className="w-30 "
                />
                <p className=" line-clamp-5">{article.description}</p>
                {/* readmore button */}
                <div className="newsCardFooter flex justify-between items-center align-end mt-auto">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate("/content?title=" + article.title);
                    }}
                  >
                    {" "}
                    Read More
                  </button>
                  <div className="fav bg-gray-100 w-10 h-10 flex justify-center items-center rounded">
                    {isFavorite ? (
                      <img
                        src="/assets/liked.svg"
                        alt=""
                        onClick={() => {
                          delete favoriteArticles[article.title];
                          localStorage.setItem(
                            "favorite",
                            JSON.stringify(favoriteArticles)
                          );
                          setLocalFavorite(favoriteArticles);
                        }}
                      />
                    ) : (
                      <img
                        src="/assets/like.svg"
                        alt=""
                        onClick={() => {
                          favoriteArticles[article.title] = article;
                          localStorage.setItem(
                            "favorite",
                            JSON.stringify(favoriteArticles)
                          );
                          setLocalFavorite(favoriteArticles);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <ReactLoading
            className="absolute top-[50vh] left-[50vw]"
            type={"balls"}
            color={"white"}
            height={"100px"}
            width={"100px"}
          />
        )}
      </div>

      {/* pagination */}
      <div className="flex flex-row justify-center content-center bg-[#0F172A] text-white p-10 select-none">
        <div className="ml-3">
          <div
            onClick={() => {
              //if current page is 1 return
              if (currentPage <= 1) return;
          
              //if current page is greater than start pagination + 3 then decrease start pagination by 1
              if (currentPage < startPagination + 3 && startPagination > 0) {
           
                setStartPagination((prev1) => prev1 - 1);
              }
              //decrease current page by 1
              setCurrentPage((prev) => {
                return prev - 1;
              });
            }}
            className="hover:bg-gray-700 hover:text-white  cursor-pointer p-5 w-10 h-10 rounded-full flex justify-center items-center"
          >
            &laquo;
          </div>
        </div>
        {/* map through 5 pages */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            onClick={() => {
              //if current page is greater than total pages return
              if (currentPage >= data.totalResults / pageSize) return;
              setCurrentPage(index + 1);
            }}
            key={index}
            className={
              "hover:bg-gray-800 hover:text-white  cursor-pointer p-5 w-10 h-10 flex justify-center items-center rounded-full" +
              (currentPage === index + startPagination + 1
                ? " bg-gray-700 rounded-full hover:bg-gray-700"
                : "")
            }
          >
            <span>{index + startPagination + 1}</span>
          </div>
        ))}
        <div
          className="hover:bg-gray-700 hover:text-white  cursor-pointer p-3 w-10 h-10 flex justify-center items-center rounded-full"
          onClick={() => {
            //if current page is greater than total pages return
            if (currentPage === totalPages) return;
            //if current page is greater than start pagination + 3 then increase start pagination by 1
            if (currentPage >= startPagination + 3) {
              setStartPagination((prev1) => prev1 + 1);
            }
            //increase current page by 1
            setCurrentPage((prev) => {
              return prev + 1;
            });
          }}
        >
          &raquo;
        </div>
      </div>
    </>
  );
}

export default App;
