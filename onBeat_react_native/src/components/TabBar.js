import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import posed from "react-native-pose";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 5;
const SpotLight = posed.View({
  route0: { x: 0 },
  route1: { x: tabWidth },
  route2: { x: tabWidth * 2 },
  route3: { x: tabWidth * 3 },
  route4: { x: tabWidth * 4 }
});

const Scaler = posed.View({
    active: { scale: 1.25 },
    inactive: { scale: 1 }
  });


const S = StyleSheet.create({
  container: { flexDirection: "row", height: 70, elevation: 10, backgroundColor: '#151515'},
  tabButton: { flex: 1, justifyContent: "center", alignItems: "center",},
  spotLight: {
    width: tabWidth,
    height: "100%",
    backgroundColor: 'darkslateblue',
    opacity: .5,
    borderRadius: -5
  },
  textStyle:{
      color : 'white',
      opacity: .7,
      fontFamily: 'Futura',
  }
});

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
        <View style={S.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`} />
            </View>

        {routes.map((route, routeIndex) => {
            const isRouteActive = routeIndex === activeRouteIndex;
            const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

            return (
            <TouchableOpacity
                key={routeIndex}
                style={S.tabButton}
                onPress={() => {
                onTabPress({ route });
                }}
                onLongPress={() => {
                onTabLongPress({ route });
                }}
                accessibilityLabel={getAccessibilityLabel({ route })}
            >
            <Scaler style={S.scaler} pose={isRouteActive ? "active" : "inactive"}>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
            </Scaler>

           

            </TouchableOpacity>
            );
        })}
        </View>
  );
};

export default TabBar;