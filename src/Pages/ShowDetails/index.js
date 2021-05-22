import React, { useEffect, useState, useRef } from 'react';
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, View, TouchableOpacityBase } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';

import { data } from '../../Constants/data'
import iconBase64 from '../../Constants/iconBase64'


import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import Card from '../../Components/Card'
import styles from './styles';
import { colors, sizes } from '../../Constants/theme';

import { useSelector, useDispatch } from 'react-redux';
import { SAVE_USER_DATA } from '../../Redux/actions/userData';

export default function ShowDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [data, setData] = useState(false)
  const userState = useSelector(state => state.data)

  const [numberOfLines, setNumberOfLines] = useState(0)



/*   useEffect(() => {
    return loadShowDetailsId(route.params);
  }, [])
 */
  useEffect(() => {
    (async () => {
      try {
        setLoadingVisible(true)
        const requestAPI = await api.get(`api/v1/enterprises/${route.params}`, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': userState[0].auth.accessToken,
            'client': userState[0].auth.client,
            'uid': userState[0].auth.uid,
          },
        })
        console.log('request DATA', requestAPI.data)
        if (requestAPI.data.success === true) {
          setData(requestAPI.data)
          setLoadingVisible(false)
        }
      }
      catch (err) {
        if (err.response.status == 401) {
          return Alert.alert('Ooopsss', 'sua seção expirou, sera necessario fazer o login novamente. \nErro : 401');
        }
        // console.log(err.response.status);
        const message =
          err.response && err.response.data
            ? ` Não foi possivel enviar dados para a API. Verique sua conexão. \nErro code: [ ${err} ]`
            : ` Não foi possivel enviar dados para a API. \nErro code: [ ${err} ]`;
        Alert.alert('Ooopsss', err.response.data);
        setLoadingVisible(false)
      }
    })();
  }, []);


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
              <View style={styles.mainContainer}>
                <View style={styles.mainContainerPhoto}>
                  <Image
                    style={styles.mainContainerImage}
                    source={{
                      uri: `https://empresas.ioasys.com.br${data.enterprise.photo}`,
                    }}
                  />
                </View>

                <View style={styles.mainContainerDetails}>
                  <Text style={styles.mainContainerTitle}>{data.enterprise.enterprise_name}</Text>
                  <Text style={styles.mainContainerSubtitle}>{`# ${data.enterprise.id}`}</Text>
                </View>



                <View style={styles.mainSocial}>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <Image
                      source={{ uri: iconBase64.facebook }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <Image
                      source={{ uri: iconBase64.mail }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <Image
                      source={{ uri: iconBase64.twitter }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <Image
                      source={{ uri: iconBase64.phone }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => { }}
                  >
                    <Image
                      source={{ uri: iconBase64.linkedin }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.mainLocationContainer}>
                    <View style={styles.mainLocationItem}>

                      <View style={styles.mainLocationIcon}>
                        <MaterialCommunityIcons name="map-marker-circle" size={34} color={colors.gray} />
                        <Text style={styles.mainLocationText}>{data.enterprise.city}</Text>
                      </View>
                    </View>

                    <View style={styles.mainLocationItem}>
                      <View style={styles.mainLocationIcon}>
                        <MaterialCommunityIcons name="flag" size={34} color={colors.gray} />
                        <Text style={styles.mainLocationText}>{data.enterprise.country}</Text>
                      </View>
                    </View>
                  </View>



                  <View style={styles.mainBodyPricing}>


                    <View style={styles.mainBodyPricingContainer}>
                      <View style={styles.mainBodyPricingText}>
                        <Text style={styles.mainBodyPricingTitle}>Nº de ações </Text>
                      </View>
                      <View style={styles.mainBodyPricingValue}>
                        <Text style={styles.mainBodyPricingValueTitle}>{data.enterprise.shares}</Text>
                        <Entypo name="line-graph" size={24} color={colors.gray} />
                      </View>
                    </View>

                    <View style={styles.mainBodyPricingContainer}>
                      <View style={styles.mainBodyPricingText}>
                        <Text style={styles.mainBodyPricingTitle}>Valor da ação</Text>
                      </View>
                      <View style={styles.mainBodyPricingValue}>
                        <Text style={styles.mainBodyPricingValueTitle}>{`$ ${data.enterprise.share_price}`}</Text>
                        <Entypo name="line-graph" size={24} color={colors.gray} />
                      </View>
                    </View>

                  </View>
                  <View style={styles.mainDescription}>
                    <Text style={styles.mainDescriptionText}>{data.enterprise.description}</Text>
                  </View>
                </ScrollView>


              </View>
            </View>
          </View>

        </>
      }
    </>

  );
}