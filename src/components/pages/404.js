import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
  return (
    <div>
      <Helmet>
        <meta name="description" content="Error 404 - page not found" />
        <title>404 Page Not Found</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>404 - Page Not Found</p>
      <Link
        style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px' }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
