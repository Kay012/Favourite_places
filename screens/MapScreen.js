import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';

const MapScreen = props => {

  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  const [selectLocation, setSelectLocation] =useState();
  

  const mapRegion = {
    latitude:  initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta : 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = (event) =>{
    if (readonly) {
      return;
    }
    setSelectLocation({
      lat : event.nativeEvent.coordinate.latitude,
      lng : event.nativeEvent.coordinate.longitude}
      )
  }
  let markerCoordinates;
  if (selectLocation) {
    markerCoordinates = {
      latitude: selectLocation.lat,
      longitude: selectLocation.lng
    }
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocation) {
      Alert.alert('No Location Selected', 'Select Location', [{text: 'Okay'}]);
      return;
    }
    props.navigation.navigate('NewPlace', {pickedLocation: selectLocation});
  }, [selectLocation]);

  useEffect (() =>{
    props.navigation.setParams({saveLocation: savePickedLocationHandler})

  }, [savePickedLocationHandler])

  return (
    <MapView style={styles.map}region={mapRegion} onPress={selectLocationHandler}>
      {selectLocation && (
        <Marker title='Picked Location' coordinate={markerCoordinates}/>
      )}

    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const savePickedLocation = navData.navigation.getParam('saveLocation')
  const readonly = navData.navigation.getParam('readonly')
  return {
    headerRight: (
      !readonly? <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Save' 
        iconName={Platform.OS=== 'android'? 'md-save': 'ios-save'} 
        onPress={savePickedLocation}/>

      </HeaderButtons>
      : null
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;
