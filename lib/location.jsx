export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(
        new Error("Location is only available in the browser.")
      );
      return;
    }

    if (!("geolocation" in navigator)) {
      reject(
        new Error(
          "Geolocation is not supported by this browser."
        )
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        resolve({
          latitude,
          longitude,
          accuracy,
        });
      },

      (error) => {
        let message = "Unable to get your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location permission was denied. Please allow location access.";
            break;

          case error.POSITION_UNAVAILABLE:
            message =
              "Your current location is unavailable.";
            break;

          case error.TIMEOUT:
            message =
              "Getting your location took too long.";
            break;

          default:
            message =
              "Unable to determine your current location.";
        }

        reject(new Error(message));
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}