import React from 'react';
import { View, StyleSheet } from 'react-native';
//this file is for the design of the scanning area only
const Overlay = () => {
  return (
    <View style={styles.overlayContainer}>
     
      <View style={styles.overlay} />
      
     
      <View style={styles.middleRow}>
        <View style={styles.overlay} />
        <View style={styles.scanBox}>

          <View style={styles.topLeftCorner} />
          <View style={styles.topRightCorner} />
          <View style={styles.bottomLeftCorner} />
          <View style={styles.bottomRightCorner} />
        </View>
        <View style={styles.overlay} />
      </View>

      <View style={styles.overlay} />
    </View>
  );
};

export default Overlay;


const cornerStyle = {
  position: 'absolute',
  width: 45, 
  height: 50, 
  borderWidth: 8, 
  borderColor: '#fff', 
  borderRadius: 10, 
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', 
  },
  middleRow: {
    flexDirection: 'row',
    flex: 1,
  },
  scanBox: {
    flex: 3, 
    position: 'relative',
    width: 250, 
    height: 275, 
    borderColor: 'transparent',
  },
  topLeftCorner: {
    ...cornerStyle,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRightCorner: {
    ...cornerStyle,
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeftCorner: {
    ...cornerStyle,
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRightCorner: {
    ...cornerStyle,
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

