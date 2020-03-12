import { StyleSheet, Dimensions } from "react-native";

let deviceWidth = Dimensions.get('window').width
let textColor = '#fff'
let appFont = 'Futura'
let backgroundColorBase = '#292929'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColorBase
    
  },
  containerSearchPage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: backgroundColorBase
    
  },
  
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: backgroundColorBase
    
  },

  playerOptionsContainer: {
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColorBase
    
  },
  buttonStyle:{
    margin: 20,
    backgroundColor: 'darkslateblue',
    width : deviceWidth - 30
    
  },
  
  buttonTitleStyle:{
    color: textColor,
    fontFamily: appFont,
    fontSize: 25,
  },
  inputStyle:{
    marginLeft : 0, 
    marginHorizontal: 0,
    
  },
  iconStyle:{
    marginRight : 10,
    
  },
  iconStyleListening:{
    marginHorizontal : -10,
    marginVertical: 30
  
  },
  headerStyle:{
    position: 'absolute',
    top: 0,
    width: deviceWidth,

  },
  imageStyle:{
    justifyContent: 'center',
    marginTop: 80,
    marginHorizontal: 0,
    marginBottom: 30,
    width : 310,
    height : 310,
  },
  textStyleHeader:{
    fontWeight: 'bold',
    color: textColor,
    fontFamily: appFont,
    fontSize: 25, 
  },
  iconTabStyle:{
    margin : 4
  },
  
  textStyleRoomKey:{
    color: textColor,
    fontFamily: appFont,
    fontSize: 20, 
  },
  textStyleSong:{
    fontWeight: 'bold',
    color: textColor,
    fontFamily: appFont,
    fontSize: 25, 
  },
  textStyleArtist:{
    color: textColor,
    opacity: .3,
    fontFamily: appFont,
    fontSize: 13,
    margin: 10,
  },
  textStyleInput:{
    color: textColor,
    fontFamily: appFont,
    fontSize: 13,
  },
  textStyleLabel:{
    color: '#898989',
    fontFamily: appFont,
    fontSize: 17,
  },
  textStyleInputText:{
    color: textColor,

    fontFamily: appFont,
    fontSize: 13,
    margin: 10
  },
  iconPlayer:{
    marginHorizontal: 50
  },
  centerPageAlignment:{
    justifyContent: "center",
    marginVertical: 175,
    alignItems: "center"
  },
});

export default styles;