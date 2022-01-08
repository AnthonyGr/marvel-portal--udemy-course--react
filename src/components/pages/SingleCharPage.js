import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleCharPage.scss';

function SingleCharPage() {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded).then(() => {setProcess('confirmed')});
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  useEffect(() => {
    updateChar();
  }, [charId]);

  return (
    <>
      <AppBanner />
      {setContent(process, View, char)}
    </>
  );
}

const View = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-char">
      <Helmet>
        <meta name="description" content={`${name} personal page`} />
        <title>{name}</title>
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
