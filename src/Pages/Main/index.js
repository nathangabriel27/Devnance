import React, { useEffect, useState, useRef } from 'react';
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import { data } from '../../Constants/data'

import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import Card from '../../Components/Card'
import styles from './styles';
import { colors, sizes } from '../../Constants/theme';

import { useSelector, useDispatch } from 'react-redux';
import { SAVE_USER_DATA, REMOVE_USER_DATA } from '../../Redux/actions/userData';

export default function Main() {
  const navigation = useNavigation()
  const [loadingVisible, setLoadingVisible] = useState(false)
  const userState = useSelector(state => state.data)
  const dispatch = useDispatch()
  const [enterprices, setEnterprices] = useState([])


  useEffect(() => {
    console.log(userState[0].auth);
    enterpriceIndex()
  }, [])
  function confirmedExit() {
    Alert.alert(
      'Sair ',
      'Tem certeza que vai nos deixar? ',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Sair', onPress: () => logout()
        },
      ],
      { cancelable: false }
    )
  }
  function logout() {
    navigation.navigate('Login')
    return dispatch({
      type: REMOVE_USER_DATA,
      payload: userState[0]
    })
  }

  async function enterpriceIndex() {
    try {
      setLoadingVisible(true)
      const requestAPI = await api.get(`api/v1/enterprises`, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': userState[0].auth.accessToken,
          'client': userState[0].auth.client,
          'uid': userState[0].auth.uid,
        }
      })
      if (requestAPI.status === 200) {
        setEnterprices(requestAPI.data.enterprises)
        //console.log('enterpriceIndex', requestAPI.data.enterprises)
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
  const EnterpricesRoute = () => (
    <View style={styles.tabContainer} >
      <View style={styles.tabHeader} >
        <TextInput
          style={styles.tabHeaderTextInput}
          autoCorrect={false}
          placeholder="Pesquise por uma empresa"
          placeholderTextColor='#aaa'
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType={'search'}
        //value={email}
        //onChangeText={(text) => setEmail(text)}
        //onSubmitEditing={() => passwordInputRef.current.focus()}
        />
      </View>
      <View style={styles.tabBody} >
        <ScrollView
          style={styles.tabBodyScroll}
          showsVerticalScrollIndicator={false}
        >
          {enterprices.map((enterprice, i) => (
            <Card
              key={i}
              id={enterprice.id}
              enterprise_name={enterprice.enterprise_name}
              photo={enterprice.photo}
              description={enterprice.description}
              city={enterprice.city}
              country={enterprice.country}
              share_price={enterprice.share_price}
            />
          ))}
        </ScrollView >
      </View>
    </View>
  );
  const FindEnterpriceRoute = () => (
    <View style={styles.tabContainer} >
      <Text style={styles.tasbItemtext} numberOfLines={2}>Pesquise usando nome e tipo da empresa que deseja encontrar</Text>
      <View style={styles.tabHeader} >
        <TextInput
          style={styles.tabHeaderTextInput}
          autoCorrect={false}
          placeholder="Nome da empresa"
          placeholderTextColor='#aaa'
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType={'search'}
        //value={email}
        //onChangeText={(text) => setEmail(text)}
        //onSubmitEditing={() => passwordInputRef.current.focus()}
        />
      </View>
      <View style={styles.tabHeader} >
        <TextInput
          style={styles.tabHeaderTextInput}
          autoCorrect={false}
          placeholder="Tipo da empresa"
          placeholderTextColor='#aaa'
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType={'search'}
        //value={email}
        //onChangeText={(text) => setEmail(text)}
        //onSubmitEditing={() => passwordInputRef.current.focus()}
        />
      </View>
      <ScrollView
        style={styles.tabBodyScroll}
        showsVerticalScrollIndicator={false}
      >
        {data.map((data, i) => (
          <Card
            key={i}
            id={data.id}
            enterprise_name={data.enterprise_name}
            photo={data.photo}
            description={data.description}
            city={data.city}
            country={data.country}
            share_price={data.share_price}
          />
        ))}
      </ScrollView >

    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Enterprices', title: 'Empresas' },
    { key: 'FindEnterprice', title: 'Buscar' },
  ]);
  const renderScene = SceneMap({
    Enterprices: EnterpricesRoute,
    FindEnterprice: FindEnterpriceRoute,
  });
  const _renderTabBar = () => {
    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>

              <Text style={index === i ? styles.tabItemtextSelected : styles.tabItemtext} numberOfLines={1}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="ligh-content" hidden={true} color={colors.gray} />
      <Loading loadingVisible={loadingVisible} textMensage={'Buscando dados'} />
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerProfile}
            onPress={() => { }}
          >
            <View style={styles.headerCircle}>
              <Text style={styles.headerCircleText}>TA</Text>
            </View>
            <View style={styles.headerTitle}>
              <Text numberOfLines={1} style={styles.headerText}>{userState[0].investor.investor.investor_name}</Text>
              <Text numberOfLines={1} style={styles.headerSubtext}>{userState[0].investor.investor.email}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => confirmedExit()}
          >
            <View style={styles.headerButtonLogout}              >
              <MaterialCommunityIcons name="exit-run" size={24} color={colors.green} />
            </View>
            <Text style={styles.headerButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <View style={styles.mainView} />
          <View style={styles.mainBotton} />
          <View style={styles.mainTabs}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              renderTabBar={_renderTabBar}
            //swipeEnabled={false}
            />
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>

  );
}