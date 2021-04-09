import React from 'react';

// reactstrap components
import {Container} from 'reactstrap';

// core components
import Navigation from 'components/Navigation/Navigation.js';
import WelcomeHeader from 'components/Headers/WelcomeHeader.js';
import LibraryHeader from 'components/Headers/LibraryHeader.js';
import SearchHeader from 'components/Headers/SearchHeader.js';
import Footer from 'components/Footer/Footer.js';
import Pagination from 'components/Pagination/Pagination.js';
import Books from 'components/Books.js';

function LibraryPage() {
  const [searchData, setSearchData] = React.useState([]);
  const [currentSearchData, setCurrentSearchData] = React.useState();

  const [searchState, setSearchState] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageSelected, setPage] = React.useState(1);

  React.useEffect(() => {
    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
    };
  });

  React.useEffect(() => {
    const currentBooks = [];
    searchData.forEach((book, key) => {
      if (
        parseInt(key) >= (pageSelected - 1) * 10 &&
        parseInt(key) <= pageSelected * 10
      ) {
        currentBooks.push(book);
      }
    });
    setCurrentSearchData(currentBooks);
  }, [searchData, pageSelected]);

  return (
    <>
      <Navigation />
      <div className="wrapper">
        {!localStorage.getItem('loggedin') && <WelcomeHeader />}
        {localStorage.getItem('loggedin') && !searchState && (
          <LibraryHeader
            setSearchData={setSearchData}
            setSearchState={setSearchState}
            setPageCount={setPageCount}
          />
        )}

        {localStorage.getItem('loggedin') && searchState && (
          <SearchHeader bookCount={searchData.length} />
        )}

        {searchState && (
          <div className="section section-about section-story-overview">
            <Books data={currentSearchData} pageSelected={pageSelected} />
          </div>
        )}
        <Container>
          {searchState && (
            <Pagination
              currentPage={pageSelected}
              pageSetter={setPage}
              pageCount={pageCount}
            />
          )}
        </Container>
        <div className="main"></div>
        <Footer bgColor="black" />
      </div>
    </>
  );
}

export default LibraryPage;
