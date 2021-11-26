import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChars();
  }

  marvelService = new MarvelService();

  onCharsLoaded = (chars) => {
    this.setState({ chars, loading: false });
  };

  onError = () => {
    this.setState({ error: true, lodaing: false });
  };

  updateChars = () => {
    this.marvelService.getAllCharacters().then(this.onCharsLoaded).catch(this.onError);
  };

  renderItems = (chars) => {
    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return chars.map((char) => (
      <li className="char__item char__item_selected" key={char.id} onClick={() => this.props.onCharSelected(char.id)}>
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
    const { loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || spinner) ? this.renderItems(this.state.chars) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        <ul className="char__grid">{content}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
