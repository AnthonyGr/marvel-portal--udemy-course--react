import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [offset, setOffset] = useState(850);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  //like componentDidMount
  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newChars]);
    setNewItemsLoading((newItemsLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset).then(onCharsLoaded);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  const renderItems = (chars) => {
    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return chars.map((char, i) => (
      <li
        className="char__item"
        tabIndex={0}
        key={char.id}
        ref={(el) => (itemRefs.current[i] = el)}
        onClick={() => {
          props.onCharSelected(char.id);
          focusOnItem(i);
        }}
        onKeyPress={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            props.onCharSelected(char.id);
            focusOnItem(i);
          }
        }}
      >
        <img
          src={char.thumbnail}
          alt="abyss"
          style={char.thumbnail === imageNotFound ? { objectFit: 'unset ' } : { objectFit: 'cover' }}
        />
        <div className="char__name">{char.name}</div>
      </li>
    ));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const items = renderItems(chars);

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      <ul className="char__grid">{items}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
