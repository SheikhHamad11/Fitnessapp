import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text_header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continuewith: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#919191',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  text2: {
    color: 'black',
    fontSize: 15,
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
    color: 'black',
  },
  action: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 1,
    padding: 3,
    paddingLeft: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: 'black',
    // color: '#05375a',
  },
  inBut: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  inBut2: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    padding: 15,
    marginTop: 10,
  },
  textSign: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  textSign2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  forget: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginRight: 10,
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
export default styles;
