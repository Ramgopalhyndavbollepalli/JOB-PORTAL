import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from '../shared/Navbar'; // Correct path to Navbar component

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server or display a success message
    console.log('Form submitted:', formData);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar at the top of the page */}
      <div className="contact-us-page">
        <div className="contact-us-header">
          <h2>Get in touch</h2>
          <p>Want to get in touch? We'd love to hear from you. Here's how you can reach us.</p>
        </div>
        <div className="contact-cards">
          <div className="contact-card">
            <i className="fas fa-phone card-icon"></i>
            <h3>Talk to an Expert</h3>
            <p>Interested in our services? Just pick up the phone to chat with a member of our Counselling team.</p>
            <a href="tel:+11234567890" className="card-link">+1 (123) 456-7890</a>
          </div>
          <div className="contact-card">
            <i className="fas fa-comments card-icon"></i>
            <h3>Contact Customer Support</h3>
            <p>Need help? Get in touch with our support team for assistance with any issues or questions.</p>
            <button className="card-button" onClick={toggleModal}>Contact Support</button>
          </div>
          <div className="contact-card">
            <i className="fas fa-map-marker-alt card-icon"></i>
            <h3>Visit Our Office</h3>
            <p>Come by and visit us at our headquarters for a face-to-face chat.</p>
            <p className="location-address">1234 Main Street, Your City, Your State, ZIP Code</p>
          </div>
        </div>
        <div className="map-container">
          <iframe
            title="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096586!2d144.95373631531884!3d-37.817209979751795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ab4f41dc925!2s1234+Main+Street%2C+Your+City%2C+Your+State!5e0!3m2!1sen!2s!4v1631658566168!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Modal for Contact Form */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={toggleModal}>&times;</button>
              <h3>Contact Support</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactUs;
