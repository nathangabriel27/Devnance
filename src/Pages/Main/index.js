import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar'
//Componentes
import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import Card from '../../Components/Card'
import styles from './styles';
import { colors } from '../../Constants/theme';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_USER_DATA } from '../../Redux/actions/userData';

export default function Main() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userState = useSelector(state => state.data)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [enterprices, setEnterprices] = useState([])
  const [dataFind, setDataFind] = useState([])
  const [enterprise_types, setEnterprise_types] = useState('')
  const [name, setName] = useState('')
  const initials = userState[0].investor.investor.investor_name[0] + userState[0].investor.investor.investor_name[userState[0].investor.investor.investor_name.indexOf(' ') + 1]
  const [scroolContainerText, setScroolContainerText] = useState('Pesquise usando nome e tipo da empresa que deseja encontrar. *O campo tipo é obrigatorio.\n\nExemplo:\n   \nNome = Veuno Ltd \nTipo = 2 \n\nCaso informe apenas tipo será exibido mais de uma empresa se tiver, se passar nome e tipo possivelmente retorná apenas um dado.')

  useEffect(() => {
    (async () => {
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
          setLoadingVisible(false)

        }
      }
      catch (err) {
        if (err.response.status === 401) {
          Alert.alert(
            'Ooopppsss ',
            'Parece que sua sessão acabou expirando, Vamos ter que fazer o login novamente.',
            [

              {
                text: 'Ok, sair e fazer login', onPress: () => logout()
              },
            ],
            { cancelable: false }
          )
        }
        setLoadingVisible(false)
      }
    })();
  }, []);

  async function enterpriceIndexWithFilter(props) {
    Keyboard.dismiss
    try {
      setLoadingVisible(true)
      const requestAPI = await api.get(`api/v1/enterprises?enterprise_types=${enterprise_types}&name=${name}`, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': userState[0].auth.accessToken,
          'client': userState[0].auth.client,
          'uid': userState[0].auth.uid,
        },
      })
      setLoadingVisible(false)
      if (requestAPI.data.enterprises.length === 0) {
        return setScroolContainerText(`Desculpe! Infelizmente não pude te ajudar, não consegui encontrar nenhuma empresa com os dados que você me passou. Espero da próxima vez que eu seja mais eficiente para você.\n\nPor favor tente outros dados como por exemplo \nTipo: 2 .`),
          setDataFind([])

      }
      setDataFind(requestAPI.data.enterprises)
    }
    catch (err) {
      const message =
        err.response && err.response.data
          ? ` Não foi possivel enviar dados para a API. Verique sua conexão. \nErro code: [ ${err} ]`
          : ` Não foi possivel enviar dados para a API. \nErro code: [ ${err} ]`;
      Alert.alert('Ooopsss', message);
      setLoadingVisible(false)
    }
  }


  function confirmedExit() {
    Alert.alert(
      'Sair ',
      'Tem certeza que vai nos deixar? ',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Tenho certeza', onPress: () => logout()
        },
      ],
      { cancelable: false }
    )
  }
  function logout() {
    navigation.navigate('Login'),
      dispatch({
        type: REMOVE_USER_DATA,
        payload: userState[0]
      })
  }
  const EnterpricesRoute = () => (
    <View style={styles.tabContainer} >
      <View style={styles.tabBody} >
        <ScrollView
          //style={styles.tabBodyScroll}
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
      <View style={styles.tabHeader} >
        <TextInput
          style={styles.tabHeaderTextInput}
          autoCorrect={false}
          placeholder="Nome da empresa"
          placeholderTextColor='#aaa'
          autoCapitalize="words"
          keyboardType="email-address"
          returnKeyType={'next'}
          value={name}
          onChangeText={(text) => setName(text)}
        //onSubmitEditing={() => passwordInputRef.current.focus()}
        />
      </View>
      <View style={styles.tabHeaderContainer}>
        <View style={styles.tabHeaderInput} >
          <TextInput
            style={styles.tabHeaderTextInput}
            autoCorrect={false}
            placeholder="Tipo da empresa"
            placeholderTextColor='#aaa'
            autoCapitalize="none"
            keyboardType="decimal-pad"
            returnKeyType={'search'}
            value={enterprise_types}
            onChangeText={(text) => setEnterprise_types(text)}
          //onSubmitEditing={() => enterpriceIndexWithFilter()}
          />
        </View>
        <TouchableOpacity
          style={styles.tabHeaderSearchButton}
          onPress={() => enterpriceIndexWithFilter()}
        >
          <Ionicons name="search-circle-sharp" size={40} color={colors.gray} />

        </TouchableOpacity>
      </View>
      {dataFind.length == 0
        ?
        <>
          <View style={styles.tabBodyScrollContainer}>
            <Image
              source={require('../../../assets/logoBackground.png')}
              resizeMode={'contain'}
              style={{
                height: 150,
                width: 150,
              }}
            />
            <Text style={styles.tabBodyScrollText} >{scroolContainerText}</Text>
          </View>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('FindEnterprice')}
          >
            <Text style={styles.footerButtonText}>Ir para tela de pesquisa</Text>
          </TouchableOpacity>
        </>

        :
        <View style={styles.tabBody} >
          <ScrollView
            //style={styles.tabBodyScroll}
            showsVerticalScrollIndicator={false}
          >
            {dataFind.map((data, i) => (
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
      }
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
              onPress={() => setIndex(i)}
            >
              <Text style={index === i ? styles.tabItemtextSelected : styles.tabItemtext} numberOfLines={1}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="ligh-content" hidden={true} color={colors.gray} />
      <Loading loadingVisible={loadingVisible} textMensage={'Buscando dados'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerProfile}
            onPress={() => { }}
            disabled
          >
            <View style={styles.headerCircle}>
              <Text style={styles.headerCircleText}>{initials}</Text>
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
              keyboardDismissMode="none"
            />
          </View>
        </View>
      </View>
    </>

  );
}