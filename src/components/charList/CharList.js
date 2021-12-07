import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    newItemsLoading: true,
    error: false,
    offset: 600,
    charEnded: false,
  };

  componentDidMount() {
    this.onCharListLoading();
    this.onRequest();
  }

  marvelService = new MarvelService();

  onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    this.setState(({ offset, chars }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset).then(this.onCharsLoaded).catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemsLoading: true });
  };

  onError = () => {
    this.setState({ error: true, lodaing: false });
  };

  renderItems = (chars) => {
    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return chars.map((char) => (
      <li className="char__item" key={char.id} onClick={() => this.props.onCharSelected(char.id)}>
        <img
          src={char.thumbnail}
          alt="abyss"
          style={char.thumbnail === imageNotFound ? { objectFit: 'unset ' } : { objectFit: 'cover' }}
        />
        <div className="char__name">{char.name}</div>
      </li>
    ));
  };

  render() {
    const { loading, error, offset, newItemsLoading, charEnded } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || spinner) ? this.renderItems(this.state.chars) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        <ul className="char__grid">{content}</ul>
        <button
          className="button button__main button__long"
          disabled={newItemsLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
