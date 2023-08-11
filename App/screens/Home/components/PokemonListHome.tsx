import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import OrderItem from './PokemonItem';
import listData from '../../../recoil/getData';
import pageData from '../../../recoil/getPage';
import listDataFilter from '../../../recoil/getDataFilter';
import AppStyles from '../../../theme/appStyles';
import getPokemonList from '../../../fetchApi/getPokemonList';
import useComposeData from '../../../hook/useComposeData';

const OrderListHome = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
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
  }, []);

  const getDataTemp = () => {
    const margeData = [...data, ...temData];
    setData(margeData);
  };

  const appendData = async () => {
    const movePage = {
      limit: 8,
      offset: pageTemp.offset + 8,
    };
    const dataResult = await getPokemonList(movePage);
    setPageTemp(movePage);
    await composeData(dataResult?.results);
    getDataTemp();
  };

  const showData = dataFilter?.isFilter ? dataFilter?.dataFilter : data;

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
      numColumns={2}
      showsVerticalScrollIndicator={false}
      onEndReached={() => appendData()}
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
