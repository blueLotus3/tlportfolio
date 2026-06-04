import { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    try {
      // Formspree requires mode: "cors" and simple JSON structure to bypass local firewalls
      const res = await fetch("https://formspree.io/f/xwvzgnvv", {
        method: "POST",
        mode: "cors", // 👈 FORCE standard cross-origin configuration
        body: JSON.stringify(data), 
        headers: {
          "Content-Type": "application/json", 
          // ❌ Removed 'Accept': 'application/json' to stop aggressive preflight firewall checks
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
