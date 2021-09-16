/* eslint-disable react-native/no-inline-styles */

import {ActivityIndicator, Modal, View, Text} from 'react-native';
import React from 'react';

export type Props = {
  isLoading: boolean;
};

export const Loader: React.FC<Props> = ({isLoading = false}) => {
  return (
    <Modal
      animationType={'fade'}
      visible={isLoading}
      transparent={true}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 150,
            height: 159,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: 'black',
          }}>
          <ActivityIndicator color="white" size={'large'} />
          <Text style={{color: 'white', fontWeight: 'bold', marginTop: 20}}>
            {'Loading'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
