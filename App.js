import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, Switch, Text } from 'react-native';
import { CardList } from './components/CardList';

export default function App() {
  const [isDark, setIsDark] = useState(false); // manual control

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121212' : '#f6f7fb' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: isDark ? '#fff' : '#333', marginRight: 8 }}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <CardList isDark={isDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
