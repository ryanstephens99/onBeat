import { StyleSheet, Dimensions } from "react-native";


deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
    
  },
  playerOptionsContainer: {
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
    
  },
  buttonStyle:{
    margin: 20
  },
  inputStyle:{
    marginBottom : 15,
    marginLeft : 0,
    // flex: 1
  },
  iconStyle:{
    marginRight : 10
  },
  iconTabStyle:{
    margin : 5
  },
  hyperlinkText:{
    textDecorationLine: 'underline',
    margin: 3,
    textAlign : 'center',
    color: 'cornflowerblue'
  },
  headerStyle:{
    position: 'absolute',
    top: 0,
    width: deviceWidth,
  },
  imageStyle:{
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 40,
    width : 300,
    height : 300,
  },
  textStyleHeader:{
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Futura',
    fontSize: 25, 
  },
  
  textStyleRoomKey:{

    color: '#fff',
    fontFamily: 'Futura',
    fontSize: 20, 
  },
  textStyleSong:{
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Futura',
    fontSize: 25, 
  },
  textStyleArtist:{
    color: '#fff',
    opacity: .3,
    fontFamily: 'Futura',
    fontSize: 13,
    margin: 10
  },
  iconPlayer:{
    marginHorizontal: 50
  }
});

export default styles;