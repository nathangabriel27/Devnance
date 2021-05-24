import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//Componentes
import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import Card from '../../Components/Card'
import styles from './styles';
import { colors } from '../../Constants/theme';
//Redux
import { useSelector } from 'react-redux';


export default function FindEnterprice() {
  const navigation = useNavigation()
  const userState = useSelector(state => state.data)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [dataFind, setDataFind] = useState([])
  const [enterprise_types, setEnterprise_types] = useState('')
  const [name, setName] = useState('')
  const [enterprices, setEnterprices] = useState([])
  const [scroolContainerText, setScroolContainerText] = useState('Pesquise usando nome e tipo da empresa que deseja encontrar. *O campo tipo é obrigatorio.\n\nExemplo:\n   \nNome = Veuno Ltd \nTipo = 2 \n\nCaso informe apenas tipo será exibido mais de uma empresa se tiver, se passar nome e tipo possivelmente retorná apenas um dado.')

  async function enterpriceIndexWithFilter() {
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

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      enabled={Platform.OS === 'ios'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <Loading loadingVisible={loadingVisible} textMensage={'Procurando...'} />

        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerBack}
              onPress={() => navigation.pop()}
            >
              <MaterialIcons name="keyboard-arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
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
                onSubmitEditing={() => enterpriceIndexWithFilter()}
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
                  onSubmitEditing={() => enterpriceIndexWithFilter()}
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
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}