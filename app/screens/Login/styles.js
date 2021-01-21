import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.COLOR_WHITE
  },
  subContainer: {
    flex: 1,
    padding: 20
  },
  welcomeTitle: {
    fontFamily: config.fonts.FONT_BLACK,
    fontWeight: 'bold',
    fontSize: 38,
    marginLeft: 0,
    paddingTop: 10
  },
  subTitle: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "lightgray",
    fontSize: 20,
    marginLeft: 0,
    paddingBottom: 20
  },
  top: {
    justifyContent: 'flex-start',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottonText: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "#000000",
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    paddingBottom: 10
  },
  bottonSubText: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "#000000",
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300'
  },
  forgotPassClickableText: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "blue",
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    paddingTop: 20
  },
  clickableText: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "blue",
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300'
  },
  wrap: {
    marginTop: 20
  },
  buttonTitle: {
    fontFamily: config.fonts.FONT_BOOK
  },
  image: {
    marginBottom: 40,
  },
  bottonView: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: "100%",
    height: 45,
    marginBottom: 15,
    alignItems: "center",
    borderColor: "lightgray",
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
    position: 'relative'
  },
  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  rememberWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default styles;
