class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=dae97b66d2439a8ab63d6fc9f354e60d';

  getResoure = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResoure(`${this._apiBase}characters?limit=9&offset=50&${this._apiKey}`);
    return res.data.results.map(this._transformCharecter);
  };

  getCharacter = async (id) => {
    const res = await this.getResoure(`${this._apiBase}characters/${id}?&${this._apiKey}`);
    return this._transformCharecter(res.data.results[0]);
  };

  _transformCharecter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
