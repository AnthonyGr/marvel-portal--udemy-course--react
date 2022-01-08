import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const setContent = (process, Component, newItemsLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>;
    case 'loading':
      return newItemsLoading ? <Component/> : <Spinner />;
    case 'confirmed':
      return <Component/>;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
}

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(200);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { getAllComics, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    //eslint-disable-next-line
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
    getAllComics(offset).then(onComicsLoaded).then(() => setProcess('confirmed'));
  };

  const renderComics = () => {
    const items = comics.map((item, i) => (
      <li className="comics__item" tabIndex={0} key={i}>
        <Link to={`/comics/${item.id}`}>
          <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price ? item.price : 'N/A'}$</div>
        </Link>
      </li>
    ));
    return (
      <ul className="comics__grid">
        {items}
      </ul>
    )
  };


  return (
    <div className="comics__list">
       {setContent(process, () => renderComics(comics), newItemsLoading)}
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
