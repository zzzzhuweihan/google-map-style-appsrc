<template>
	<view>
		<nav class="navbar">
		        <div class="logo">EcoRoute</div>
		        
		    </nav>
		 <!-- Route Planner Module -->
		    <view class="planner-page">
				
				
				<div class="container" v-if="airQualityData">
				    <div class="header">
				      <h1>Air Quality Index</h1>
				      <p id="dateTime">Date & Time:{{airQualityData.dateTime}}</p>
				      <p id="regionCode">Region Code:{{airQualityData.regionCode}}</p>
				    </div>
				    <div class="aqi-box" id="aqiBox" :style="{backgroundColor:aqiBoxColor}">
				      <div class="aqi-value" id="aqiValue">AQI:{{airQualityData.indexes[0].aqi}}</div>
				      <div class="category" id="category">{{airQualityData.indexes[0].category}}</div>
				      <p>Dominant Pollutant: <span id="dominantPollutant">{{airQualityData.indexes[0].dominantPollutant}}</span></p>
				    </div>
				  </div>
		        
		        <view class="search-module" style="gap:10px; display: flex;flex-direction: column;">
						<h1>Route Planner</h1>
		                <label for="start">Start:</label>
		                <input type="text" id="start" name="start" v-model="startLoc" placeholder="Enter starting location">
		
		                <label for="end">End:</label>
		                <input type="text" id="end" name="end" v-model="endLoc" placeholder="Enter destination">
		
		                
						<view style="display: flex;flex-direction: column;gap:10px;">
							<label for="mode">Mode:</label>
							<select id="mode" name="mode" style="width: 100%;" v-model="selectedMode">
								<option value="BICYCLING">Bicycling</option>
								<option value="WALKING">Walk</option>
								<option value="DRIVING">Drive</option>
								<option value="TRANSIT">Transit</option>
							</select>
						</view>
					
						<view style="display: flex;flex-direction: column;gap:10px;">
		                <label for="preference">Preference:</label>
		                <select id="preference" name="preference" style="width: 100%;" v-model="selectedPreference">
		                    <option value="fastest">Fastest</option>
		                    <option value="shortest">Shortest</option>
		                    <option value="least_polluted">Least Polluted</option>
		                </select>
						</view>
		
		                <button type="submit"  @click="startRouterPlan" style="margin-top: 10px;height: 40px;width: 200px;line-height: 20px;">Get Route</button>
		           
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
				startLoc:'Heslington, York YO10 5DD, United Kingdom',
				endLoc:'Rose Villa, 15-16 Main St, Heslington, York YO10 5EA, United Kingdom',
				selectedMode:'BICYCLING',
				selectedPreference:'least_polluted',
				airQualityData: null,
				errorMessage:'',
				aqiBoxColor:"#efeff4",
			
            }
        },
		onLoad:function(){
			this.getLocation();
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
            async startRouterPlan() {
				if(!this.hasLocation){
					uni.showToast({
						icon:'loading',
						title:"Plase wait Getting current location"
					})
					return;
				}
				this.receiveLocaDate.startLoc = this.startLoc
				this.receiveLocaDate.endLoc = this.endLoc
				this.receiveLocaDate.selectedMode = this.selectedMode
				//localStorage.setItem('currentLoc', JSON.stringify(this.receiveLocaDate));
				uni.setStorageSync("currentLoc",JSON.stringify(this.receiveLocaDate))
				uni.navigateTo({
					url:`/pages/map/map?lat=${this.receiveLocaDate.lat}&lon=${this.receiveLocaDate.lon}`
				})
			},
            async getLocation() {
                // #ifdef APP-PLUS
                let status = await this.checkPermission();
                if (status !== 1) {
                    return;
                }
                // #endif
				

                this.doGetLocation();
            },
            doGetLocation() {
				let that = this;
                uni.getLocation({
                    success: (res) => {
                        that.hasLocation = true;
						that.receiveLocaDate.lon = res.longitude;
						that.receiveLocaDate.lat = res.latitude;
						that.getAirQuality(res.longitude, res.latitude);
						console.log(res)
                    },
                    fail: (err) => {
                        // #ifdef MP-BAIDU
                        if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
                            this.showConfirm();
                        }
                        // #endif
                        // #ifndef MP-BAIDU
                        if (err.errMsg.indexOf("auth deny") >= 0) {
                            uni.showToast({
                                title: "访问位置被拒绝"
                            })
                        } else {
                            uni.showToast({
                                title: err.errMsg
                            })
                        }
                        // #endif
                    }
                })
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
			async getAirQuality(lat, lng) {
					let that = this;
					lat = 53.94617694646508;
					lng = -1.051777705810919;
					uni.request({
					      url: "https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4", //接收请求的API
					      method: 'POST', //接收请求的方式,如果不传默认为GET
					      data: {
					        location: {
					          latitude: parseFloat(lat),
					          longitude: parseFloat(lng)
					        }
					      },
					      header: {
					        'Content-Type': 'application/json'
					      },
					      success(res) {
					        
					        
					        that.airQualityData = res.data;
							const index = that.airQualityData.indexes[0];
							that.aqiBoxColor = `rgb(${index.color.red * 255}, ${index.color.green * 255}, ${index.color.blue * 255})`
					        console.log(that.airQualityData)
					      },
					      fail: (err) => {
					        console.log(err)
					      }
					    })


			     
			  
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
	border-bottom: 1px solid #ddd;
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
.container {
    
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
.aqi-box {
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
    }
    .aqi-value {
      font-size: 2em;
      font-weight: bold;
    }
    .category {
      font-size: 1.2em;
      margin-top: 10px;
    }
</style>
