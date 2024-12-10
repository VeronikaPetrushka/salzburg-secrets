import { View } from "react-native"
import Archive from "../components/Archive"
import MenuPanel from "../components/MenuPanel";

const ArchiveScreen = () => {
    return (
        <View style={styles.container}>
            <Archive />
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

export default ArchiveScreen;