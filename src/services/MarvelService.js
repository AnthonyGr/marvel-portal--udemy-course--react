import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, error, request } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=dae97b66d2439a8ab63d6fc9f354e60d';
  const _baseOffset = 150;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await this.getResoure(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharecter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharecter(res.data.results[0]);
  };

  const _transformCharecter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacter };
};

export default useMarvelService;
