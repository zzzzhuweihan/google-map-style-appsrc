<template>
	<view>
		<nav class="navbar">
		        <div class="logo">EcoRoute</div>
		        
		    </nav>
		<div class="container">
		       
		                <h1>Open Source Software Used</h1>
		                <p>
		                    EcoRoute leverages several open source software and services to deliver an efficient and user-friendly application. 
		                    Utilizing open source technologies allows us to build robust features while maintaining flexibility and innovation.
		                    Below is a list of the key open source software and services we have integrated into our application, along with their respective licenses and descriptions.
		                </p>
		                
		                <div class="open-source-section" style="margin-top: 20px;">
		                    <h2>Vue.js</h2>
		                    <p>
		                        <strong>Website:</strong> <a href="https://vuejs.org/" target="_blank">https://vuejs.org/</a><br>
		                        <strong>Description:</strong> Vue.js is a progressive JavaScript framework for building user interfaces.<br>
		                        <strong>License:</strong> <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>
		                    </p>
		                </div>
		                
		                <div class="open-source-section">
		                    <h2>Google Maps API</h2>
		                    <p>
		                        <strong>Website:</strong> <a href="https://developers.google.com/maps" target="_blank">https://developers.google.com/maps</a><br>
		                        <strong>Description:</strong> Google Maps API provides a wide range of mapping services and functionalities to create custom maps.<br>
		                        <strong>License:</strong> <a href="https://cloud.google.com/maps-platform/terms" target="_blank">Google Maps Platform Terms of Service</a>
		                    </p>
		                </div>
		                
		                <div class="open-source-section">
		                    <h2>Virtual Air Quality API</h2>
		                    <p>
		                        <strong>Website:</strong> <a href="https://www.virtual-air-quality.com/" target="_blank">https://www.virtual-air-quality.com/</a><br>
		                        <strong>Description:</strong> Virtual Air Quality API provides real-time air quality data.<br>
		                        <strong>License:</strong> <a href="https://www.virtual-air-quality.com/terms" target="_blank">API Terms of Service</a>
		                    </p>
		                </div>
		                
		                <div class="open-source-section">
		                    <h2>HBuilderX</h2>
		                    <p>
		                        <strong>Website:</strong> <a href="https://www.dcloud.io/hbuilderx.html" target="_blank">https://www.dcloud.io/hbuilderx.html</a><br>
		                        <strong>Description:</strong> HBuilderX is a fast development tool supporting multiple languages and frameworks.<br>
		                        <strong>License:</strong> <a href="https://www.dcloud.io/license.html" target="_blank">DCloud License</a>
		                    </p>
		                </div>
		            </div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
body {
  
    background-color: #f4f4f4;
    color: #333;
    margin: 0;
    padding: 0;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4CAF50;
    padding: 10px 20px;
    color: white;
	
}

.logo {
    font-size: 24px;
    font-weight: bold;
}
.container {
    max-width: 800px;

    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h1 {
    text-align: center;
    color: #5ca95c;
}

.open-source-section {
    margin-bottom: 20px;
}

.open-source-section h2 {
    color: #4CAF50;
}

.open-source-section p {
    line-height: 1.6;
}

a {
    color: #4CAF50;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
