import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const loadWhatsAppWidget = () => {
      // Replace with your group invite link

      const options = {
        whatsapp: "+2347016373857", // WhatsApp number
        call_to_action: "Join Our WhatsApp Group", // Call to action
        position: "left", // Position may be 'right' or 'left'
        pre_filled_message: `Chat us now`, // WhatsApp pre-filled message
      };

      const proto = document.location.protocol;
      const host = "getbutton.io";
      const url = proto + "//static." + host;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = url + "/widget-send-button/js/init.js";

      script.onload = () => {
        window.WhWidgetSendButton.init(host, proto, options);
      };

      document.body.appendChild(script);
    };

    const loadTawkToScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://embed.tawk.to/65de8a8a8d261e1b5f663929/1hnmkqbr5";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.body.appendChild(script);
    };

    loadTawkToScript();
    loadWhatsAppWidget();

    // Cleanup function
    return () => {
      // You may want to remove the script when the component unmounts
      // Example: document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ marginTop: `0px` }}>
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeIn"
              data-wow-delay="0.1s">
              <p className="fs-5 fw-bold text-primary">Contact Us</p>
              <h1 className="display-5 mb-5">
                Encountered Issues? Please Contact Us
              </h1>
              {/* <p className="mb-4">If you have encountered any issues with enrollment please send us a message.</p> */}
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: 100 }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary py-3 px-4"
                      type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="col-lg-6 wow fadeIn"
              data-wow-delay="0.5s"
              style={{ minHeight: 450 }}>
              <div className="position-relative rounded overflow-hidden h-100">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252187.7026599314!2d7.2850551942422515!3d9.024219279233671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4a20ea12b!2sAbuja%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1723542068617!5m2!1sen!2sng"
                  width="600"
                  height="450"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
