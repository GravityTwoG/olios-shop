import React from 'react';
import { connect } from 'react-redux';
import {
  updateSearchWord,
  resetSearchWord,
  requestSearchedProducts,
} from '../../src/store/search/actions';

import SearchPage from './SearchPage';

class SearchPageContainer extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.searchWord !== prevProps.searchWord) {
      this.props.requestSearchedProducts(this.props.searchWord);
    }
  }

  render() {
    return (
      <SearchPage
        results={this.props.results}
        searchWord={this.props.searchWord}
        updateSearchWord={this.props.updateSearchWord}
        resetSearchWord={this.props.resetSearchWord}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchWord: state.search.searchWord,
    results: state.search.results,
  };
};

const mapDispatchToProps = {
  updateSearchWord,
  resetSearchWord,
  requestSearchedProducts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageContainer);
