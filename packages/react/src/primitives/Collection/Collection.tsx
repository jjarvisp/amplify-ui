import { classNames } from '@aws-amplify/ui';
import * as React from 'react';
import debounce from 'lodash/debounce.js';

import { ComponentClassName } from '@aws-amplify/ui';

import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Text } from '../Text';
import { Pagination, usePagination } from '../Pagination';
import { SearchField } from '../SearchField';
import { ComponentText } from '../shared/constants';
import { strHasLength } from '../shared/utils';
import type {
  BaseCollectionProps,
  ElementType,
  GridCollectionProps,
  ListCollectionProps,
} from '../types';
import { getItemsAtPage, itemHasText, getPageCount } from './utils';

const DEFAULT_PAGE_SIZE = 10;
const TYPEAHEAD_DELAY_MS = 300;

const ListCollection = <Item,>({
  children,
  direction = 'column',
  items,
  ...rest
}: ListCollectionProps<Item>) => (
  <Flex direction={direction} {...rest}>
    {Array.isArray(items) ? items.map(children) : null}
  </Flex>
);

const GridCollection = <Item,>({
  children,
  items,
  ...rest
}: GridCollectionProps<Item>) => (
  <Grid {...rest}>{Array.isArray(items) ? items.map(children) : null}</Grid>
);

const renderCollectionOrNoResultsFound = <Item,>(
  collection: React.JSX.Element | null,
  items: Item[],
  searchNoResultsFound: React.ReactNode
) => {
  if (items.length) {
    return collection;
  }
  if (searchNoResultsFound) {
    return searchNoResultsFound;
  }
  return (
    <Flex justifyContent="center">
      <Text>{ComponentText.Collection.searchNoResultsFound}</Text>
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/collection)
 */
export const Collection = <Item, Element extends ElementType>({
  className,
  isSearchable,
  isPaginated,
  items,
  itemsPerPage = DEFAULT_PAGE_SIZE,
  searchFilter = itemHasText,
  searchLabel = ComponentText.Collection.searchButtonLabel,
  searchNoResultsFound,
  searchPlaceholder,
  type = 'list',
  testId,
  ...rest
}: BaseCollectionProps<Item, Element>): React.JSX.Element => {
  const [searchText, setSearchText] = React.useState<string>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = React.useCallback(
    debounce(setSearchText, TYPEAHEAD_DELAY_MS),
    [setSearchText]
  );

  // Make sure that items are iterable
  items = Array.isArray(items) ? items : [];

  // Filter items by text
  if (isSearchable && strHasLength(searchText)) {
    items = items.filter((item) => searchFilter(item, searchText));
  }

  // Pagination
  const pagination = usePagination({
    totalPages: getPageCount(items.length, itemsPerPage),
  });

  if (isPaginated) {
    items = getItemsAtPage(items, pagination.currentPage, itemsPerPage);
  }

  const collection =
    type === 'list' ? (
      <ListCollection
        className={ComponentClassName.CollectionItems}
        items={items}
        {...rest}
      />
    ) : type === 'grid' ? (
      <GridCollection
        className={ComponentClassName.CollectionItems}
        items={items}
        {...rest}
      />
    ) : null;

  return (
    <Flex
      testId={testId}
      className={classNames(ComponentClassName.Collection, className)}
    >
      {isSearchable ? (
        <Flex className={ComponentClassName.CollectionSearch}>
          <SearchField
            label={searchLabel}
            placeholder={searchPlaceholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearch(e.target.value)
            }
            onClear={() => setSearchText('')}
          />
        </Flex>
      ) : null}

      {renderCollectionOrNoResultsFound(
        collection,
        items,
        searchNoResultsFound
      )}

      {isPaginated ? (
        <Flex className={ComponentClassName.CollectionPagination}>
          <Pagination {...pagination} />
        </Flex>
      ) : null}
    </Flex>
  );
};

Collection.displayName = 'Collection';
