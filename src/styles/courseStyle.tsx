import { StyleSheet } from "react-native";
const courseStyle = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 5
      },
      rect: {
        width: 350,
        height: 93,
        backgroundColor: "#E6E6E6",
        borderRadius: 14
      },
      nombreDelCurso: {
        color: "#121212",
        fontWeight: "bold",
        height: 20,
        width: 157
      },
      icon: {
        color: "rgba(128,128,128,1)",
        alignContent: 'flex-end'
      },
      nombreDelCursoRow: {
        height: 20,
        flexDirection: "row",
        marginTop: 12,
        marginLeft: 11,
        marginRight: 49,
        alignContent: 'space-around'
      },
      loremIpsum: {
        color: "#121212",
        height: 20,
        width: 157,
        marginTop: 2,
        marginLeft: 11
      },
      loremIpsum2: {
        color: "#121212",
        height: 20,
        width: 119,
        marginTop: 5,
        marginLeft: 11
      },
    contentCards:{
        height:'100%',
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    cardOption:{
        height:100,
        width:300,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        marginVertical:8,
        borderRadius:2,
        elevation: 2,
        position:'relative'
    },
    titleText:{
        color:'#363636',
        fontSize:18,
        paddingLeft:15,
        fontWeight:'700'
    },
})

export default courseStyle;