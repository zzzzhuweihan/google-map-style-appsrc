<template>
	<view>
		<!-- Navigation Bar -->
		    <nav class="navbar">
		        <div class="logo">EcoRoute</div>
		       
		    </nav>
		
		    <!-- About Page Content -->
		    <div class="about-page">
		        <h1>About EcoRoute</h1>
		        <p>Welcome to EcoRoute! Our mission is to help you plan routes that minimize your exposure to pollution, making your journeys healthier and more environmentally friendly.</p>
		        
		        <h2>How to Use the App</h2>
		        <ol>
		            <li>Enter your starting point and destination in the Route Planner.</li>
		            <li>Select your preferred mode of transport: Bike, Walk, or Drive.</li>
		            <li>Choose your optimization preference: Fastest, Shortest, or Least Polluted.</li>
		            <li>Click "Get Route" to see the suggested routes along with detailed information on time, distance, and pollution levels.</li>
		            <li>Select the route that best meets your needs and start your journey!</li>
		        </ol>
		
		        <h2>Help &amp; Support</h2>
		        <p>If you need assistance with using the app, please refer to our <a href="faq.html">FAQ page</a> for common questions and answers. For further support, you can reach out to our customer service team through the <a href="contact.html">Contact page</a>.</p>
		        
		        <h2>Tips &amp; Suggestions</h2>
		        <ul>
		            <li>Check the real-time air quality index (AQI) displayed on the home page before planning your route.</li>
		            <li>For the least polluted routes, consider traveling during times when traffic is lower and air quality is generally better.</li>
		            <li>Stay informed about the environmental conditions in your area by enabling notifications in the app settings.</li>
		            <li>If you're a cyclist or pedestrian, use protective gear like masks to further reduce exposure to pollutants.</li>
		        </ul>
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
/* styles.css */
body {
    font-family: Arial, sans-serif;
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

.about-page {
    padding: 20px;
    max-width: 800px;
    margin: auto;
}

.about-page h1,
.about-page h2 {
    color: #4CAF50;
}

.about-page p, 
.about-page ol, 
.about-page ul {
    margin: 20px 0;
}

.about-page ol li, 
.about-page ul li {
    margin: 10px 0;
}

.about-page a {
    color: #4CAF50;
    text-decoration: none;
}

.about-page a:hover {
    text-decoration: underline;
}

footer {
    background-color: #4CAF50;
    color: white;
    text-align: center;
    padding: 10px 0;
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
