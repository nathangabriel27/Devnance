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
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

})