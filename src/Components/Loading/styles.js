import { Dimensions, StyleSheet, } from 'react-native';
const { height, width } = Dimensions.get('window');
import { colors, sizes } from '../../Constants/theme';

export default StyleSheet.create({

  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    margin: sizes.medium,
    //fontFamily: 'Nunito-Bold',
    fontSize: sizes.title
  }



})