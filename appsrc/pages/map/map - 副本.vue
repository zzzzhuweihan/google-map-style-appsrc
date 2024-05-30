<template>
	<view>
		<view id="map" :data='receiveLocaDate' :change:data="renderScript.getData"></view>
		 <!-- Route Planner Module -->
		    <view class="planner-page" >
		        
		        <!-- Results and Recommendations Module -->
		        <view class="results">
		            <h3>Route Options</h3>
		            <ul>
		                <li>Route 1: 15 mins, 5 km, Low Pollution</li>
		                <li>Route 2: 20 mins, 4.5 km, Moderate Pollution</li>
		                <li>Route 3: 10 mins, 6 km, High Pollution</li>
		            </ul>
		        </view>
		
		        <!-- Health & Safety Tips Module -->
		        <view class="health-tips">
		            <h3>Health & Safety Tips</h3>
		            <ul>
		                <li><strong>Wear a Mask:</strong> Use a mask that filters out fine particles (PM2.5) to protect your respiratory system, especially on days with high pollution.</li>
		                <li><strong>Travel During Low Traffic Times:</strong> Plan your routes during early mornings or late evenings when pollution levels tend to be lower due to reduced traffic.</li>
		                <li><strong>Choose Greener Paths:</strong> Opt for routes that go through parks or areas with more greenery, as plants can help absorb pollutants.</li>
		                <li><strong>Stay Hydrated:</strong> Drink plenty of water to help your body flush out toxins and stay hydrated, which can improve your overall resistance to pollution.</li>
		                <li><strong>Monitor Air Quality:</strong> Regularly check the air quality index (AQI) and avoid outdoor activities when pollution levels are high.</li>
		                <li><strong>Limit Intense Activities:</strong> Avoid strenuous activities like running or cycling on high pollution days to reduce the amount of pollutants you inhale.</li>
		                <li><strong>Use Protective Gear:</strong> Wear protective eyewear to prevent irritation from pollutants, and consider using air purifiers at home to ensure clean indoor air.</li>
		                <li><strong>Stay Informed:</strong> Keep yourself updated with real-time air quality data and weather forecasts to make informed decisions about your travel plans.</li>
		            </ul>
		        </view>
		    </view>
			<footer>
			        <p>&copy; 2024 EcoRoute. All rights reserved.</p>
			        <a href="privacy.html">Privacy Policy</a>
			        <a href="terms.html">Terms of Service</a>
			        <div class="social-media">
			            <a href="#">Facebook</a>
			            <a href="#">Twitter</a>
			            <a href="#">Instagram</a>
			        </div>
			    </footer>
	</view>
</template>

<script>
    import * as util from '@/common/util.js'
    var formatLocation = util.formatLocation;
    // #ifdef APP-PLUS
    import permision from "@/common/permission.js"
    // #endif
	var meMarker = []
	var polylinePath = null
    export default {
        data() {
            return {
                title: 'getLocation',
                hasLocation: false,
                location: {},
                type: '',
				map: {},
				receiveLocaDate: {
					lat: '35.00125',
					lon: '109.563582'
				},
				receiveTraceDate: [],
				startLoc:'丰润家园',
				endLoc:'网易游戏中心',
				selectedMode:'drive',
				selectedPreference:'least_polluted'
            }
        },
		
		onLoad:function(e){
			console.log(e);
			this.receiveLocaDate.lat = parseFloat(e.lat);
			this.receiveLocaDate.lon = parseFloat(e.lon);
		},
        methods: {
			
            togglePopup(type) {
                this.type = type;
            },
            showConfirm() {
                this.type = 'showpopup';
            },
            hideConfirm() {
                this.type = '';
            },
            getSetting: function() {
                return new Promise((resolve, reject) => {
                    uni.getSetting({
                        success: (res) => {
                            if (res.authSetting['scope.userLocation'] === undefined) {
                                resolve(0);
                                return;
                            }
                            if (res.authSetting['scope.userLocation']) {
                                resolve(1);
                            } else {
                                resolve(2);
                            }
                        }
                    });
                });
            },
            openSetting: function() {
                this.hideConfirm();
                uni.openSetting({
                    success: (res) => {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            this.doGetLocation();
                        }
                    },
                    fail: (err) => {}
                })
            },
            async checkPermission() {
                let status = permision.isIOS ? await permision.requestIOS('location') :
                    await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');

                if (status === null || status === 1) {
                    status = 1;
                } else if (status === 2) {
                    uni.showModal({
                        content: "系统定位已关闭",
                        confirmText: "确定",
                        showCancel: false,
                        success: function(res) {
                        }
                    })
                } else if (status.code) {
                    uni.showModal({
                        content: status.message
                    })
                } else {
                    uni.showModal({
                        content: "需要定位权限",
                        confirmText: "设置",
                        success: function(res) {
                            if (res.confirm) {
                                permision.gotoAppSetting();
                            }
                        }
                    })
                }

                return status;
            },
            clear: function() {
                this.hasLocation = false
            }
        }
    }
