import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");
  
    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formRef.current.name.value,
          email: formRef.current.email.value,
          message: formRef.current.message.value,
        }),
      });
  
      if (!res.ok) throw new Error("Failed");
  
      setStatus("Message sent!");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("Failed to send.");
    } finally {
      setLoading(false);
    }
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
        <p style={{ color: statusColor, fontWeight: "bold" }}>
          {status}
        </p>
      )}
    </form>
  );
};

export default Contact;
