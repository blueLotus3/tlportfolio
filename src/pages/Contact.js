import { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    const form = e.target;
    
    // 1. Convert FormData into URL-encoded format (looks like standard browser navigation)
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData);

    try {
      const res = await fetch("https://formspree.io", {
        method: "POST",
        body: searchParams, // 2. Send the clean query string format
        headers: {
          // 3. Keep headers entirely blank. 
          // The browser automatically injects the safest content type to avoid firewall flags.
        },
      });

      console.log("STATUS:", res.status);

      if (res.ok) {
        setStatus("Message sent!");
        form.reset();
      } else {
        const errData = await res.json().catch(() => null);
        console.log("ERROR RESPONSE:", errData);
        
        if (errData && errData.errors) {
          setStatus(errData.errors.map(err => err.message).join(", "));
        } else {
          setStatus("Failed to send.");
        }
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setStatus("Network error. Please check your internet or disable ad blockers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Me</h2>

      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && <p>{status}</p>}
    </form>
  );
};

export default Contact;

