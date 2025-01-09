
// ======= COMMENT - Start ==========
// not implemented yet, just for debugging
// make the whole code modular
// ======= COMMENT - End ========

import { View, Text, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const CameraScreen = () => {

  const [hasPermission, setHasPermission] = useState<Boolean>(false);

  const cameraRef = useRef<Camera>(null);
  const backCam = useCameraDevice('back');

  // request permission for camera and gallery
  useEffect(() => {
    const requestPermissions = async () => {
      // request camera permission
      const newCameraPermission = await Camera.requestCameraPermission();

      // requrest external storage permission for android
      const galleryPermission = Platform.OS === 'android' 
        ? await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ) : 'granted'
    }
  }, [])

  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  )
}

export default CameraScreen