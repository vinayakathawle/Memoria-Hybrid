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
    fontFamily: config.fonts.FONT_BOLD,
    fontWeight: 'bold',
    fontSize: 38,
    paddingTop: 20,
    paddingBottom: 5
  },
  subTitle: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "lightgray",
    fontSize: 20,
    marginLeft: 0,
    paddingBottom: 20,
    lineHeight: 20,
  },

  remember: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "black",
    fontSize: 12,
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 3
  },

  top: {
    justifyContent: 'flex-start',
  },
  
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingBottom: 30,
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
    fontWeight: '300',
    lineHeight: 20,
  },

  forgotPassClickableText: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "#00c6cc",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
    paddingTop: 20
  },

  clickableText: {
    fontFamily: config.fonts.FONT_BOOK,
    color: "#00c6cc",
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingBottom: 0,
    lineHeight: 20,

  },

  wrap: {
    marginTop: 10,
  },

  buttonTitle: {
    fontFamily: config.fonts.FONT_BOOK,
    fontSize: 18,    
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
    borderColor: "lightgray",
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5,
    paddingHorizontal: 10,
    textAlignVertical: 'center'
  },
  TextInput: {
    width: "100%"
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
