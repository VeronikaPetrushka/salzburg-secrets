import { View } from "react-native"
import Topics from "../components/Topics"

const TopicsScreen = ({route}) => {
    const { difficulty } = route.params;

    return (
        <View style={styles.container}>
            <Topics difficulty={difficulty} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TopicsScreen;