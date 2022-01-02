import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(200);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onComicsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }

    setComics((comics) => [...comics, ...newComics]);
    setNewItemsLoading((newItemsLoading) => false);
    setOffset((offset) => offset + 8);
    setComicsEnded((comicsEnded) => ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllComics(offset).then(onComicsLoaded);
  };

  const renderComics = () => {
    return comics.map((item, i) => (
      <li className="comics__item" tabIndex={0} key={i}>
        <Link to={`/comics/${item.id}`}>
          <img src={item.thumbnail} alt={item.name} className="comics__item-img" />
          <div className="comics__item-name">{item.name}</div>
          <div className="comics__item-price">{item.price ? item.price : 'N/A'}$</div>
        </Link>
      </li>
    ));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const items = renderComics(comics);

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      <ul className="comics__grid">{items}</ul>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        style={{ display: comicsEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
