import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleCharPage.scss';

function SingleCharPage() {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  useEffect(() => {
    updateChar();
  }, [charId]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
    <div className="single-char">
      <Helmet>
        <meta name="description" content={`${char.name} personal page`} />
        <title>{char.name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-char__char-img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
      <Link to="/" className="single-char__main">
        Back to main page
      </Link>
    </div>
  );
};

export default SingleCharPage;
