import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const Archive = () => {
    const navigation = useNavigation();
    const [archive, setArchive] = useState([]);
    const [expandedCards, setExpandedCards] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [purchasedItems, setPurchasedItems] = useState({});

    useEffect(() => {
        const fetchArchive = async () => {
            const storedArchive = await AsyncStorage.getItem("archive");
            if (storedArchive) {
                setArchive(JSON.parse(storedArchive));
            }
        };

        const fetchTotalScore = async () => {
            const score = await AsyncStorage.getItem("totalScore");
            setTotalScore(parseInt(score, 10) || 0);
        };

        const fetchPurchasedItems = async () => {
            const storedPurchasedItems = await AsyncStorage.getItem("purchasedItems");
            setPurchasedItems(JSON.parse(storedPurchasedItems) || {});
        };

        fetchArchive();
        fetchTotalScore();
        fetchPurchasedItems();
    }, []);

    const handleRemoveFromArchive = async (title) => {
        const updatedArchive = archive.filter((item) => item.title !== title);
        setArchive(updatedArchive);
        await AsyncStorage.setItem("archive", JSON.stringify(updatedArchive));
    };

    const toggleExpand = (title) => {
        setExpandedCards((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const handleMoreTopics = async (item) => {
        if (purchasedItems[item.title]) {
            navigation.navigate("MoreScreen", { topic: item.title });
        } else if (totalScore >= 2000) {
            setSelectedItem(item);
            setModalVisible(true);
        } else {
            Alert.alert(
                "Insufficient Funds",
                `You need at least 2000 points to unlock topics for ${item.title}.`
            );
        }
    };

    const handlePurchase = async () => {
        const newTotalScore = totalScore - 2000;
        const updatedPurchasedItems = { ...purchasedItems, [selectedItem.title]: true };

        setTotalScore(newTotalScore);
        setPurchasedItems(updatedPurchasedItems);
        await AsyncStorage.setItem("totalScore", newTotalScore.toString());
        await AsyncStorage.setItem("purchasedItems", JSON.stringify(updatedPurchasedItems));

        setModalVisible(false);
        navigation.navigate("MoreScreen", { topic: selectedItem.title });
    };

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text
                style={styles.cardDescription}
                numberOfLines={expandedCards[item.title] ? 0 : 3}
                ellipsizeMode="tail"
            >
                {item.description}
            </Text>
            <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", marginBottom: height * 0.015 }}>
                <TouchableOpacity
                    style={[styles.removeButton, { width: "48%" }]}
                    onPress={() => handleMoreTopics(item)}
                >
                    <Text style={styles.removeButtonText}>
                        {purchasedItems[item.title] ? "Go to Topics" : "More Topics"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.removeButton, { width: "48%" }]}
                    onPress={() => toggleExpand(item.title)}
                >
                    <Text style={styles.removeButtonText}>
                        {expandedCards[item.title] ? "Show less" : "Show more"}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.removeButton, { borderColor: "#bf0407" }]}
                onPress={() => handleRemoveFromArchive(item.title)}
            >
                <Text style={[styles.removeButtonText, { color: "#bf0407" }]}>Remove from Archive</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground source={require("../assets/back/2.png")} style={{ flex: 1, transform: [{ rotate: "180deg" }] }}>
            <View style={styles.container}>
                <Text style={styles.title}>Archive</Text>
                {archive.length > 0 ? (
                    <FlatList
                        data={archive}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderCard}
                        contentContainerStyle={styles.listContainer}
                    />
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.noItemsText}>No items in the archive yet. Complete successfully Discover quizzes and save favorite stories and facts to Archive !</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("TopicsScreen", { difficulty: "discovery" })}>
                            <Text style={styles.btnText}>Discovery mode</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {selectedItem && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>
                                    Unlock More Topics
                                </Text>
                                <Text style={styles.modalDescription}>
                                    To unlock more topics for {selectedItem.title}, you need to buy access for 2000 points. Would you like to proceed?
                                </Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, { backgroundColor: "#7de075" }]}
                                        onPress={handlePurchase}
                                    >
                                        <Text style={styles.modalButtonText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, { backgroundColor: "#ff383c" }]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.modalButtonText}>Maybe, later</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.12,
        alignItems: "center",
        justifyContent: "flex-start",
        transform: [{ rotate: "180deg" }],
    },
    title: {
        fontWeight: '900',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: height * 0.05,
        color: '#7de075',
    },
    noItemsText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#89cc93",
        textAlign: "center",
        marginBottom: height * 0.05
    },
    listContainer: {
        width: "100%",
        alignItems: "center",
    },
    card: {
        width: "100%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: height * 0.03,
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1a8f18",
        marginBottom: height * 0.015,
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 17,
        fontWeight: "400",
        color: "#3b423b",
        marginBottom: height * 0.03,
        textAlign: "justify",
        lineHeight: 22,
    },
    removeButton: {
        width: 300,
        padding: 7,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#306e29",
        backgroundColor: "#63cc58",
    },
    removeButtonText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#306e29",
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
        padding: 7,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        width: '48%'
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#fff",
    },
    btn: {
        width: width * 0.8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#306e29',
        backgroundColor: '#63cc58',
    },

    btnText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#306e29',
    }
});

export default Archive;
