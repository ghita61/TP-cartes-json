import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Animated,
} from 'react-native';
import CardItem from './CardItem';
import cards from '../data/cards.json';

export function CardList({ isDark }) {
  const [refreshing, setRefreshing] = useState(false);
  const cardAnims = useRef(cards.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      120,
      cardAnims.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [cardAnims]);

  const renderItem = ({ item, index }) => {
    const animatedStyle = {
      opacity: cardAnims[index],
      transform: [
        {
          translateY: cardAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [60, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={animatedStyle}>
        <CardItem
          title={item.title}
          description={item.description}
          image={item.image}
          url={item.url}
          isDark={isDark}
        />
      </Animated.View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007bff']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
