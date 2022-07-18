import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from '@rneui/themed';

class BalancePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balanceData: this.props.balanceData
        };
    }

    render() {
        return (
            <View>
                <FlatList data={ this.state.balanceData } 
                    keyExtractor={ item => item.id.toString() }
                    renderItem={({item, index}) => {
                        return <>
                            <View>
                                <ListItem>
                                    <ListItem.Title>{item.id}</ListItem.Title>
                                    <ListItem.Content>
                                        <Text>Balance: { item.balance }</Text>
                                        <Text>Date: { item.dateAdded }</Text>
                                        <Text>{ item.isCredit ? 'Crédito' : 'Debito' }</Text>
                                    </ListItem.Content>
                                </ListItem>
                            </View>
                        </>
                    }}
                />
            </View>
        )
    }
}

export default BalancePanel;