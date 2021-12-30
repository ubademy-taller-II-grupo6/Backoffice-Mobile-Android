import { StyleSheet } from "react-native";

const courseDetailStyle = StyleSheet.create({
    titleCourse: {
        borderBottomColor: "rgba(45,171,255,1)",
        borderBottomWidth: 1,
        flexDirection: 'row'
        /* border-bottom-color: black;
        border-bottom-width: 2px; */
    },
    titleTextCourse: {
        color: "rgba(45,171,255,1)",
        fontWeight: "bold",
        fontSize: 15,
    }
})

export default courseDetailStyle;