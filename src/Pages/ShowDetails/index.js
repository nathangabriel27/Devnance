import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, Text, Share, ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as MailComposer from 'expo-mail-composer'


import iconBase64 from '../../Constants/iconBase64'
import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import styles from './styles';
import { colors } from '../../Constants/theme';
import { useSelector } from 'react-redux';

export default function ShowDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [data, setData] = useState(false)
  const userState = useSelector(state => state.data)
  function openMail(props) {
    MailComposer.composeAsync({
      subject: `Ola estou entrando em contato via email`,
      recipients: [`${props}`],
      body: `Olá\n
      Estou com problemas no meu cadastro.
      `
    })
  }
  function openNumberPhone(props) {
    Linking.openURL(props ? `tel:${props}` : `tel:31994827158`)
  }

  const onShare = async () => {
    const result = await Share.share({
      message: 'React Native | Compartilhanco com qualquer rede social do dispositivo.',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        //console.log('result.activityType: ', result.activityType);
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      //console.log('result.action: ', result.action);
    }
  };
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
                    onPress={onShare}
                  >
                    <Image
                      source={{ uri: iconBase64.facebook }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => openMail(data.enterprise.email_enterprise)}
                  >
                    <Image
                      source={{ uri: iconBase64.mail }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={onShare}
                  >
                    <Image
                      source={{ uri: iconBase64.twitter }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={() => openNumberPhone(data.phone)}
                  >
                    <Image
                      source={{ uri: iconBase64.phone }}
                      style={styles.mainSocialIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainSocialButton}
                    onPress={onShare}
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