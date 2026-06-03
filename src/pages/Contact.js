import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    const formData = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      message: formRef.current.message.value,
    };

    try {
      const res = await fetch("https://tlbe.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("Message sent successfully!");
      formRef.current.reset();
    } catch (err) {
      console.error("Send error:", err);
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="contact-form">
      <h2>Contact Me</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
      />

      <input
        type="email"
        name="email"
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
        <p style={{ fontWeight: "bold" }}>
          {status}
        </p>
      )}
    </form>
  );
};

export default Contact;