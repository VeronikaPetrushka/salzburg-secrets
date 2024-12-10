import { View } from "react-native"
import DiscoveryQuiz from "../components/DiscoveryQuiz"

const DiscoveryQuizScreen = ({route}) => {
    const { quiz } = route.params;

    return (
        <View style={styles.container}>
            <DiscoveryQuiz quiz={quiz} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DiscoveryQuizScreen;