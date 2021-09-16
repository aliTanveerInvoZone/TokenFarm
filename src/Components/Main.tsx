/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SellForm} from './SellForm';
import {BuyForm} from './buyForm';

export type Props = {
  ethBalance: string;
  tokenBalance: String;
  buyTokens: Function;
  sellTokens: Function;
};

export const Main: React.FC<Props> = ({
  ethBalance,
  tokenBalance,
  buyTokens,
  sellTokens,
}) => {
  const [exchangeType, setExchangeType] = React.useState('buy');

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: '10%',

          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: 30,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            setExchangeType('sell');
          }}
          style={{
            backgroundColor: exchangeType === 'sell' ? 'black' : 'white',
            width: '30%',
            justifyContent: 'center',
            borderRadius: 8,
            height: 40,
            borderWidth: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: exchangeType === 'sell' ? 'white' : 'black',
              fontWeight: 'bold',
            }}>
            {'SELL'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setExchangeType('buy');
          }}
          style={{
            backgroundColor: exchangeType === 'buy' ? 'black' : 'white',
            width: '30%',
            justifyContent: 'center',
            borderRadius: 8,
            height: 40,
            borderWidth: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: exchangeType === 'buy' ? 'white' : 'black',
              fontWeight: 'bold',
            }}>
            {'BUY'}
          </Text>
        </TouchableOpacity>
      </View>

      {exchangeType === 'sell' ? (
        <SellForm
          ethBalance={ethBalance}
          tokenBalance={tokenBalance.toString()}
          sellTokens={sellTokens}
        />
      ) : (
        <BuyForm
          ethBalance={ethBalance}
          tokenBalance={tokenBalance.toString()}
          buyTokens={buyTokens}
        />
      )}
    </View>
  );
};
