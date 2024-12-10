import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native"

const TastesModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Discover traditional Salzburg dishes and immerse yourself in their culture and history by trying to cook them yourself with simple recipes and captivating stories about the origins of each dish.</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeBtnText}>Learn more !</Text>
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
        backgroundColor: '#fff',
        padding: 20,
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
        padding: 8,
        width: '100%',
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


export default TastesModal;