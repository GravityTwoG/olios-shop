import React from 'react';

import SearchPage from '../../features/Product/components/organisms/SearchPage';

export default class SearchPageContainer extends React.Component {
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
