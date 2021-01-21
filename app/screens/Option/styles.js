import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: config.color.COLOR_WHITE,
  },
  description: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "#000000",
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '400',
    paddingTop: 30,
    paddingBottom: 10
  }
});

export default styles;
