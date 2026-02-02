import { useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
    const formRef = useRef(null);
    const [status, setStatus] = useState("");
    const [statusColor, setStatusColor] = useState("");
    const [loading, setLoading] = useState(false);
    console.log("Public key: ", process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  
    const sendEmail = (e) => {
      e.preventDefault();
      setLoading(true);
  
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          setStatus("Message sent successfully!");
          setStatusColor("#22c55e");
          setLoading(false);
          formRef.current.reset();
        })
        .catch(() => {
          setStatus("Something went wrong. Try again.");
          setStatusColor("#ef4444");
          setLoading(false);
        });
    };
  
    return (
      <form ref={formRef} onSubmit={sendEmail} className="contact-form">
        <h2>Contact Me</h2>
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
        />
  
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
        />
  
        <textarea
          name="message"
          placeholder="Your Message"
          required
        />
  
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
  
        {status && (
          <p id="form-status" style={{ color: statusColor }}>
            {status}
          </p>
        )}
      </form>
  
  );
}
export default Contact;