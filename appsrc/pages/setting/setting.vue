<template>
	<view >
		<nav class="navbar">
		        <div class="logo">EcoRoute</div>
		        
		    </nav>
	<view class="uni-container">
		
	
	
		<view class="pc-hide uni-panel">
			
			<view class="uni-panel-h"  @click="goto(0)">
				<text class="uni-panel-text">Contact US</text>
				
			</view>
			
		</view>
		<view class="pc-hide uni-panel">
			
		
			<view class="uni-panel-h"  @click="goto(1)">
				<text class="uni-panel-text" >About US</text>
				
			</view>
			
		</view>
		<view class="pc-hide uni-panel">
			
		
			<view class="uni-panel-h" @click="goto(2)">
				<text class="uni-panel-text"  >OpenSource Software</text>
			</view>
			
		</view>
	</view>
	</view>
</template>
<script>
	export default {
		props: {
			hasLeftWin: {
				type: Boolean
			},
			leftWinActive: {
				type: String
			}
		},
		data() {
			return {
				 
			}
		},
		
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		// #ifdef H5
		watch: {
			$route: {
				immediate: true,
				handler(newRoute) {
					if (newRoute.matched.length) {
						let path = newRoute.path.split('/')[3]
						for (const item of this.list) {
							if (Array.isArray(item.pages)) {
								for (const page of item.pages) {
									if (page === path || page.url && page.url === path) {
										item.open = true
									}
								}
							}
						}
					}
				}
			}
		},
		// #endif
		methods: {
			
			goto(e) {
				let url = "";
				if(e == 0){
					url = "/pages/contact/contact";
				}else if(e == 1){
					url = "/pages/about/about";
				}else if(e == 2){
					url = "/pages/opensource/opensource";
				}
				uni.navigateTo({
					url: url
				})
			
			
			}
		}
	}
</script>

<style>
	@import '../../common/uni-nvue.css';
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
</style>
