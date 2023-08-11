import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import listData from '../recoil/getData';

import getPokemonDetail from '../fetchApi/getPokemonDetail';
import Colors from '../theme/colors';

type PropsGetData = Array<{
  name: string;
  url: string;
}>;

const useComposeData = () => {
  const [data, setData] = useRecoilState(listData);
  const [temData, setTempData] = useState([]);

  const composeData = async (props: PropsGetData) => {
    const getDataPokemonDetail = async (getUrl: string) => {
      const dataResult = await getPokemonDetail({url: getUrl});
      const dataResultCustom = {
        name: dataResult?.forms[0]?.name,
        image: dataResult?.sprites?.other?.home?.front_default,
        type: dataResult?.types[0]?.type?.name,
        height: {
          name: 'Height',
          value: dataResult?.height / 100,
          color: Colors.RED,
        },
        weight: {
          name: 'Weight',
          value: dataResult?.weight / 100,
          color: Colors.BLUE_E0,
        },
        base_experience: {
          name: 'Base Experience',
          value: dataResult?.base_experience / 100,
          color: Colors.GREEN,
        },
        sprites: {
          front_default: dataResult?.sprites?.front_default,
          back_default: dataResult?.sprites?.back_default,
          front_shiny: dataResult?.sprites?.front_shiny,
        },
      };
      setTempData(prev => {
        return [...prev, dataResultCustom];
      });
    };

    props.map(item => {
      getDataPokemonDetail(item?.url);
    });
  };

  return {
    composeData,
    temData,
  };
};

export default useComposeData;
