import React, { useState, useEffect } from "react";
import { ImageBackground, View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Modal, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height, width } = Dimensions.get("window");

const Recipe = ({ selected, type }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalCost, setModalCost] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [purchasedIngredients, setPurchasedIngredients] = useState(false);
    const [purchasedPreparation, setPurchasedPreparation] = useState(false);
    const [completeModalVisible, setCompleteModalVisible] = useState(false);

    useEffect(() => {
        const fetchPurchaseState = async () => {
            const globalIngredients = JSON.parse(await AsyncStorage.getItem("ingredients")) || [];
            const globalPreparations = JSON.parse(await AsyncStorage.getItem("preparation")) || [];
            const score = await AsyncStorage.getItem("totalScore");
    
            setPurchasedIngredients(globalIngredients.includes(selected.name));
            setPurchasedPreparation(globalPreparations.includes(selected.name));
            setTotalScore(parseInt(score, 10) || 0);
    
            if (globalIngredients.includes(selected.name) && globalPreparations.includes(selected.name)) {
                setCompleteModalVisible(true);
            }
        };
    
        fetchPurchaseState();
    }, [selected.name]);
    
    const handlePurchase = async () => {
        if (totalScore >= modalCost) {
            const newScore = totalScore - modalCost;
            setTotalScore(newScore);
            await AsyncStorage.setItem("totalScore", newScore.toString());
    
            if (modalCost === 500) {
                const globalIngredients = JSON.parse(await AsyncStorage.getItem("ingredients")) || [];
                const updatedIngredients = [...globalIngredients, selected.name];
                await AsyncStorage.setItem("ingredients", JSON.stringify(updatedIngredients));
                setPurchasedIngredients(true);
            } else if (modalCost === 1000) {
                const globalPreparations = JSON.parse(await AsyncStorage.getItem("preparation")) || [];
                const updatedPreparations = [...globalPreparations, selected.name];
                await AsyncStorage.setItem("preparation", JSON.stringify(updatedPreparations));
                setPurchasedPreparation(true);
            }
    
            setModalVisible(false);
    
            if (purchasedIngredients && purchasedPreparation) {
                setCompleteModalVisible(true);
            }
        } else {
            Alert.alert("Insufficient Funds", "You do not have enough points to unlock this item.");
            setModalVisible(false);
        }
    };
    
    const handleButtonPress = (type) => {
        if (type === "ingredients") {
            if (purchasedIngredients) return;
            setModalText(`To unlock ingredients for ${selected.name}, you need to give up them for 500 points.`);
            setModalCost(500);
        } else if (type === "preparation") {
            if (purchasedPreparation) return;
            setModalText(`To unlock preparation for ${selected.name}, you need to give up it for 1000 points.`);
            setModalCost(1000);
        }
        setModalVisible(true);
    };

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{ flex: 1, transform: [{ rotate: '180deg' }] }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={"home"} />
                </TouchableOpacity>

                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={styles.title}>{selected.name}</Text>
                    <Image source={selected.image} style={styles.image} />
                </View>

                {type === "history" ? (
                    <View style={styles.historyContainer}>
                        <ScrollView style={{ width: "100%" }}>
                            <Text style={styles.history}>{selected.history}</Text>
                        </ScrollView>
                    </View>
                ) : (
                    <View style={{ width: "100%", alignItems: "center", marginTop: height * 0.02 }}>
                        <ScrollView style={{width: '100%'}}>
                            {purchasedIngredients ? (
                                <View style={{        
                                    marginBottom: height * 0.02,
                                    backgroundColor: '#fff',
                                    borderRadius: 12,
                                    padding: 10,
                                    width: '100%',
                                    }}>
                                    <Text style={styles.ingredientsBtnText}>Ingredients</Text>
                                    <Text style={styles.unlockedText}>{selected.ingredients}</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.ingredientsBtn, {marginTop: height * 0.03}]}
                                    onPress={() => handleButtonPress("ingredients")}
                                >
                                    <Text style={styles.ingredientsBtnText}>Ingredients</Text>
                                </TouchableOpacity>
                            )}
                            {purchasedPreparation ? (
                                <View style={{        
                                    marginBottom: height * 0.02,
                                    backgroundColor: '#fff',
                                    borderRadius: 12,
                                    padding: 10,
                                    width: '100%',
                                    }}>
                                    <Text style={[styles.ingredientsBtnText, { color: '#9e5706' }]}>Preparation</Text>
                                    <Text style={styles.unlockedText}>{selected.preparation}</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.ingredientsBtn, { backgroundColor: '#f0b573', borderColor: '#9e5706' }]}
                                    onPress={() => handleButtonPress("preparation")}
                                >
                                    <Text style={[styles.ingredientsBtnText, { color: '#9e5706' }]}>Preparation</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                )}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Purchase Required</Text>
                            <Text style={styles.modalDescription}>{modalText}</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: "#7de075" }]}
                                    onPress={handlePurchase}
                                >
                                    <Text style={styles.modalButtonText}>Buy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: "#ff383c" }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={completeModalVisible}
                    onRequestClose={() => setCompleteModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Recipe Unlocked</Text>
                            <Text style={styles.modalDescription}>{selected.complete}</Text>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: "#7de075" }]}
                                onPress={() => setCompleteModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>For sure !</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: height * 0.12,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotate: "180deg" }],
    },
    back: {
        width: 60,
        height: 60,
        padding: 10,
        position: "absolute",
        top: height * 0.04,
        left: 0,
        zIndex: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "900",
        color: "#7de075",
        textAlign: "center",
        marginBottom: height * 0.03,
    },
    image: {
        width: "100%",
        height: height * 0.3,
        borderRadius: 12,
        resizeMode: "cover",
        marginBottom: height * 0.03,
    },
    historyContainer: {
        width: "100%",
        height: height * 0.4,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    history: {
        fontSize: 17,
        fontWeight: "400",
        color: "#2f3b31",
        textAlign: "justify",
    },
    ingredientsBtn: {
        width: "100%",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#8d910c",
        backgroundColor: "#ebf05d",
        marginBottom: height * 0.02,
    },
    ingredientsBtnText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#8d910c",
    },
    unlockedText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#2f3b31",
        textAlign: 'justify',
        marginTop: height * 0.015
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "85%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#1a8f18",
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        width: '48%',
        padding: 7,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#fff",
    },
});

export default Recipe;
