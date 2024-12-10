import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image } from "react-native"

const MozartModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Image source={require('../assets/decor/mozart.png')} style={styles.image} />
                <Text style={styles.modalText}>Welcome to a tour that will guide you through the places connected to the life of the great composer Wolfgang Amadeus Mozart. At each stop along the route, you’ll hear stories about his life, works, family, and the people who inspired him.</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeBtnText}>Let’s go !</Text>
                </TouchableOpacity>
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
        width: '89%',
        height: '68%',
        backgroundColor: '#fff',
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

    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',  
        marginBottom: 20,
        borderRadius: 16
    },

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21,
        width: '90%'
    },

    closeBtn: {
        padding: 8,
        width: '90%',
        backgroundColor: '#63cc58',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#306e29'
    },

    closeBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#306e29',
    }
})


export default MozartModal;