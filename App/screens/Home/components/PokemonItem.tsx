import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {navigate} from '../../../helper/navigation';
import {getTypeCalor} from '../../../helper/typeColor';

import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';

type Props = {
  item: {
    image: string;
    name: string;
    type: string;
    height: {
      name: string;
      value: number;
    };
    weight: {
      name: string;
      value: number;
    };
    base_experience: {
      name: string;
      value: number;
    };
  };
  index: number;
};

/**
 *
 * @param item
 * @param index
 * @param onPress
 * @returns {*}
 * @constructor
 */

const ItemList = React.memo(({item, index}: Props) => {
  const pokemonName = item?.name;
  const urlImage = item?.image;
  const type = item?.type;

  const orderConfig = getTypeCalor(type);

  return (
    <TouchableOpacity
      key={index}
      style={[
        styles.container,
        Number(index) % 2 === 1 ? styles.containerRight : null,
      ]}
      testID="card-item-order"
      onPress={() => navigate('DetailScreen', item)}>
      <View
        style={[
          styles.statusSection,
          {backgroundColor: orderConfig.badgeColorAlt},
        ]}>
        <Text
          style={{
            color: orderConfig.badgeColor,
          }}>{`${pokemonName}`}</Text>
      </View>
      <View style={styles.orderInfoSection}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.logoContainer}
          source={{
            uri: urlImage,
            priority: FastImage.priority.normal,
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.GRAYE0,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  containerRight: {
    marginLeft: 5,
  },
  statusSection: {
    ...AppStyles.rowItemsCenterSpace,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  orderInfoSection: {
    marginBottom: 15,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
  },
});

export default ItemList;
