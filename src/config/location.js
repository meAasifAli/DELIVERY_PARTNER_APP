// geolocationConfig.js
import Geolocation from "@react-native-community/geolocation";

Geolocation.setRNConfiguration({
    authorizationLevel: "whenInUse",
    enableBackgroundLocationUpdates: true,
    showsBackgroundLocationIndicator: true,
    skipPermissionRequests: true,
});

export default Geolocation;
