import { useEffect, useState } from "react";
const GIPHY_KEY = 'nGDGst2mrFtIj6Z6vNV9vUznnZNkDa9O';
// const APIKEY = process.env.GIPHY_KEY
// const APIKEY = GIPHY_KEY;
// console.log(APIKEY);
const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      console.log(keyword);
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();
      console.log(data);
      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;