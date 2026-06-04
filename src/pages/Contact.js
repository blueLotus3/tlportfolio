import { useState } from "react";


const Contact = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    const form = e.target;

    try {
      const res = await fetch("https://formspree.io/f/xwvzgnvv", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      // 🔥 ADD THIS DEBUG (important for your case)
      console.log("STATUS:", res.status);

      if (res.ok) {
        setStatus("Message sent!");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        console.log("ERROR RESPONSE:", data);
        setStatus("Failed to send.");
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setStatus("Network error (failed to reach server).");
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