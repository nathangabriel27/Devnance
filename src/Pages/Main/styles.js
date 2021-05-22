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
    borderBottomRightRadius: 1000,
    flexDirection: 'row',
  },
  headerProfile: {
    //backgroundColor: colors.red,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: sizes.small,
  },
  headerCircle: {
    backgroundColor: colors.white,
    borderRadius: 1000,
    padding: sizes.maxSize,
    justifyContent: 'center',
    alignItems: 'center',
    margin: sizes.small,
  },
  headerCircleText: {
    fontSize: sizes.title,
    color: colors.black,
    fontFamily: 'Montserrat-Bold',
  },
  headerTitle: {
    flex: 1,
    marginRight: sizes.small,

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
  headerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonLogout: {
    marginHorizontal: sizes.small,
    marginVertical: sizes.small,
    backgroundColor: colors.white,
    padding: sizes.medium,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  headerButtonText: {
    margin: sizes.small,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: sizes.text,
  },



  main: {
    height: '85%',
    width: '100%',
    backgroundColor: colors.gray,

  },
  mainView: {
    height: '15%',
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTabs: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    //marginTop: 30,
    padding: sizes.small,
    //backgroundColor: colors.white,



  },
  mainBotton: {
    flex: 1,
    backgroundColor: colors.white,
  },

  tabBar: {
    flexDirection: 'row',
    marginTop: -1
  },
  tabItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: sizes.medium,
    //backgroundColor: colors.red,
    //borderBottomWidth: 2,
    //borderColor: colors.white,
  },

  tabItemtextSelected: {
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Bold',
    borderBottomWidth: 3,
    borderColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: sizes.small,
  },
  tabItemtext: {
    fontSize: sizes.title,
    color: colors.gray,
    fontFamily: 'Montserrat-Bold',
    borderBottomWidth: 3,
    borderColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: sizes.small,
  },
  tabContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // backgroundColor: colors.gray
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
  footerButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: sizes.medium,
    margin: sizes.small,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  footerButtonText: {
    height: 30,
    color: colors.gray,
    alignItems: "center",
    justifyContent: "center",
    fontSize: sizes.title,
    fontFamily: 'Montserrat-Regular',
  },

})