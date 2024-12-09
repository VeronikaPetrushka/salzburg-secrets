import { View } from "react-native"
import Home from "../components/Home"
import MenuPanel from "../components/MenuPanel";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Home />
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

export default HomeScreen;