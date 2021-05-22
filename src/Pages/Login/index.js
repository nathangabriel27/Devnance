import React, { useEffect, useState, useRef } from 'react';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { api } from '../../Services/Api';
import Loading from '../../Components/Loading'
import styles from './styles';



import { useSelector, useDispatch } from 'react-redux';
import { SAVE_USER_DATA, REMOVE_USER_DATA } from '../../Redux/actions/userData';

export default function Login() {
  const navigation = useNavigation()
  const [loadingVisible, setLoadingVisible] = useState(false)
  const userState = useSelector(state => state.data)
  const dispatch = useDispatch()
  const [secureText, setSecureText] = useState(true)
  const [email, setEmail] = useState('testeapple@ioasys.com.br')
  const [password, setPassword] = useState('12341234')
  const passwordInputRef = useRef();

  useEffect(() => {
    setLoadingVisible(false)
    if (userState.length === 0) {
      return
    }
    if (userState.length != 0) {
      /* 
      Se a api trafegasse a senha cryptografada ou um UID de token, nesse momento eu faria login 
      novamente com usuario e senha salvos no storage ou passaria o token com permissão de acesso do usuario.
      
      Irei fazer de uma forma que não é segura, salvando o usuario e senha digitado pelo usuario localm
      (OBS* Não faço isso nos apps que desenvolvo, irei fazer dessa vez para ter uma melhor experiencia para avaliação.)
       */
      console.log('userState[0]', userState);
      return singIn(userState[0].auth)
    }
  }, [])


  function visibleSecureText() {
    if (secureText === false) {
      setSecureText(true)
    } else {
      setSecureText(false)
    }
  }
  async function singIn(props) {
    //console.log('props', props);
    Keyboard.dismiss
    try {
      setLoadingVisible(true)
      const requestAPI = await api.post(`api/v1/users/auth/sign_in`, {
        headers: {
          'Content-Type': 'application/json',
        },
        email: props.email,
        password: props.password,
      })

      //console.log('request HEADERS', requestAPI.headers)
      if (requestAPI.status === 200) {
        /* 
         PROBLEMA !!! 
         A api retorna no header da resposta o access-token 
         porem o sinal de - é um operador matematico e não 
         pode ser usado como variavel. Por isso fiz a "gambiarra"
         não confiavel de converter para array e pegar na posição 4
         o valor do access-token. 

         A melhor forma de resolver é mudar o nome e tirar esse sinal. 
        
        */
      let accessToken =Object.values(requestAPI.headers)

        const user = {
          auth: {
            email: email,
            password: password,
            accessToken: accessToken[4],
            client: requestAPI.headers.client,
            uid: requestAPI.headers.uid,

          },
          investor: requestAPI.data
        }
        return dispatch({
          type: SAVE_USER_DATA,
          payload: user
        }),
          setLoadingVisible(false),
          navigation.navigate('Main')
        //console.log('response', userState);

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

  function logout() {
    return dispatch({
      type: REMOVE_USER_DATA,
      payload: userState[0]
    }),
      navigation.navigate('Login')
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
                  onPress={() => logout()}
                // onPress={() => visibleSecureText()}
                >
                  <FontAwesome name={!secureText ? "eye" : "eye-slash"} size={26} color={!secureText ? "#05AB4B" : "#aaa"} />
                </TouchableOpacity>

              </View>
              <TouchableOpacity
                style={styles.mainButton}
                onPress={() => singIn({ email: email, password: password })}
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