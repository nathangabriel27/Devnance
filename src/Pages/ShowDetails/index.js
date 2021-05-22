import React, { useEffect, useState, useRef } from 'react';
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, View, TouchableOpacityBase } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import { data } from '../../Constants/data'

import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import Card from '../../Components/Card'
import styles from './styles';
import { colors, sizes } from '../../Constants/theme';

//import { useSelector, useDispatch } from 'react-redux';
//import { SAVE_USER_DATA, REMOVE_USER_DATA } from '../../redux/actions/userData';

export default function ShowDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [data, setData] = useState(false)
  //const state = useSelector(state => state.data)
  //const dispatch = useDispatch()


  useEffect(() => {
    loadShowDetailsId(route.params);
  }, [])


  async function loadShowDetailsId(props) {
    try {
      setLoadingVisible(true)
      const requestAPI = await api.get(`api/v1/enterprises/${props}`, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'QxXUJyxkdtL01zpL4Hk3BQ',
          'client': 'CsgNvcnRSLoCmeX87B83Vg',
          'uid': 'testeapple@ioasys.com.br'
        },
      })
      console.log('request DATA', requestAPI.data)
      if (requestAPI.data.success === true) {
        setData(requestAPI.data)
        setLoadingVisible(false)
      }
    }
    catch (err) {
      console.log(err);
      const message =
        err.response && err.response.data
          ? ` Não foi possivel enviar dados para a API. Verique sua conexão. \nErro code: [ ${err} ]`
          : ` Não foi possivel enviar dados para a API. \nErro code: [ ${err} ]`;
      Alert.alert('Ooopsss', message);
      setLoadingVisible(false)
    }
  }

  return (

    <>
      {data === false
        ?
        <>
        </>
        :
        <>
          <StatusBar barStyle="ligh-content" hidden={false} color={colors.gray} />
          <Loading loadingVisible={loadingVisible} textMensage={'Buscando dados'} />
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerBack}
                onPress={() => navigation.pop()}
              >
                <MaterialIcons name="keyboard-arrow-left" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.main}>
              <View style={styles.mainHeader}>
                <View style={styles.mainHeaderPhoto}>
                  <Image
                    style={styles.mainHeaderImage}
                    source={{
                      uri: `https://empresas.ioasys.com.br/${data.photo}`,
                    }}
                  />
                </View>
                <View style={styles.mainHeaderDetails}>
                  <Text style={styles.mainHeaderTitle}>{data.enterprise.enterprise_name}</Text>
                  <Text style={styles.mainHeaderSubtitle}>{`# ${data.enterprise.id}`}</Text>
                </View>
                <View style={styles.mainSocial}>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <FontAwesome name="facebook" size={24} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <FontAwesome name="facebook" size={24} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <FontAwesome name="facebook" size={24} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <FontAwesome name="facebook" size={24} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <FontAwesome name="facebook" size={24} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.mainDescription}
                  onPress={() => { }}
                >
                  <Text numberOfLines={5} style={styles.mainDescriptionText}>{data.enterprise.description}</Text>
                  <Text style={styles.mainDescriptionText}>Ler Mais... </Text>
                </TouchableOpacity>

                <View style={styles.mainLocationContainer}>
                  <View style={styles.mainLocationItem}>
                    <View style={styles.mainLocationIcon}>
                      <MaterialCommunityIcons name="map-marker-circle" size={24} color={colors.gray} />
                      <Text style={styles.mainLocationText}>{data.enterprise.city}</Text>
I                    </View>
                  </View>
                  <View style={styles.mainLocationItem}>
                    <View style={styles.mainLocationIcon}>
                      <MaterialCommunityIcons name="flag" size={24} color={colors.gray} />
                      <Text style={styles.mainLocationText}>{data.enterprise.country}</Text>
                    </View>
                  </View>
                </View>

              </View>
            </View>
          </View>

        </>
      }
    </>

  );
}