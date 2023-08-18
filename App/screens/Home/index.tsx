import React, {Suspense, lazy, useCallback, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';

import HomeHeader from './components/HomeHeader';

import {ICON_SEARCH} from '../../assets/icon';

import listDataFilter from '../../recoil/getDataFilter';
import listData from '../../recoil/getData';
import pageData from '../../recoil/getPage';

import useComposeData from '../../hook/useComposeData';
import getPokemonList from '../../fetchApi/getPokemonList';

import Text from '../../uikit/Text';
import Icon from '../../uikit/Icon';
import Spinner from '../../uikit/Spinner';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import AppStyles from '../../theme/appStyles';

const OrderListHome = lazy(() => import('./components/PokemonListHome'));

type RootStackParamList = {
  HomeScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = () => {
  const [page, _setPage] = useRecoilState(pageData);
  const [data, setData] = useRecoilState(listData);
  const [_dataFilter, setDataFilter] = useRecoilState(listDataFilter);
  const [searchByFilter, setSearchByFilter] = React.useState('');
  const [searchLoading, setSearchLoading] = React.useState(false);

  const {composeData, temData} = useComposeData();

  useEffect(() => {
    const getDataPokemon = async () => {
      const dataResult = await getPokemonList({
        limit: page.limit,
        offset: page.offset,
      });
      composeData(dataResult?.results);
    };

    getDataPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(temData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temData]);

  const filtedData = async (textSearch: string) => {
    const result = data.filter(value =>
      value.name.search(textSearch.toLowerCase()) >= 0 ? true : false,
    );

    setDataFilter({
      isFilter: textSearch.length ? true : false,
      dataFilter: textSearch.length ? result : [],
    });
    setSearchLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearchLoading(true);
    setSearchByFilter(text);
    setTimeout(() => {
      filtedData(text);
    }, 3000);
  };

  const ShowlistPokemon = useCallback(() => {
    return (
      !searchLoading && (
        <Suspense fallback={<Spinner />}>
          <OrderListHome />
        </Suspense>
      )
    );
  }, [searchLoading]);

  const ShowSpinner = useCallback(() => {
    return searchLoading && <Spinner />;
  }, [searchLoading]);

  return (
    <View
      style={styles.container}
      testID="home-screen"
      accessibilityLabel="home-screen">
      <HomeHeader
        headerBarAction={<Text.Bold style={styles.textName}>Pokemon</Text.Bold>}
      />
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <View style={styles.containerInputSearch}>
            <View style={styles.containerIconSearch}>
              <Icon name={ICON_SEARCH} size={16} color={Colors.GRAY80} />
            </View>
            <TextInput
              value={searchByFilter}
              onChangeText={text => handleSearch(text)}
              style={styles.textInput}
              placeholder="Cari nama pokemon"
              testID="text-input-search-by-order-id-active"
            />
          </View>
        </View>
        <ShowlistPokemon />
        <ShowSpinner />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  textName: {
    color: Colors.WHITE,
  },
  containerSearch: {
    height: 65,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  containerInputSearch: {
    ...Fonts.regular,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: Colors.GRAYF3,
    flex: 1,
  },
  containerIconSearch: {
    width: 40,
    ...AppStyles.centerContent,
  },
  textInput: {
    flex: 1,
    ...Fonts.regular,
  },
});

export default HomeScreen;
