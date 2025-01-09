import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  Code,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const App = () => {
  // layout for the camera+
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;


  // referencing camera component for saving the images
  const camera = useRef<Camera | null>(null);
  const [imageData, setImageData] = useState('');

  // get the back camera devic
  const device = useCameraDevice('back');
  // console.log("Camera Device: ", device);  // debug

  // state variable for camera permission
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission: string = await Camera.requestCameraPermission();
      console.log('Camera Permission: ', cameraPermission);
      if (cameraPermission !== 'granted') await Linking.openSettings();
      setPermissionGranted(cameraPermission === 'granted');
    };
    getPermission();
  }, []);

  // ====== COMMENT - START ======
  // capturePhoto is yet to be implemented
  // ====== COMMENT - END ======
  const capturePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({});
      setImageData(photo?.path ?? '');
      console.log(photo?.path);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      console.log(`Scanned ${codes[0].value} codes!`);
    },
  });

  // remember to handle all the permissions here.....
  if (!permissionGranted) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{color: 'red'}}>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{color: 'white'}}>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Camera
          ref={camera}
          style={{width: width, height: height}}
          device={device}
          isActive={true}
          photo={true}
          resizeMode="cover"
          codeScanner={codeScanner}
        />
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderWidth: 5,
            borderRadius: 30,
            borderColor: 'white',
            backgroundColor: 'red',
            position: 'absolute',
            bottom: 60,
            alignSelf: 'center',
          }}
          onPress={capturePhoto}
        />
      </View>
    </ScrollView>
  );
};

export default App;
