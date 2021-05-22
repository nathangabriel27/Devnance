import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Image, Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { colors, sizes } from '../../Constants/theme';
import styles from './styles';

export default function Card(props) {
  const {
    id,
    enterprise_name,
    photo,
    description,
    city,
    country,
    share_price
  } = props
  /* 
    useEffect(() => {
      console.log('loadingVisible', loadingVisible);
    }, []) */

  return (

    <View key={props.id} style={styles.container}>
      <Image
        style={styles.containerImage}
        source={{
          uri: `https://empresas.ioasys.com.br/${props.photo}`,
        }}
      />

      <View style={styles.body}>
        <Text style={styles.bodyName}>{props.enterprise_name}</Text>
        <Text numberOfLines={2} style={styles.bodyDescription}>{props.description}</Text>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <FontAwesome name="map-marker" size={24} color={colors.gray} />
            <Text style={styles.footerItemText}>{`${props.city} - ${props.country}`}</Text>
          </View>
          <View style={styles.footerItem}>
            <MaterialIcons name="attach-money" size={24} color={colors.green} />
            <Text style={styles.footerItemText}>{`${props.share_price}`}</Text>
          </View>
        </View>
      </View>

    </View>

  );
}
