import React, { useEffect } from "react";
import About from "../Scn-WebComponents/About";


const AboutPage = () => {
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

     <About />
    </>
  );
};

export default AboutPage;
