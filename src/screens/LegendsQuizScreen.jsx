import { View } from "react-native"
import LegendsQuiz from "../components/LegendsQuiz"

const LegendsQuizScreen = ({route}) => {
    const { quiz } = route.params;

    return (
        <View style={styles.container}>
            <LegendsQuiz quiz={quiz} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default LegendsQuizScreen;