import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';

import {useRecoilState} from 'recoil';

import OrderItem from './PokemonItem';

import listData from '../../../recoil/getData';
import pageData from '../../../recoil/getPage';
import listDataFilter from '../../../recoil/getDataFilter';

import getPokemonList from '../../../fetchApi/getPokemonList';
import useComposeData from '../../../hook/useComposeData';

import AppStyles from '../../../theme/appStyles';
import Spinner from '../../../uikit/Spinner';
import Text from '../../../uikit/Text';

const OrderListHome = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoadingAppendData, setIsLoadingAppendData] = React.useState(false);
  const [data, setData] = useRecoilState(listData);
  const [page, _setPage] = useRecoilState(pageData);
  const [pageTemp, setPageTemp] = React.useState({
    limit: page.limit,
    offset: page.offset,
  });
  const [dataFilter, _setDataFilter] = useRecoilState(listDataFilter);

  const {composeData, temData} = useComposeData();

  const getDataPokemon = async () => {
    const dataResult = await getPokemonList({
      limit: 8,
      offset: 0,
    });
    composeData(dataResult?.results);
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    getDataPokemon();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataTemp = () => {
    const margeData = [...data, ...temData];
    setData(margeData);
    setIsLoadingAppendData(false);
  };

  const appendData = async () => {
    const isFilterNotActive = !dataFilter?.isFilter;
    if (isFilterNotActive) {
      setIsLoadingAppendData(true);
      const movePage = {
        limit: 8,
        offset: pageTemp.offset + 8,
      };
      const dataResult = await getPokemonList(movePage);
      setPageTemp(movePage);
      await composeData(dataResult?.results);
      getDataTemp();
    }
  };

  const showData = dataFilter?.isFilter ? dataFilter?.dataFilter : data;

  const showLoadingAppendData = useCallback(() => {
    return isLoadingAppendData && <Spinner testID="loading" />;
  }, [isLoadingAppendData]);

  const showDataEmpty = useCallback(() => {
    return <Text>Data tidak di temukan</Text>;
  }, []);

  return (
    <FlatList
      testID="flat-list-item-order-active"
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
      data={showData}
      renderItem={({item, index}) => <OrderItem item={item} index={index} />}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      initialNumToRender={8}
      showsVerticalScrollIndicator={false}
      onEndReached={appendData}
      ListEmptyComponent={showDataEmpty}
      ListFooterComponent={showLoadingAppendData}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.flatListContainer,
  },
  spinnerContainer: {
    marginVertical: 20,
  },
});

export default OrderListHome;
