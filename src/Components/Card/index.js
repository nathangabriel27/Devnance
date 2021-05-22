import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Image, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { colors, sizes } from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Card(props) {
  const {
    id,
    enterprise_name,
    photo,
    description,
    city,
    country,
    share_price,
    data,
  } = props
  const navigation = useNavigation()

  /* 
    useEffect(() => {
      console.log('loadingVisible', loadingVisible);
    }, []) */

  return (

    <TouchableOpacity
      key={id}
      style={styles.container}
      onPress={() => navigation.navigate('ShowDetails', id)}
    >
      <Image
        style={styles.containerImage}
        source={{
          uri: `https://empresas.ioasys.com.br/${photo}`,
        }}
      />

      <View style={styles.body}>
        <Text style={styles.bodyName}>{enterprise_name}</Text>
        <Text numberOfLines={3} style={styles.bodyDescription}>{description}</Text>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <FontAwesome name="map-marker" size={24} color={colors.gray} />
            <Text style={styles.footerItemText}>{`${city} - ${country}`}</Text>
          </View>
          <View style={styles.footerItem}>
            <MaterialIcons name="attach-money" size={24} color={colors.green} />
            <Text style={styles.footerItemText}>{`${share_price}`}</Text>
          </View>
        </View>
      </View>

    </TouchableOpacity>

  );
}
