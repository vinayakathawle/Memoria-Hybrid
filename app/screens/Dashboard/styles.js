import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

export default styles;
