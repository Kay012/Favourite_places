import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';

import * as placeActions from '../store/actions/places';
import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const dispatch = useDispatch()
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const InputChangehandler = text => {
    setTitleValue(text)
  };

  const imageTakenHandler = useCallback((imagePath) =>{
    setSelectedImage(imagePath)
  }, []);

  const onPickedLocationHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, []);

  const savePlaceHandler = ()=> {
    dispatch(placeActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
    // console.log(selectedImage)
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} placeholder="Title" value={titleValue} onChangeText={InputChangehandler}/>
        <ImgPicker onImageTaken={imageTakenHandler}/>
        <LocationPicker navigation={props.navigation} onPickedLocation={onPickedLocationHandler}/>
        <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler}/>
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = navData => {
  return {
    heraderTitle : 'Add Place'
  }
}

const styles = StyleSheet.create({
  form : {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    marginBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default NewPlaceScreen;
