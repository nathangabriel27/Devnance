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
    height: 110,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: sizes.small
  },
  body: {
    //backgroundColor: colors.blue,
    width: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bodyName: {
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Bold',
  },
  bodyDescription: {
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
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