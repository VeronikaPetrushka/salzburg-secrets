import { View } from "react-native"
import Tastes from "../components/Tastes"
import MenuPanel from "../components/MenuPanel";

const TastesScreen = () => {
    return (
        <View style={styles.container}>
            <Tastes />
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

export default TastesScreen;