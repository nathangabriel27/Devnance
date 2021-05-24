import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../../Constants/theme';
import styles from './styles';

export default function Loading(props) {
  const { loadingVisible, textMensage } = props
  /* 
    useEffect(() => {
      console.log('loadingVisible', loadingVisible);
    }, []) */

  return (
    <>
      { loadingVisible ?
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.green} />
          <Text style={styles.text}>{textMensage ?? `Acessando dados ... `}</Text>
        </View>
        :
        null
      }
    </>
  );
}
