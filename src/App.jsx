import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Banner from "./components/Banner.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieSearch from "./components/MovieSearch.jsx";
import { MovieProvider } from "./context/MovieProvider";

function App() {
  // useState để quản lý Movie List
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  // useState để quản lý phần nút search
  const [movieSearch, setMovieSearch] = useState([]);
  const handleSearch = async (searchValue) => {
    // sau khi reset hàm phải set 1 array rỗng
    setMovieSearch([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      // tạo API 1 cho các phim popular
      const url1 =
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";
      // tạo API 2 cho các phim top rated
      const url2 =
        "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1";
      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fetchMovie();
  }, []);

  return (
    <>
      <MovieProvider>
        <main className="bg-black pb-10">
          <Header onSearch={handleSearch} />
          <Banner />
          {/*truyền toán tử 3 ngôi vào để khi người dùng bấm search thì 2 component này sẽ bị remove và thay vào bằng kết quả search*/}
          {movieSearch.length > 0 ? (
            <MovieSearch title={"kết quả tìm kiếm"} data={movieSearch} />
          ) : (
            <>
              <MovieList title={"Phim Hot"} data={movie} />
              <MovieList title={"Phim Đề Cử"} data={movieRate} />
            </>
          )}
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
