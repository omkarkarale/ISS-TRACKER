import axios from "axios";
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default class ISSTrackerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.getISSLocation();
  }

  getISSLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View style={style.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={style.container}>
          <SafeAreaView style={style.droidSafeArea} />
          <ImageBackground
            source={require("../assets/bg.png")}
            style={style.backgroundImage}
          >
            <View style={style.titleBar}>
              <Text style={style.titleText}>ISS Tracker Screen!</Text>
            </View>
            <View style={style.mapContainer}>
              <MapView
                style={style.map}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}
                >
                  <Image
                    source={require("../assets/iss_icon.png")}
                    style={{ height: 50, width: 50 }}
                  />
                </Marker>
              </MapView>
            </View>
            <View style={style.infoContainer}>
              <Text style={style.infoText}>
                Latitude: {this.state.location.latitude}
              </Text>
              <Text style={style.infoText}>
                Longitude: {this.state.location.longitude}
              </Text>
              <Text style={style.infoText}>
                Altitude (KM): {this.state.location.altitude}
              </Text>
              <Text style={style.infoText}>
                Velocity (KM/H): {this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleBar: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    flex: 0.7,
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: "white",
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  infoText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
