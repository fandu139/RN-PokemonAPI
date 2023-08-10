import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import listData from '../../../recoil/getData';
import AppStyles from '../../../theme/appStyles';
import OrderItem from './OrderItem';
import {useRecoilState} from 'recoil';
import Colors from '../../../theme/colors';

const OrderListHome = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [data, setData] = useRecoilState(listData);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  return (
    <FlatList
      testID="flat-list-item-order-active"
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
      data={data}
      renderItem={({item, index}) => <OrderItem item={item} index={index} />}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.flatListContainer,
  },
});

export default OrderListHome;
