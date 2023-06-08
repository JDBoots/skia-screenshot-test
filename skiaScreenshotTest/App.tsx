import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Canvas,
  Image,
  SkImage,
  makeImageFromView,
  useImage,
} from '@shopify/react-native-skia';

const PUPPY_TO_MAKE_YOUR_DAY_BETTER =
  'https://images.squarespace-cdn.com/content/v1/54e7a1a6e4b08db9da801ded/7f2dae36-5650-4b84-b184-684f46fe68aa/98.jpg';

const styles = StyleSheet.create({
  salmonContainer: {
    backgroundColor: 'salmon',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    marginTop: 80,
  },
  limeContainer: {
    backgroundColor: 'lime',
    position: 'absolute',
    bottom: 20,
    padding: 20,
    alignSelf: 'center',
  },
  black: {
    color: 'black',
    textAlign: 'center',
  },
});

const App = () => {
  const {height, width} = useWindowDimensions();
  const image = useImage(PUPPY_TO_MAKE_YOUR_DAY_BETTER);
  const [snapShot, setSnapShot] = useState<SkImage | null>(null);
  const snapRef = useRef<View | null>(null);

  const makeSnapshot = async () => {
    const newSnap = await makeImageFromView(snapRef);
    setSnapShot(newSnap);
  };

  const resetSnapshot = () => setSnapShot(null);

  return !snapShot ? (
    <View ref={snapRef}>
      <Canvas style={{width, height}}>
        <Image image={image} height={height} width={width} fit={'cover'} />
      </Canvas>
      <View style={styles.salmonContainer}>
        <Text style={styles.black}>Let me be a part of your snapshot!</Text>
      </View>
      <TouchableOpacity style={styles.limeContainer} onPress={makeSnapshot}>
        <Text style={styles.black}>Make snapshot</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <>
      <Canvas
        style={{
          width: width,
          height: height,
        }}>
        <Image image={snapShot} height={height} width={width} />
      </Canvas>
      <TouchableOpacity style={styles.limeContainer} onPress={resetSnapshot}>
        <Text style={styles.black}>Reset snapshot</Text>
      </TouchableOpacity>
    </>
  );
};

export default App;
