<template>
	<view>
		<view id="map" :data='receiveLocaDate' :change:data="renderScript.getData"></view>
		 <!-- Route Planner Module -->
		    <view class="planner-page" >
		        
		        <!-- Results and Recommendations Module -->
		        <view class="results">
		            <h3>Route Options</h3>
		            <ul id="routes-list">
		               
		            </ul>
		        </view>
				
		
		        <!-- Health & Safety Tips Module -->
		        <view class="health-tips">
		            
		            <ul>
		               
		            </ul>
		        </view>
		    </view>
			
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
				
				selectedMode:'drive',
				selectedPreference:'least_polluted',
				routesInfo:[],
            }
        },
		
		onLoad:function(e){
			console.log(e);
			let k = uni.getStorageSync("currentLoc")
			this.receiveLocaDate = JSON.parse(k);
			console.log(this.receiveLocaDate)
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
				receiveTraceDate: [],
				routesInfo: []
			};
		},
		
		mounted() {
			
			
			let _this = this
			const script = document.createElement('script')
			script.src =
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4&libraries=places&callback=initMap&region=UK'
			window.initMap = function() {
				setTimeout(() => {
					console.log('renderScript')
					_this.initMap()
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
			loadGoogleMapsScript() {
			      const script = document.createElement('script');
			      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
			      script.async = true;
			      script.defer = true;
			      script.onload = this.initMap;
			      document.head.appendChild(script);
			    },
			    async initMap() {
			      this.map = new google.maps.Map(document.getElementById('map'), {
			        center: { lat: 37.7749, lng: -122.4194 },
			        zoom: 10
			      });
			
			      this.directionsService = new google.maps.DirectionsService();
			
			      const start = this.receiveLocaDate.startLoc;//'San Francisco, CA';
			      const end = this.receiveLocaDate.endLoc;//'Mountain View, CA';
			
			      this.directionsService.route({
			        origin: start,
			        destination: end,
			        travelMode: this.receiveLocaDate.selectedMode,
			        provideRouteAlternatives: true
			      }, async (response, status) => {
			        if (status === 'OK') {
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
			            await this.displayAirQualityAlongRoute(route,i);
			          }
			        } else {
			          uni.showToast({
			            title: 'Directions request failed due to ' + status,
			            icon: 'none'
			          });
			        }
			      });
			    },
			    getRandomColor() {
			      const letters = '0123456789ABCDEF';
			      let color = '#';
			      for (let i = 0; i < 6; i++) {
			        color += letters[Math.floor(Math.random() * 16)];
			      }
			      return color;
			    },
			    async displayAirQualityAlongRoute(route,index) {
					let totalDuration = 0;
				  let totalDistance = 0;
				  let totalAirQuality = 0;
				  let stepsCount = 0;
						  
			      for (let leg of route.legs) {
					  
					   totalDuration += leg.duration.value / 60; // 将秒转换为分钟
					   totalDistance += leg.distance.value / 1000; // 将米转换为公里
							  
			        for (let step of leg.steps) {
			          const location = step.start_location;
			          const airQuality = await this.getAirQuality(location.lat(), location.lng());
			          const placeName = await this.getPlaceName(location.lat(), location.lng());
			
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
			            marker.addListener('click', function() {
			              infoWindow.open(this.map, this);
			            });
			          }
			        }
			      }
				  const averageAirQuality = stepsCount ? totalAirQuality / stepsCount : Infinity;
				  
				  this.displayHealthTips(index + 1,averageAirQuality)
				let pollutionLevel = '';
		  
				if (averageAirQuality <= 50) {
				  pollutionLevel = 'Low Pollution';
				} else if (averageAirQuality <= 100) {
				  pollutionLevel = 'Moderate Pollution';
				} else {
				  pollutionLevel = 'High Pollution';
				}
				const listItem = document.createElement('li');
			    listItem.innerHTML = `<strong>Route ${index + 1}</strong>: ${totalDuration.toFixed(2)} mins, ${totalDistance.toFixed(2)} km, ${pollutionLevel}`;
			    document.getElementById('routes-list').appendChild(listItem);
					  
				this.routesInfo.push({
				  duration: totalDuration.toFixed(2),
				  distance: totalDistance.toFixed(2),
				  pollution: pollutionLevel
				});
			    },
			    async getAirQuality(lat, lng) {
			      const apiKey = 'AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4';
			      const response = await fetch(`https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`, {
			        method: 'POST',
			        headers: {
			          'Content-Type': 'application/json'
			        },
			        body: JSON.stringify({
			          location: {
			            latitude: lat,
			            longitude: lng
			          }
			        })
			      });
			      const data = await response.json();
			      if (data.indexes && data.indexes.length > 0) {
			        return data.indexes[0];
			      } else {
			        console.error('No air quality data found for this location.');
			        return null;
			      }
			    },
			    async getPlaceName(lat, lng) {
			      const apiKey = 'AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4';
			      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
			      const data = await response.json();
			      if (data.results && data.results.length > 0) {
			        return data.results[0].formatted_address;
			      } else {
			        console.error('No place name found for this location.');
			        return 'Unknown location';
			      }
			    },
			    getCircle(color) {
			      const canvas = document.createElement('canvas');
			      const context = canvas.getContext('2d');
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
				async displayHealthTips(index,averageAirQuality) {
				    const healthTips = document.querySelector('.health-tips');
					const h3Item = document.createElement('h3');
				    h3Item.innerHTML = `<h3>Router ${index}:Health & Safety Tips</h3>`; // 清空之前的提示信息
					healthTips.appendChild(h3Item);
				
				    const tipsPerQuality = {
				        'Low Pollution': [
				            '<strong>Wear a Mask</strong>: Use a mask that filters out fine particles (PM2.5) to protect your respiratory system, especially on days with high pollution.',
				            '<strong>Travel During Low Traffic Times</strong>: Plan your routes during early mornings or late evenings when pollution levels tend to be lower due to reduced traffic.',
				            '<strong>Choose Greener Paths</strong>: Opt for routes that go through parks or areas with more greenery, as plants can help absorb pollutants.',
				            '<strong>Stay Hydrated</strong>: Drink plenty of water to help your body flush out toxins and stay hydrated, which can improve your overall resistance to pollution.',
				            '<strong>Limit Exposure to Pollutants</strong>: Minimize outdoor activities on high pollution days and spend more time indoors.'
				        ],
				        'Moderate Pollution': [
				            '<strong>Monitor Air Quality</strong>: Regularly check the air quality index (AQI) and avoid outdoor activities when pollution levels are high.',
				            '<strong>Limit Intense Activities</strong>: Avoid strenuous activities like running or cycling on high pollution days to reduce the amount of pollutants you inhale.',
				            '<strong>Use Protective Gear</strong>: Wear protective eyewear to prevent irritation from pollutants, and consider using air purifiers at home to ensure clean indoor air.',
				            '<strong>Take Shorter Routes</strong>: Opt for shorter routes or use public transportation to reduce your exposure to outdoor pollutants.',
				            '<strong>Eat Healthily</strong>: Consume foods rich in antioxidants, such as fruits and vegetables, to help your body fight the effects of pollution.'
				        ],
				        'High Pollution': [
				            '<strong>Stay Informed</strong>: Keep yourself updated with real-time air quality data and weather forecasts to make informed decisions about your travel plans.',
				            '<strong>Indoor Activities</strong>: Engage in indoor activities like reading, cooking, or indoor exercises to minimize exposure to outdoor pollutants.',
				            '<strong>Seal Windows</strong>: Keep windows and doors closed during periods of high pollution to prevent pollutants from entering your home.',
				            '<strong>Use Air Purifiers</strong>: Install air purifiers in your home to filter out pollutants and improve indoor air quality.',
				            '<strong>Reduce Car Usage</strong>: Limit driving and carpool whenever possible to reduce emissions and lower overall pollution levels.'
				        ]
				    };
				
				    const allTips = [];
				    for (const quality in tipsPerQuality) {
				        if (Object.hasOwnProperty.call(tipsPerQuality, quality)) {
				            allTips.push(...tipsPerQuality[quality]);
				        }
				    }
				
				    // 根据平均空气质量生成健康与安全提示
				    const selectedTips = [];
				    if (averageAirQuality <= 50) {
				        // 低污染
				        selectedTips.push(...this.getRandomTips(tipsPerQuality['Low Pollution']));
				    } else if (averageAirQuality <= 100) {
				        // 中等污染
				        selectedTips.push(...this.getRandomTips(tipsPerQuality['Moderate Pollution']));
				    } else {
				        // 高污染
				        selectedTips.push(...this.getRandomTips(tipsPerQuality['High Pollution']));
				    }
				
				    // 随机排序提示
				    selectedTips.sort(() => Math.random() - 0.5);
				
				    // 将提示添加到页面中
				    selectedTips.forEach(tip => {
				        const listItem = document.createElement('li');
				        listItem.innerHTML = tip;
				        healthTips.appendChild(listItem);
				    });
				},
				
				// 随机从数组中选择几个提示
				getRandomTips(tipsArray) {
				    const selectedTips = [];
				    const numberOfTips = Math.floor(Math.random() * tipsArray.length) + 1; // 选择 1 到 tipsArray.length 之间的随机数量的提示
				    const shuffledArray = tipsArray.sort(() => Math.random() - 0.5); // 打乱数组顺序
				
				    for (let i = 0; i < numberOfTips; i++) {
				        selectedTips.push(shuffledArray[i]);
				    }
				
				    return selectedTips;
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
