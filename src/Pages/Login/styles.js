import { Dimensions, StyleSheet, } from 'react-native';
const { height, width } = Dimensions.get('window');
import { colors, sizes } from '../../Constants/theme';


export default StyleSheet.create({
  header: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: colors.white,
  },
  headerTitle: {
    width: '100%',
    padding: sizes.medium,
  },
  headerText: {
    fontSize: sizes.title,
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
  },
  headerSubtext: {
    fontSize: sizes.subTitle,
    color: colors.white,
    fontFamily: 'Montserrat-Regular',

  },


  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: sizes.medium,
    //backgroundColor: colors.white,

  },
  mainInput: {
    width: '90%',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: "center",
    margin: sizes.medium,
    padding: sizes.medium,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainInputItem: {
    flex: 1,
   
    flexDirection: 'row',
    alignItems: "center",
  },
  mainTextInput: {
    flex: 1,
    height: 40,
    color: colors.white,
    alignItems: "center",
    justifyContent: "center",
    fontSize: sizes.title,
  },
  mainButton: {
    backgroundColor: colors.green,
    width: '90%',
    padding: sizes.maxSize,
    margin: sizes.large,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200
  },
  mainButtonText: {
    color: colors.white,
    fontSize: sizes.title,
    fontFamily: 'Montserrat-Bold',

  },

})