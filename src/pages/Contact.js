import { useRef, useState } from "react";

const Contact = () => {
    const formRef = useRef(null);
    const [status, setStatus] = useState("");
    const [statusColor, setStatusColor] = useState("");
    const [loading, setLoading] = useState(false);
  
    const sendEmail = async (e) => {
      e.preventDefault();
      setLoading(true);
      setStatus("Sending...");
      setStatusColor("#6b7280");

      // Extract values manually from the form state or elements
      const formData = {
        from_name: formRef.current.from_name.value,
        from_email: formRef.current.from_email.value,
        message: formRef.current.message.value,
      };
  
      try {
        // Hits your local domain API wrapper route, hiding from adblockers
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus("Message sent successfully!");
          setStatusColor("#22c55e");
          formRef.current.reset();
        } else {
          throw new Error(result.error || "Server processing failed.");
        }
      } catch (error) {
        console.error("Form Submission Error:", error);
        setStatus(`Failed: ${error.message}`);
        setStatusColor("#ef4444");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form ref={formRef} onSubmit={sendEmail} className="contact-form">
        <h2>Contact Me</h2>
        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="from_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
  
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
  
        {status && (
          <p id="form-status" style={{ color: statusColor, fontWeight: "bold" }}>
            {status}
          </p>
        )}
      </form>
    );
};

export default Contact;
