import { StyleSheet } from "react-native";

const dialogComponentStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modalView: {
        margin: 2,
        backgroundColor: "white",
        borderRadius: 2,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textButtonStyle: {
        letterSpacing: 1,
        color: '#007AFF'
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default dialogComponentStyle;