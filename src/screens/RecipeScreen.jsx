import { View } from "react-native"
import Recipe from "../components/Recipe"

const RecipeScreen = ({ route }) => {
    const { selected, type } = route.params;

    return (
        <View style={styles.container}>
            <Recipe selected={selected} type={type} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default RecipeScreen;