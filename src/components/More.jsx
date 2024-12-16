import React, { useState } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import topics from '../constants/topics';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const More = ({ topic }) => {
    const navigation = useNavigation();
    const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{ flex: 1, transform: [{ rotate: '180deg' }] }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => {
                    if (selectedArticle) {
                        setSelectedArticle(null);
                    } else {
                        navigation.goBack();
                    }
                }}>
                    <Icons type={"home"} />
                </TouchableOpacity>

                {selectedArticle ? (
                    <View style={styles.articleContainer}>
                        <Text style={styles.title}>{selectedArticle.title}</Text>
                        <ScrollView>
                            <Text style={styles.description}>{selectedArticle.description}</Text>
                            <View style={{height: height * 0.1}} />
                        </ScrollView>
                    </View>
                ) : (
                    <>
                        <Text style={styles.title}>{topic}</Text>
                        <ScrollView>
                            {topics
                                .filter((t) => t.topic === topic)
                                .map((filteredTopic) =>
                                    filteredTopic.articles.map((article, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            style={styles.btn}
                                            onPress={() => setSelectedArticle(article)}
                                        >
                                            <Text style={styles.btnText}>{article.title}</Text>
                                        </TouchableOpacity>
                                    ))
                                )}
                        </ScrollView>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: height * 0.15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ rotate: '180deg' }],
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
        fontWeight: '900',
        color: '#7de075',
        marginBottom: height * 0.05,
        textAlign: 'center'
    },

    btn: {
        width: width * 0.85,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#306e29',
        backgroundColor: '#63cc58',
        marginBottom: height * 0.015
    },

    btnText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#306e29',
    },

    articleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },

    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#3b423b',
        lineHeight: 22,
        marginTop: height * 0.02,
        textAlign: 'justify',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10
    }
});

export default More;
