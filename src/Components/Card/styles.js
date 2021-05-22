import { Dimensions, StyleSheet, } from 'react-native';
import { color } from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
import { colors, sizes } from '../../Constants/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: sizes.small,
    borderRadius: 15,
    flexDirection: 'row',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  containerImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
   marginRight: sizes.small,
  },
  body: {
    //backgroundColor: colors.blue,
    width: '80%',
    justifyContent: 'space-evenly',
 
  },
  bodyName: {
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Bold',
    width:'90%',
    textAlign: 'center',


  },
  bodyDescription: {
    width:'90%',
    //backgroundColor: colors.redGoogle1,
    paddingRight: sizes.medium,
    fontSize: sizes.subTitle,
    color: colors.gray,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',

  },
  footerItem: {
    //backgroundColor: colors.red2,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  footerItemText: {
    marginLeft: sizes.small,
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Regular'
  },


})