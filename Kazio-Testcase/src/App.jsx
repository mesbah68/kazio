import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './components/Header';
import useDebounce from './hooks/useDebounce'
import './App.css';
import GifCard from "./components/GifCard";
import SearchInput from "./components/SearchInput";

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState([]);

  const debouncedSearchValue = useDebounce(searchValue, 600);


  const handleChangeSearchValue = useCallback((value) => {
    setSearchValue(value);
  },[setSearchValue])

  useEffect(() => {
    if (debouncedSearchValue) {
      handleSubmit();
    }
  },[debouncedSearchValue])

  const handleSubmit = useCallback( async () => {
    try {
      console.log(debouncedSearchValue);
      const response = await axios({
        url: "https://api.giphy.com/v1/gifs/search",
        params: {
          api_key: "KsJiJp6GCFs5t6hiXIB4OFgwc7UjyBCg",
          limit: 10,
          q: debouncedSearchValue
        },
        method: "GET",
      })
      console.log('response ======>', response.data);
      setGifs(response.data.data);
    } catch(e) {
      console.log(e);
      alert('Ops! something wrong happened');
    }
  },[debouncedSearchValue,setGifs])
  console.log(gifs);
  return (
    <div className="app h-full">
      <Header />

      <div className="flex w-full flex flex-col items-center justify-center	mt-20">
        <SearchInput handleSearch={handleSubmit} searchValue={searchValue} handleChangeSearch={handleChangeSearchValue} />

        <div className="mt-4">
          {gifs.map((gif,index) => (
              <GifCard key={gif.id} title={gif.title} url={gif.images.original.url} username={gif.username} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
