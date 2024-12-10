import { View } from "react-native"
import Mode from "../components/Mode"

const ModeScreen = () => {
    return (
        <View style={styles.container}>
            <Mode />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ModeScreen;