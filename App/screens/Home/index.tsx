import React, {useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import HomeHeader from './components/HomeHeader';
import Colors from '../../theme/colors';
import OrderListHome from './components/PokemonListHome';
import Text from '../../uikit/Text';
import getPokemonList from '../../fetchApi/getPokemonList';
import useComposeData from '../../hook/useComposeData';
import pageData from '../../recoil/getPage';
import {useRecoilState} from 'recoil';
import listData from '../../recoil/getData';
import listDataFilter from '../../recoil/getDataFilter';
import Fonts from '../../theme/fonts';
import AppStyles from '../../theme/appStyles';
import Icon from '../../uikit/Icon';
import {ICON_SEARCH} from '../../assets/icon';

const HomeScreen = () => {
  const [page, _setPage] = useRecoilState(pageData);
  const [data, setData] = useRecoilState(listData);
  const [_dataFilter, setDataFilter] = useRecoilState(listDataFilter);
  const [searchByFilter, setSearchByFilter] = React.useState('');

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
      dataFilter: result,
    });
  };

  const handleSearch = (text: string) => {
    setSearchByFilter(text);
    setTimeout(() => {
      filtedData(text);
    }, 3000);
  };

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
        <OrderListHome />
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
