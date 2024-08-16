import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'W062UHJCUQ',
  'db8c2c7af661b74ab1f6ad323c66c0ff'
);

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">Thrifty!</a>
        </h1>
        <p>
          For the best thrift deals online!
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="ecommerce"
          future={future}
        >
          <Configure hitsPerPage={8} />
          <div className="search-panel">
            <div className="search-panel__filters"></div>
            <div className="search-panel__results">
              <SearchBox placeholder="" className="searchbox" />
              <Hits hitComponent={Hit} />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <div>
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="type" hit={hit} />
        </p>
        <p>
          <Highlight attribute="shipping" hit={hit} />
        </p>
      </div>
    </article>
  );
}
