<template>
	<view>
		 <nav class="navbar">
		        <div class="logo">EcoRoute</div>
		       
		    </nav>
		
		    <!-- Contact Page Content -->
		    <div class="contact-page">
		        <h1>Contact Us</h1>
		        <p>If you have any questions, suggestions, or need support, please reach out to us using the form below or through our contact details.</p>
		        
		        <div class="contact-details">
		            <h3>Contact Details</h3>
		            <p>Email: support@ecoroute.com</p>
		            <p>Phone: +1 186 567 890</p>
		            <p>Address: xxx Street, xxx City, xxx</p>
		        </div>
		
		        <div class="contact-form">
		            <h3>Contact Form</h3>
					<view style="display: flex;flex-direction: column;">
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" placeholder="Your Name" >
					</view>
					<view style="display: flex;flex-direction: column;">
					<label for="email">Email:</label>
					<input type="email" id="email" name="email" placeholder="Your Email">
	</view><view style="display: flex;flex-direction: column;;">
					<label for="subject">Subject:</label>
					<input type="text" id="subject" name="subject" placeholder="Subject">
	</view><view style="display: flex;flex-direction: column;;">
					<label for="message">Message:</label>
					<textarea id="message" name="message" rows="6" placeholder="Your Message"></textarea>
	
					</view>
					<button type="submit" style="margin-top: 10px;height: 40px;width: 200px;line-height: 20px;">Submit</button>
						
		         
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

.contact-page {
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
 
    text-align: center;
}

.contact-page h1 {
    color: #4CAF50;
    margin-bottom: 20px;
}

.contact-page p {
    font-size: 16px;
    color: #555;
    margin-bottom: 30px;
}

.contact-details {
    margin-bottom: 40px;
    text-align: left;
}

.contact-details h3 {
    color: #4CAF50;
    margin-bottom: 10px;
}

.contact-details p {
    margin: 5px 0;
}

.contact-form h3 {
    color: #4CAF50;
    margin-bottom: 10px;
}

.contact-form  {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contact-form label {
    text-align: left;
}

.contact-form input, .contact-form textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
   
}
.contact-form textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: auto;
}
.contact-form button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.contact-form button:hover {
    background-color: #45a049;
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
