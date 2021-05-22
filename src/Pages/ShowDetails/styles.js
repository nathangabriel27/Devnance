import { Dimensions, StyleSheet, } from 'react-native';
const { height, width } = Dimensions.get('window');
import { colors, sizes } from '../../Constants/theme';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  header: {
    height: '15%',
    width: '100%',

    alignItems: 'center',
    backgroundColor: colors.gray,
    flexDirection: 'row',
  },
  headerBack: {
    // backgroundColor: colors.white,
    marginHorizontal: sizes.medium,
    paddingVertical: sizes.large,
    paddingHorizontal: sizes.maxSize,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  mainContainer: {
    // backgroundColor: colors.green,
    width: '100%',

  },
  mainContainerPhoto: {
    marginTop: -40,
    alignItems: "center",
    justifyContent: "center",
    padding: sizes.small,
  },
  mainContainerImage: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: colors.white,

  },
  mainContainerDetails: {
    alignItems: "center",
    justifyContent: "center",
    padding: sizes.medium,
  },
  mainContainerTitle: {
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Bold',
  },
  mainContainerSubtitle: {
    fontSize: sizes.subTitle,
    color: colors.gray,
    fontFamily: 'Montserrat-Bold',
  },
  mainSocial: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: sizes.small,
  },
  mainSocialButton: {
    // backgroundColor: colors.blue,
    padding: sizes.large,
    borderRadius: 1000,
  },
  mainSocialIcon: {
    width: 40,
    height: 40,
  },
  mainDescription: {
    padding: sizes.medium,
  },
  mainDescriptionText: {
    textAlign: 'justify',
    fontSize: sizes.subTitle,
    color: colors.gray,
    fontFamily: 'Montserrat-Regular',
    marginVertical: sizes.small,
  },
  mainLocationContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  mainLocationItem: {
    flexDirection: 'row',
    width: '40%',
    alignItems: "center",
    justifyContent: "center",

  },
  mainLocationIcon: {
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",

  },
  mainLocationText: {
    padding: sizes.small,
    textAlign: 'justify',
    fontSize: sizes.subTitle,
    color: colors.gray,
    fontFamily: 'Montserrat-Regular',
  },
  mainBodyPricing: {

  },
  mainBodyPricingTitle: {

  },

})