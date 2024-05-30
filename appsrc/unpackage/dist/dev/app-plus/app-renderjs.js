var __renderjsModules={};

__renderjsModules["7e839308"] = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });
  var meMarker = [];
  var polylinePath = null;
  var stdin_default = {
    data() {
      return {
        map: {},
        directionsService: {},
        receiveLocaDate: {
          lat: "",
          lon: ""
        },
        receiveTraceDate: [],
        routesInfo: []
      };
    },
    mounted() {
      let _this = this;
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4&libraries=places&callback=initMap&region=UK";
      window.initMap = function() {
        setTimeout(() => {
          __f__("log", "at pages/map/map.vue:167", "renderScript");
          _this.initMap();
        }, 1500);
      };
      document.head.appendChild(script);
    },
    methods: {
      getData(newValue) {
        __f__("log", "at pages/map/map.vue:177", "newValue", newValue.lat);
        if (newValue) {
          this.receiveLocaDate = newValue;
        }
      },
      loadGoogleMapsScript() {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
        script.async = true;
        script.defer = true;
        script.onload = this.initMap;
        document.head.appendChild(script);
      },
      initMap() {
        return __async(this, null, function* () {
          this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 37.7749, lng: -122.4194 },
            zoom: 10
          });
          this.directionsService = new google.maps.DirectionsService();
          const start = this.receiveLocaDate.startLoc;
          const end = this.receiveLocaDate.endLoc;
          this.directionsService.route({
            origin: start,
            destination: end,
            travelMode: this.receiveLocaDate.selectedMode,
            provideRouteAlternatives: true
          }, (response, status) => __async(this, null, function* () {
            if (status === "OK") {
              this.routesInfo = [];
              const routes = response.routes;
              for (let i = 0; i < routes.length; i++) {
                const route = routes[i];
                new google.maps.DirectionsRenderer({
                  map: this.map,
                  directions: response,
                  routeIndex: i,
                  polylineOptions: {
                    strokeColor: this.getRandomColor()
                  }
                });
                yield this.displayAirQualityAlongRoute(route, i);
              }
            } else {
              uni.showToast({
                title: "Directions request failed due to " + status,
                icon: "none"
              });
            }
          }));
        });
      },
      getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      displayAirQualityAlongRoute(route, index) {
        return __async(this, null, function* () {
          let totalDuration = 0;
          let totalDistance = 0;
          let totalAirQuality = 0;
          let stepsCount = 0;
          for (let leg of route.legs) {
            totalDuration += leg.duration.value / 60;
            totalDistance += leg.distance.value / 1e3;
            for (let step of leg.steps) {
              const location = step.start_location;
              const airQuality = yield this.getAirQuality(location.lat(), location.lng());
              const placeName = yield this.getPlaceName(location.lat(), location.lng());
              if (airQuality) {
                totalAirQuality += airQuality.aqi;
                stepsCount++;
                const color = `rgb(${Math.round(airQuality.color.red * 255)}, ${Math.round(airQuality.color.green * 255)}, ${Math.round(airQuality.color.blue * 255)})`;
                const marker = new google.maps.Marker({
                  position: location,
                  map: this.map,
                  icon: this.getCircle(color)
                });
                const infoWindow = new google.maps.InfoWindow({
                  content: `<div class="infoWindow">
			                          <strong>Location:</strong> ${placeName}<br>
			                          <strong>Air Quality:</strong> ${airQuality.aqiDisplay} (${airQuality.category})<br>
			                          <strong>Dominant Pollutant:</strong> ${airQuality.dominantPollutant}
			                        </div>`
                });
                marker.addListener("click", function() {
                  infoWindow.open(this.map, this);
                });
              }
            }
          }
          const averageAirQuality = stepsCount ? totalAirQuality / stepsCount : Infinity;
          this.displayHealthTips(index + 1, averageAirQuality);
          let pollutionLevel = "";
          if (averageAirQuality <= 50) {
            pollutionLevel = "Low Pollution";
          } else if (averageAirQuality <= 100) {
            pollutionLevel = "Moderate Pollution";
          } else {
            pollutionLevel = "High Pollution";
          }
          const listItem = document.createElement("li");
          listItem.innerHTML = `<strong>Route ${index + 1}</strong>: ${totalDuration.toFixed(2)} mins, ${totalDistance.toFixed(2)} km, ${pollutionLevel}`;
          document.getElementById("routes-list").appendChild(listItem);
          this.routesInfo.push({
            duration: totalDuration.toFixed(2),
            distance: totalDistance.toFixed(2),
            pollution: pollutionLevel
          });
        });
      },
      getAirQuality(lat, lng) {
        return __async(this, null, function* () {
          const apiKey = "AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4";
          const response = yield fetch(`https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              location: {
                latitude: lat,
                longitude: lng
              }
            })
          });
          const data = yield response.json();
          if (data.indexes && data.indexes.length > 0) {
            return data.indexes[0];
          } else {
            __f__("error", "at pages/map/map.vue:318", "No air quality data found for this location.");
            return null;
          }
        });
      },
      getPlaceName(lat, lng) {
        return __async(this, null, function* () {
          const apiKey = "AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4";
          const response = yield fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
          const data = yield response.json();
          if (data.results && data.results.length > 0) {
            return data.results[0].formatted_address;
          } else {
            __f__("error", "at pages/map/map.vue:329", "No place name found for this location.");
            return "Unknown location";
          }
        });
      },
      getCircle(color) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const size = 20;
        canvas.width = size;
        canvas.height = size;
        context.beginPath();
        context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        return {
          url: canvas.toDataURL(),
          size: new google.maps.Size(size, size),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(size / 2, size / 2),
          scaledSize: new google.maps.Size(size, size)
        };
      },
      displayHealthTips(index, averageAirQuality) {
        return __async(this, null, function* () {
          const healthTips = document.querySelector(".health-tips");
          const h3Item = document.createElement("h3");
          h3Item.innerHTML = `<h3>Router ${index}:Health & Safety Tips</h3>`;
          healthTips.appendChild(h3Item);
          const tipsPerQuality = {
            "Low Pollution": [
              "<strong>Wear a Mask</strong>: Use a mask that filters out fine particles (PM2.5) to protect your respiratory system, especially on days with high pollution.",
              "<strong>Travel During Low Traffic Times</strong>: Plan your routes during early mornings or late evenings when pollution levels tend to be lower due to reduced traffic.",
              "<strong>Choose Greener Paths</strong>: Opt for routes that go through parks or areas with more greenery, as plants can help absorb pollutants.",
              "<strong>Stay Hydrated</strong>: Drink plenty of water to help your body flush out toxins and stay hydrated, which can improve your overall resistance to pollution.",
              "<strong>Limit Exposure to Pollutants</strong>: Minimize outdoor activities on high pollution days and spend more time indoors."
            ],
            "Moderate Pollution": [
              "<strong>Monitor Air Quality</strong>: Regularly check the air quality index (AQI) and avoid outdoor activities when pollution levels are high.",
              "<strong>Limit Intense Activities</strong>: Avoid strenuous activities like running or cycling on high pollution days to reduce the amount of pollutants you inhale.",
              "<strong>Use Protective Gear</strong>: Wear protective eyewear to prevent irritation from pollutants, and consider using air purifiers at home to ensure clean indoor air.",
              "<strong>Take Shorter Routes</strong>: Opt for shorter routes or use public transportation to reduce your exposure to outdoor pollutants.",
              "<strong>Eat Healthily</strong>: Consume foods rich in antioxidants, such as fruits and vegetables, to help your body fight the effects of pollution."
            ],
            "High Pollution": [
              "<strong>Stay Informed</strong>: Keep yourself updated with real-time air quality data and weather forecasts to make informed decisions about your travel plans.",
              "<strong>Indoor Activities</strong>: Engage in indoor activities like reading, cooking, or indoor exercises to minimize exposure to outdoor pollutants.",
              "<strong>Seal Windows</strong>: Keep windows and doors closed during periods of high pollution to prevent pollutants from entering your home.",
              "<strong>Use Air Purifiers</strong>: Install air purifiers in your home to filter out pollutants and improve indoor air quality.",
              "<strong>Reduce Car Usage</strong>: Limit driving and carpool whenever possible to reduce emissions and lower overall pollution levels."
            ]
          };
          const allTips = [];
          for (const quality in tipsPerQuality) {
            if (Object.hasOwnProperty.call(tipsPerQuality, quality)) {
              allTips.push(...tipsPerQuality[quality]);
            }
          }
          const selectedTips = [];
          if (averageAirQuality <= 50) {
            selectedTips.push(...this.getRandomTips(tipsPerQuality["Low Pollution"]));
          } else if (averageAirQuality <= 100) {
            selectedTips.push(...this.getRandomTips(tipsPerQuality["Moderate Pollution"]));
          } else {
            selectedTips.push(...this.getRandomTips(tipsPerQuality["High Pollution"]));
          }
          selectedTips.sort(() => Math.random() - 0.5);
          selectedTips.forEach((tip) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = tip;
            healthTips.appendChild(listItem);
          });
        });
      },
      // 随机从数组中选择几个提示
      getRandomTips(tipsArray) {
        const selectedTips = [];
        const numberOfTips = Math.floor(Math.random() * tipsArray.length) + 1;
        const shuffledArray = tipsArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < numberOfTips; i++) {
          selectedTips.push(shuffledArray[i]);
        }
        return selectedTips;
      },
      setMePositioning() {
        let _this = this;
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(_this.receiveLocaDate.lat),
            lng: parseFloat(_this.receiveLocaDate.lon)
          },
          icon: {
            url: "https://maps.gstatic.com/mapfiles/ms2/micons/red.png",
            scaledSize: new google.maps.Size(50, 50)
          },
          map: _this.map
        });
        meMarker.push(marker);
      },
      receiveLoca(newValue, oldValue, ownerInstance, instance) {
        let _this = this;
        if (JSON.stringify(newValue) != "{}" && newValue.length != 0) {
          _this.receiveLocaDate = newValue;
        }
      },
      receiveTrace(newValue, oldValue, ownerInstance, instance) {
        let _this = this;
        if (JSON.stringify(newValue) != "{}" && newValue.length != 0) {
          __f__("log", "at pages/map/map.vue:451", "\u89E6\u53D1\u4E86", newValue, newValue.length);
          for (let i = 0; i < meMarker.length; i++) {
            meMarker[i].setMap(null);
          }
          if (polylinePath != null) {
            polylinePath.setMap(null);
          }
          _this.map.setZoom(20);
          const marker1 = new google.maps.Marker({
            position: {
              lat: parseFloat(newValue[0].lat),
              lng: parseFloat(newValue[0].lng)
            },
            icon: {
              url: "static/img/map/icon_start.png",
              scaledSize: new google.maps.Size(20, 20)
            },
            map: _this.map
          });
          meMarker.push(marker1);
          const marker2 = new google.maps.Marker({
            position: {
              lat: parseFloat(newValue[newValue.length - 1].lat),
              lng: parseFloat(newValue[newValue.length - 1].lng)
            },
            icon: {
              url: "static/img/map/icon_end.png",
              scaledSize: new google.maps.Size(20, 20)
            },
            map: _this.map
          });
          meMarker.push(marker2);
          polylinePath = new google.maps.Polyline({
            path: newValue,
            geodesic: false,
            strokeColor: "#41d9b7",
            strokeOpacity: 1,
            strokeWeight: 8,
            editable: false,
            draggable: false
          });
          polylinePath.setMap(_this.map);
          let pos = {
            lat: parseFloat(newValue[0].lat),
            lng: parseFloat(newValue[0].lng)
          };
          _this.map.setCenter(pos);
        }
      }
    }
  };
  return __toCommonJS(stdin_exports);
})();
