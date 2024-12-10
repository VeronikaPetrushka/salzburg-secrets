import { View } from "react-native"
import Mozart from "../components/Mozart"
import MenuPanel from "../components/MenuPanel";

const MozartScreen = () => {
    return (
        <View style={styles.container}>
            <Mozart />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 0
    }
}

export default MozartScreen;