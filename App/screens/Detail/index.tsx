/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import {getTypeCalor} from '../../helper/typeColor';

type RouteParams = {
  image: string;
  name: string;
  type: string;
  height: {
    name: string;
    value: number;
    color: string;
  };
  weight: {
    name: string;
    value: number;
    color: string;
  };
  base_experience: {
    name: string;
    value: number;
    color: string;
  };
};

type RootStackParamList = {
  DetailScreen: RouteParams;
};

type Props = StackScreenProps<RootStackParamList, 'DetailScreen'>;

const DetailScreen: React.FC<Props> = ({route}: Props) => {
  const {image, name, type, height, weight, base_experience} = route?.params;
  const mapData = [height, weight, base_experience];
  const orderConfig = getTypeCalor(type);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={[
            styles.containerImage,
            {backgroundColor: orderConfig?.badgeColorAlt},
          ]}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.logoContainer}
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
          />
          <Text style={styles.textPokeonName}>{name}</Text>
        </View>
        <View>
          {mapData.map(item => {
            return (
              <View style={styles.containerProgressBar}>
                <Text>{item?.name}</Text>
                <ProgressBar
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={item?.value}
                  color={item?.color}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
  },
  containerProgressBar: {
    height: 20,
    borderRadius: 10,
    margin: 10,
  },
  logoContainer: {
    width: 200,
    height: 200,
  },
  textPokeonName: {
    color: Colors.WHITE,
    fontWeight: Fonts.bold.fontWeight,
    marginTop: 20,
  },
});

export default DetailScreen;
