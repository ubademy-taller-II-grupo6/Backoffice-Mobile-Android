import { StyleSheet } from "react-native";

const examComponentStyle = StyleSheet.create({
    container: {
        width: 350,
        marginTop: 5,
        backgroundColor: "#E6E6E6",
        borderRadius: 12,
        paddingTop: 15,
        paddingRight: 5,
        paddingBottom: 15,
        paddingLeft: 15
    },
    titleExam: {
        color: "rgba(45,171,255,1)",
        fontWeight: "bold",
        fontSize: 20
    },
    colorDescription: {
        color: "#64676D"
    },
    colorPublished: {
        fontWeight: "bold",
        color: "green"
    }
})

export default examComponentStyle;