import { Dimensions } from "react-native";

let { height, width } = Dimensions.get("window");

export function px2dp(px) {
  // ui 750px 
  return px * Dimensions.get("window").width / 750;
}
