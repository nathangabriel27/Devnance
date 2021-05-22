import { Dimensions, StyleSheet, } from 'react-native';
const { height, width } = Dimensions.get('window');
import { colors, sizes } from '../../Constants/theme';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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



  tabContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.white,
    marginTop: -40,

  },
  tabHeader: {
    width: '90%',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: "center",
    margin: sizes.medium,
    padding: sizes.medium,
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  tabHeaderTextInput: {
    flex: 1,
    height: 30,
    color: colors.gray,
    alignItems: "center",
    justifyContent: "center",
    fontSize: sizes.title,
    fontFamily: 'Montserrat-Regular',
  },
  tabBody: {
    height: '100%',
    marginVertical: sizes.small,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",

  },
  tabHeaderInput: {
    width: '70%',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: "center",
    margin: sizes.medium,
    padding: sizes.medium,
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  tabHeaderSearchButton: {
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: sizes.small,
    marginHorizontal: sizes.medium,
    paddingVertical: sizes.small,
    paddingHorizontal: sizes.medium,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  tabBodyScroll: {
    marginBottom: 80,
  },

  tabBodyScrollContainer: {
    //backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    margin: sizes.small,
    padding: sizes.small,
  },
  tabBodyScrollText: {
    color: colors.gray,
    textAlign: 'justify',
    fontSize: sizes.title,
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: sizes.small,
    paddingHorizontal: sizes.small,
  },

})