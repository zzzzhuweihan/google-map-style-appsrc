<template>
	<view>
			<nav class="navbar">
			        <div class="logo">EcoRoute</div>
			        
			    </nav>
		 <!-- Banner -->
		    <div class="banner">
		        <h1>Welcome to EcoRoute</h1>
		        <p>Your journey to a healthier, greener life starts here.</p>
		        
				<button @click="startRoute" type="submit" style="margin-top: 10px;height: 40px;width: 200px;line-height: 20px;">Plan Your Route</button>
		    </div>
		
		    <!-- Features Section -->
		    <div class="features">
		        <h2>Our Features</h2>
		        <div class="feature">
		            <h3>Pollution-Aware Route Planning</h3>
		            <p>Plan your routes to minimize exposure to pollution. Our app provides real-time data to help you choose the cleanest paths for biking, walking, or driving.</p>
		        </div>
		        <div class="feature">
		            <h3>Real-Time Air Quality Monitoring</h3>
		            <p>Stay informed about the air quality in your area. Our app integrates real-time AQI data to ensure you are always aware of the environmental conditions around you.</p>
		        </div>
		        <div class="feature">
		            <h3>Customizable Preferences</h3>
		            <p>Tailor your route preferences based on your needs. Whether you prefer the fastest route, the shortest distance, or the least polluted path, our app has you covered.</p>
		        </div>
		        <div class="feature">
		            <h3>Interactive Map Interface</h3>
		            <p>Explore your routes with our interactive map. Get detailed information on distance, travel time, and pollution levels for each suggested route.</p>
		        </div>
		        <div class="feature">
		            <h3>Health & Safety Tips</h3>
		            <p>Access helpful tips and suggestions to protect yourself from pollution while traveling. Learn about protective gear, best travel times, and more.</p>
		        </div>
		    </div>
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
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			startRoute:function(){
				uni.switchTab({
					url:"/pages/router_plan/router_plan"
				})
			}
		}
	}
</script>

<style >
	/* styles.css */
	body {
	    font-family: Arial, sans-serif;
	    margin: 0;
	    padding: 0;
	    background-color: #f4f4f4;
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
	
	.banner {
	    background-image: url('banner.jpg'); /* Replace with your banner image */
	    background-size: cover;
	    background-position: center;
	    text-align: center;
	    padding: 100px 20px;
	    color: #26772c;
	}
	
	.banner h1 {
	    font-size: 48px;
	    margin-bottom: 20px;
	}
	
	.banner p {
	    font-size: 24px;
	    margin-bottom: 20px;
	}
	
	.banner button {
	    padding: 10px 20px;
	    background-color: #4CAF50;
	    color: white;
	    border: none;
	    border-radius: 5px;
	    cursor: pointer;
	    font-size: 18px;
	}
	
	.banner button:hover {
	    background-color: #45a049;
	}
	
	.features {
	    padding: 40px 20px;
	    background-color: white;
	    text-align: center;
	}
	
	.features h2 {
	    color: #4CAF50;
	    margin-bottom: 40px;
	}
	
	.feature {
	    margin-bottom: 20px;
	}
	
	.feature h3 {
	    color: #4CAF50;
	    margin-bottom: 10px;
	}
	
	.feature p {
	    font-size: 16px;
	    color: #555;
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