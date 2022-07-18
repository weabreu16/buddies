import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Icon } from '@rneui/themed';
import imageSample from '../../assets/1.jpg';

function Contact(props) {
    return (
        <View style={styles.mainCardView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.subCardView}>
                    <Image
                        source={ props.contact.image ? 
                            {uri: `data:image/png;base64,${props.contact.image}`} 
                            : imageSample }
                        resizeMode="contain"
                        style={ styles.image }
                    />
                </View>

                <View style={{marginLeft: 12}}>
                    <Text style={ styles.heading }>{ props.contact.name }</Text>

                    <View style={ styles.subTextContainer }>
                        <Text style={ styles.subText }>{ props.contact.phone }</Text>
                    </View>
                </View>
            </View>
            <View style={ styles.rightComponent }>
                <Icon
                    name='arrow-forward-ios'
                    type='material'
                    color='#2f2f2f'
                    width='100%'
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    mainCardView: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginLeft: 6,
        marginRight: 6,
    },

    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        borderColor: '#eeeeee',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },

    heading: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

    subTextContainer: {
        marginTop: 4,
        borderWidth: 0,
        width: '100%',
    },

    subText: {
        color: '#000',
        fontSize: 12,
    },

    rightComponent: {
        height: 25,
        borderWidth: 0,
        width: 25,
        marginLeft: -26,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
});

export default Contact;

/*
rightComponent: {
    height: 25,
    backgroundColor: '#ff1493',
    borderWidth: 0,
    width: 25,
    marginLeft: -26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
}
*/