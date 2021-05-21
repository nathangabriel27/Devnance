import React, { useState } from 'react';
import Routes from './src/Routes';
import AppLoading from 'expo-app-loading'
import * as Font from "expo-font";

//Redux
import { Provider, } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/index';



export default function App() {
  const [isLoadingFontComplete, setIsLoadingFontComplete] = useState(false);

  const handleFontsAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        "Montserrat-Regular": require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
      })
    ],
      //console.log('Fonte carregada')
    );
  };
  if (!isLoadingFontComplete) {
    return (
      <AppLoading
        startAsync={handleFontsAsync}
        onError={error => console.warn(error)}
        onFinish={() => setIsLoadingFontComplete(true)
        }
      />
    );
  }
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

