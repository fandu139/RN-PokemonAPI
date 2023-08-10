import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HomeHeader from './components/HomeHeader';
import Colors from '../../theme/colors';
import OrderListHome from './components/OrderListHome';
import Text from '../../uikit/Text';
import getPokemonList from '../../fetchApi/getPokemonList';
import useComposeData from '../../hook/useComposeData';
import listData from '../../recoil/getData';
import {useRecoilState} from 'recoil';

const HomeScreen = () => {
  const [dataCollection, setDataCollection] = useState([]);
  const [data, setData] = useRecoilState(listData);

  useEffect(() => {
    const getDataPokemon = async () => {
      const dataResult = await getPokemonList();
      setDataCollection(dataResult?.results);
    };

    getDataPokemon();
  }, []);

  useComposeData(dataCollection);

  return (
    <View
      style={styles.container}
      testID="home-screen"
      accessibilityLabel="home-screen">
      <HomeHeader
        headerBarAction={<Text.Bold style={styles.textName}>Pokemon</Text.Bold>}
      />
      <View style={styles.container}>
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
});

export default HomeScreen;
