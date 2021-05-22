import React, { useEffect, useState, useRef } from 'react';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import styles from './styles';



//import { useSelector, useDispatch } from 'react-redux';
//import { SAVE_USER_DATA, REMOVE_USER_DATA } from '../../redux/actions/userData';

export default function Login() {
  const navigation = useNavigation()
  const [loadingVisible, setLoadingVisible] = useState(false)
  //const state = useSelector(state => state.data)
  //const dispatch = useDispatch()
  const [secureText, setSecureText] = useState(true)
  const [email, setEmail] = useState('testeapple@ioasys.com.br')
  const [password, setPassword] = useState('12341234')
  const passwordInputRef = useRef();

  useEffect(() => {

  }, [])


  function visibleSecureText() {
    if (secureText === false) {
      setSecureText(true)
    } else {
      setSecureText(false)
    }
  }
  async function singIn() {
    try {
      setLoadingVisible(true)
      const requestAPI = await api.post(`api/v1/users/auth/sign_in`, {
        headers: {
          'Content-Type': 'application/json',
        },
        email: email,
        password: password,
      })
      console.log('request DATA', requestAPI.data),
        console.log('request HEADERS', requestAPI.headers)
      if (requestAPI.status === 200) {
        setLoadingVisible(false)
        const data = {
          name: requestAPI.data.investor.investor_name,
          email: requestAPI.data.investor.email
        }
        return navigation.navigate('Main', data)

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
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      enabled={Platform.OS === 'ios'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <StatusBar barStyle="dark-content" hidden={true} />
        <Loading loadingVisible={loadingVisible} textMensage={'Validando informações de login'} />
        <ImageBackground
          source={require('../../../assets/background.png')}
          style={{ flex: 1 }}
        >
          <>
            <View style={styles.header}>
              <Image
                source={require('../../../assets/logo.png')}
                resizeMode={'contain'}
                style={{
                  height: '50%',
                  width: '50%',
                }}
              />
              <View style={styles.headerTitle}>
                <Text style={styles.headerText}>Bem vindo de volta,</Text>
                <Text style={styles.headerSubtext}>Faça login para continuar...</Text>
              </View>
            </View>



            <View style={styles.main}>
              <View style={styles.mainInput}>
                <FontAwesome5 name="user-circle" size={28} color="#FFFFFF" style={{ marginHorizontal: 10 }} />
                <TextInput
                  style={styles.mainTextInput}
                  autoCorrect={false}
                  placeholder="Seu email ou username"
                  placeholderTextColor='#aaa'
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType={'next'}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  onSubmitEditing={() => passwordInputRef.current.focus()}
                />
              </View>

              <View style={styles.mainInput}>
                <View style={styles.mainInputItem}>
                  <MaterialIcons name="lock" size={24} color="#FFFFFF" style={{ marginHorizontal: 10 }} />
                  <TextInput
                    style={styles.mainTextInput}
                    autoCorrect={false}
                    placeholder="Sua senha"
                    placeholderTextColor='#aaa'
                    autoCapitalize="none"
                    keyboardType="default"
                    secureTextEntry={true}
                    returnKeyType={'send'}
                    secureTextEntry={secureText}
                    value={password}
                    ref={passwordInputRef}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={() => singIn()}
                  />
                </View>
                <TouchableOpacity
                  style={{ marginHorizontal: 5 }}
                  onPress={() => visibleSecureText()}
                >
                  <FontAwesome name={!secureText ? "eye" : "eye-slash"} size={26} color={!secureText ? "#05AB4B" : "#aaa"} />
                </TouchableOpacity>

              </View>
              <TouchableOpacity
                style={styles.mainButton}
                onPress={() => singIn()}
              >
                <Text style={styles.mainButtonText}>Fazer login</Text>
              </TouchableOpacity>
            </View>
          </>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}