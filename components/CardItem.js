import React, { useRef, useState } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Linking, Share } from 'react-native';

export default function CardItem({ title, description, image, url, isDark }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [liked, setLiked] = useState(false);
  const likeScale = useRef(new Animated.Value(1)).current;
const handleLongPressLike = () => {
    if (!liked) {
      setLiked(true);
      Animated.sequence([
        Animated.timing(likeScale, { toValue: 1.8, duration: 100, useNativeDriver: true }),
        Animated.spring(likeScale, { toValue: 1, friction: 3, useNativeDriver: true }),
      ]).start();
    }
  };
  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start(() => {
      if (url) Linking.openURL(url);
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(likeScale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(likeScale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const shareLink = async () => {
    if (url) await Share.share({ message: `Check this out: ${title}\n${url}` });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#fff',
            transform: [{ scale }],
            shadowColor: isDark ? '#000' : '#aaa',
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cover} resizeMode="cover" />
          <View style={styles.actionOverlay}>
            <TouchableOpacity
                onPress={handleLike}
                onLongPress={handleLongPressLike}
                delayLongPress={300}   // makes burst feel instant
                activeOpacity={0.7}
                style={{ marginRight: 10 }}
            >
              <Animated.View
                style={[
                  styles.actionCircle,
                  {
                    backgroundColor: liked ? '#007bff' : 'rgba(255,255,255,0.8)',
                    transform: [{ scale: likeScale }],
                  },
                ]}
              >
                <Text style={{ fontSize: 20, color: liked ? '#fff' : '#333' }}>👍</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={shareLink}>
              <View style={[styles.actionCircle, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
                <Text style={{ fontSize: 20, color: '#333' }}>🔗</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#222' }]}>{title}</Text>
          <Text style={[styles.desc, { color: isDark ? '#ccc' : '#555' }]}>{description}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  imageContainer: {
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
