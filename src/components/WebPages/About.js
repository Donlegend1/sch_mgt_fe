import React, { useEffect } from "react";


const About = () => {
  useEffect(() => {
    const loadWhatsAppWidget = () => {
      // Replace with your group invite link

      const options = {
        whatsapp: "+2349034453232", // WhatsApp number
        call_to_action: "Chat us now", // Call to action
        position: "left", // Position may be 'right' or 'left'
        pre_filled_message: `Hello, Chat us now`, // WhatsApp pre-filled message
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
            About Us
          </h1>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-end">
            <div
              className="col-lg-6 col-md-7 wow fadeInUp"
              data-wow-delay="0.3s">
              {/* <h1 className="display-1 text-primary mb-0">1k +</h1> */}
              {/* <p className="text-primary mb-4">Enrolled practioners</p> */}
              <h1 className="display-5 mb-4">Efficient Enrollment Process</h1>
              <p className="mb-4">
                We have simplified the enrollment process for legal practioners.
                through this application, you will be able to search your name
                for eligibility, make payment, enter your enrollment details and
                wait for verification.
              </p>
              <a
                className="btn btn-primary py-3 px-4"
                href="#">
                Enroll Now
              </a>
            </div>
            <div
              className="col-lg-6 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s">
              <div className="row g-5">
                <div className="col-12 col-sm-6 col-lg-12">
                  <div className="border-start ps-4">
                    <i className="fa fa-check fa-3x text-primary mb-3" />
                    <h4 className="mb-3">Easy Process</h4>
                    <span>
                      We have made enrollment process simple and easy, you can
                      apply for enrollment from the confort of your home
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-12">
                  <div className="border-start ps-4">
                    <i className="fa fa-users fa-3x text-primary mb-3" />
                    <h4 className="mb-3">Dedicated Team</h4>
                    <span>
                      We have dedicated IT members that are available 24/7 to
                      guide you through the process
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
