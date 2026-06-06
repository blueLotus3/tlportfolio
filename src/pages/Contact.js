import React from 'react';
import { useForm, ValidationError } from "@formspree/react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Contact = () => {
  // The SDK handles all loading, error catching, and ad-blocker fallbacks automatically
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [state, handleSubmit] = useForm("xwvzgnvv", {
    data: {
      "g-recaptcha-response": executeRecaptcha
    }
  });
  
  if (state.succeeded) {
    return (
      <div className="contact-form success-message">
        <h2>Thank You!</h2>
        <p>Your message has been sent successfully. I will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Me</h2>

      <input type="text" name="name" placeholder="Your Name" required />

      <input type="email" name="email" placeholder="Your Email" required />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea name="message" placeholder="Your Message" required />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting}>
        {state.submitting ? "Sending..." : "Send Message"}
      </button>

      {state.errors && state.errors.length > 0 && (
        <p style={{ color: "red" }}>
          Failed to send. Please verify your details and try again.
        </p>
      )}
    </form>
  );
};

export default Contact;