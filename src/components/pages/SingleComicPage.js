import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { getComic, clearError, process, setProcess } = useMarvelService();

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded).then(() => {setProcess('confirmed')});
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  useEffect(() => {
    updateComic();
    //eslint-disable-next-line
  }, [comicId]);

  return (
    <>
      <AppBanner />
      {setContent(process, View, comic)}
    </>
  );
};

const View = ({ data }) => {
  const { title, description, pageCount, thumbnail, language, price } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">Page count: {pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
