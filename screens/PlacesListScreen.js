import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';

import PlaceItem from '../components/PlaceItem';
import * as PlacesActions from '../store/actions/places';

const PlacesListScreen = props => {

  const  dispatch = useDispatch()

  const allPlaces = useSelector(state => state.places.places);

  useEffect(() => {
    dispatch(PlacesActions.loadPlaces());

  }, [dispatch])

  return (
    <View>
      <FlatList data={allPlaces} keyExtractor={item => item.id} 
      renderItem={itemData => 
        <PlaceItem 
        title={itemData.item.title} 
        image={itemData.item.imageUri}
        address={itemData.item.address} 
        onSelect={()=> 
        {props.navigation.navigate('PlaceDetail', 
        {placeTitle: itemData.item.title, placeId: itemData.item.id});}}  /> } 
        />
    </View>
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: 
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Add Place' 
        iconName={Platform.OS==='android'? 'md-add': 'ios-add'} 
        onPress={() => navData.navigation.navigate({routeName:"NewPlace"})}/>
      </HeaderButtons>
    }
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
