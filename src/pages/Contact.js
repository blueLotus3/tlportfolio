import { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    const form = e.target;
    // 1. Convert FormData to a standard JSON object to bypass strict body/header blocks
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("https://formspree.io/f/xwvzgnvv", {
        method: "POST",
        body: JSON.stringify(data), // 2. Send as a clean JSON string
        headers: {
          "Content-Type": "application/json", // 3. Explicitly tell the server it is JSON
          "Accept": "application/json",
        },
      });

      console.log("STATUS:", res.status);

      if (res.ok) {
        setStatus("Message sent!");
        form.reset();
      } else {
        const errData = await res.json().catch(() => null);
        console.log("ERROR RESPONSE:", errData);
        
        // 4. Handle exact error reasons (like captcha blocks or missing fields)
        if (errData && errData.errors) {
          setStatus(errData.errors.map(err => err.message).join(", "));
        } else {
          setStatus("Failed to send.");
        }
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      // 5. This catch block triggers if a local firewall, VPN, or AdBlocker kills the request entirely
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
