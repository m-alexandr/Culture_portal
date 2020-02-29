import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { AuthorCard } from './components/author-card';
import { Searchbar } from './components/searchbar';
import { Parallax } from '@core/parallax';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorsArray: [],
      searchOption: 'Name',
      authorsList: null
    }
    this.onSearchOptionChange = this.onSearchOptionChange.bind(this);
    this.onAuthorsSearchChange = this.onAuthorsSearchChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { t } = props;
    const authorsArray = t('authors:authors');
    if (authorsArray !== state.authorsArray) {
      return { authorsArray: authorsArray }
    }
    return null;
  }

  onSearchOptionChange(value) {
    this.setState({ searchOption: value })
  }

  onAuthorsSearchChange(arr) {
    this.setState({ authorsList: arr })
  }

  render() {
    const authors = this.state.authorsList || this.state.authorsArray;
    return (
      <div>
        <Parallax />
        <Searchbar
          authorsList={this.state.authorsArray}
          searchOption={this.state.searchOption}
          searchOptions={[
            { value: 'spawnPoint', label: this.props.t('controls:city') },
            { value: 'name', label: this.props.t('controls:name') },
          ]}
          onSearchOptionChange={this.onSearchOptionChange}
          onAuthorsSearchChange={this.onAuthorsSearchChange}
          label={this.props.t('controls:searchBy')}
        />
        <ul>{
          authors.map(author =>
            <li key={author.id} >
              <Link to={`/author/${author.id}`} >
                <AuthorCard
                  photo={author.selfie}
                  city={author.spawnPoint}
                  name={author.name}
                />
              </Link>
            </li>)
        }
        </ul>
      </div>
    )
  }
}

export default withTranslation()(SearchPage);