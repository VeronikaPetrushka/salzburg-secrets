import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, ScrollView } from "react-native"
import Icons from './Icons';

const AboutModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Icons type={'close'} />
                </TouchableOpacity>
                <ScrollView>
                    <Text style={[styles.modalText, {color: '#46a33c', fontWeight: '700', marginBottom: 15}]}>Welcome to the world of care and beauty!</Text>
                    <Text style={styles.modalText}>We created this app to share the magic of Salzburg — a city that has inspired generations of artists, musicians, and travelers. Salzburg is not only the birthplace of the great Mozart but also a unique blend of ancient traditions, modern culture, and breathtaking natural landscapes.</Text>
                    <Text style={styles.modalText}>We aim to offer you exciting tours, captivating games, and interesting facts that will show you the city from its most unexpected angles. In Salzburg Revealed, you can dive into the history, culture, and cuisine of Salzburg, explore its historic neighborhoods, and discover its hidden treasures.</Text>
                    <Text style={styles.modalText}>Get ready for unique adventures in this stunning city — we are sure you will love it as much as we do.</Text>
                </ScrollView>
            </View>
        </View>
    </Modal>
    )
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    modalContent: {
        width: '85%',
        height: '80%',
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 40,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21
    },

    closeBtn: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 5,
        right: 5
    },

})


export default AboutModal;