</script>
<script module="renderScript" lang="renderjs">
	var meMarker = []
	var polylinePath = null
	export default {
		data() {
			return {
				map: {},
				directionsService: {},
				receiveLocaDate: {
					lat: '',
					lon: ''
				},
				receiveTraceDate: []
			};
		},
		
		mounted() {
			
			
			let _this = this
			const script = document.createElement('script')
			script.src =
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4&libraries=places&callback=initMap'
			window.initMap = function() {
				setTimeout(() => {
					console.log('renderScript')
					_this.initAmap()
				}, 1500);
			};
			document.head.appendChild(script)
		
		},
		
		methods: {
			getData(newValue) {
				console.log("newValue", newValue.lat);
				if (newValue) {
					this.receiveLocaDate = newValue  // 将传递过来的值赋值给points，这样就可以在视图层中使用
				}
			},
			initAmap() {
				let _this = this
				console.log('initAmap')
				_this.map = new google.maps.Map(document.getElementById("map"), {
					center: {
						lat: parseFloat(_this.receiveLocaDate.lat),
						lng: parseFloat(_this.receiveLocaDate.lon)
					},
					zoom: 16
				});
				_this.directionsService = new google.maps.DirectionsService();
				_this.calculateAndDisplayRoutes()
				_this.setMePositioning()
			},
			calculateAndDisplayRoutes() {
				var request = {
					origin: 'San Francisco, CA',
					destination: 'Mountain View, CA',
					travelMode: google.maps.TravelMode.WALKING,
					provideRouteAlternatives: true
				};
	
				this.directionsService.route(request, async function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						var routes = result.routes;
						var airQualityData = [];
	
						// Get air quality for all routes and calculate air quality index
						for (var i = 0; i < routes.length; i++) {
							var route = routes[i];
							var routeAirQuality = await this.getAirQualityForRoute(route);
							airQualityData.push({route: route, airQuality: routeAirQuality});
						}
	
						// Find the route with the best air quality
						airQualityData.sort((a, b) => a.airQuality - b.airQuality);
						var bestRoute = airQualityData[0].route;
	
						// Display all routes
						for (var i = 0; i < airQualityData.length; i++) {
							var route = airQualityData[i].route;
							var color = (route === bestRoute) ? '#00FF00' : '#0000FF';
							this.displayRoute(route, color);
							//displayAirQualityAlongRoute(route, map);
						}
					}
				});
			},
			async  getAirQualityForRoute(route) {
				var totalAirQuality = 0;
				var count = 0;
	
				for (var i = 0; i < route.legs.length; i++) {
					var leg = route.legs[i];
					for (var j = 0; j < leg.steps.length; j++) {
						var step = leg.steps[j];
						var location = step.end_location;
						var airQuality = await getAirQuality(location.lat(), location.lng());
						if (airQuality) {
							totalAirQuality += airQuality.aqi;
							count++;
						}
					}
				}
				return count ? totalAirQuality / count : Infinity;
			},
			// 显示路线
			displayRoute(route, color) {
				var directionsRenderer = new google.maps.DirectionsRenderer({
					map: this.map,
					directions: {routes: [route]},
					polylineOptions: {
						strokeColor: color
					}
				});
				// allDirectionsRenderers.push(directionsRenderer);
			},
			setMePositioning() {
				let _this = this
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
				meMarker.push(marker)
			},
			receiveLoca(newValue, oldValue, ownerInstance, instance) {
				let _this = this
				if (JSON.stringify(newValue) != '{}' && newValue.length != 0) {
					_this.receiveLocaDate = newValue
				}
			},
			receiveTrace(newValue, oldValue, ownerInstance, instance) {
				let _this = this
				if (JSON.stringify(newValue) != '{}' && newValue.length != 0) {
					console.log('触发了',newValue,newValue.length)
					for (let i = 0; i < meMarker.length; i++) {
						meMarker[i].setMap(null);
					}
					if(polylinePath != null){
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
					meMarker.push(marker1)
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
					meMarker.push(marker2)
					polylinePath = new google.maps.Polyline({
						path: newValue,
						geodesic: false,
						strokeColor: '#41d9b7',
						strokeOpacity: 1,
						strokeWeight: 8,
						editable: false,
						draggable: false,
					});
					polylinePath.setMap(_this.map)
					let pos = {
						lat: parseFloat(newValue[0].lat),
						lng: parseFloat(newValue[0].lng)
					}
					_this.map.setCenter(pos)
				}
			}
		}
	}
</script>
<style>
/* styles.css */
body {
   
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
.uni-picker-tips {
	font-size: 12px;
	color: #666;
	margin-bottom: 15px;
	padding: 0 15px;
	/* text-align: right; */
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4CAF50;
    padding: 10px 20px;
    color: white;
	min-height: 140px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
}

.nav-links li {
    display: inline;
}

.nav-links a {
    color: white;
    text-decoration: none;
}

.auth-buttons button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: white;
    color: #4CAF50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.auth-buttons button:hover {
    background-color: #ddd;
}

.planner-page {
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    
}

.planner-page h1 {
    color: #4CAF50;
    text-align: center;
}

.search-module form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.search-module input, .search-module select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.search-module button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

.search-module button:hover {
    background-color: #45a049;
}

#map {
    width: 100%;
    height: 400px;
    background-color: #e5e5e5;
    margin-top: 20px;
}

.environment-data {
    padding: 20px;
    background-color: #ffffff;
    text-align: center;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}

.results {
    padding: 20px;
    background-color: #ffffff;
    text-align: center;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}

.results ul {
    list-style: none;
    padding: 0;
}

.results li {
    margin: 10px 0;
}

.health-tips {
    padding: 20px;
    background-color: #ffffff;
    text-align: left;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}

.health-tips h3 {
    color: #4CAF50;
    margin-bottom: 10px;
}

.health-tips ul {
    list-style: none;
    padding: 0;
}

.health-tips li {
    margin: 10px 0;
}

footer {
    background-color: #4CAF50;
    color: white;
    text-align: center;
    padding: 10px 0;
    margin-top: 40px;
}

footer a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
}

footer .social-media a {
    margin: 0 5px;
}

</style>
