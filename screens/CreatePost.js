import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

let customFonts = {
  'IBS': require('../assets/IBS_Cartooning.ttf'),
};

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: 'image1',
      dropdownHeight: 40,
    };
  }

  async loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      let previewimages = {
        image1: require('../assets/image_1.jpg'),
        image2: require('../assets/image_2.jpg'),
        image3: require('../assets/image_3.jpg'),
        image4: require('../assets/image_4.jpg'),
        image5: require('../assets/image_5.jpg'),
      };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <Image
              source={previewimages[this.state.previewImage]}
              style={styles.previewImage}></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                items={[
                  { label: 'Image 1', value: 'image1' },
                  { label: 'Image 2', value: 'image2' },
                  { label: 'Image 3', value: 'image3' },
                  { label: 'Image 4', value: 'image4' },
                  { label: 'Image 5', value: 'image5' },
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropdownHeight == 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: 'white',
                }}
                textStyle={{
                  color: this.state.dropdownHeight == 170 ? 'black' : 'white',
                  fontFamily: 'IBS',
                }}
                onSelectItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  })
                }
              />
            </View>
            <ScrollView>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={'title'}
                placeholderTextColor="white"
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChagneText={(description) => this.setState({ description })}
                placeholder={'description'}
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={() => this.setState({  })}
                placeholder={''}
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={20}
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(moral) => this.setState({ moral })}
                placeholder={"moral"}
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={5}
              />
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'IBS',
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    marginTop: RFValue(10),
    fontFamily: 'IBS',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig:{
    textAlignVertical:"top",
    padding:RFValue(5)
  }
});
