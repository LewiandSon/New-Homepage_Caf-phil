"use client";

export default function ImpressumPage() {
  return (
    <main className="relative min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif pt-[100px] md:pt-[150px] px-4">
      <div className="max-w-[720px] mx-auto pb-20">
        <h1 
          className="mb-8 text-center"
          style={{
            fontFamily: "Vollkorn",
            fontSize: "35px",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          Imprint
        </h1>
        
        <div
          style={{
            fontFamily: "Vollkorn",
            fontSize: "20px",
            lineHeight: "150%",
            color: "#D72333",
          }}
        >
          <div className="mb-4"><strong>phil Cafe & Bookshop</strong></div>
          <div className="mb-4">Gumpendorfer Straße 10 – 12</div>
          <div className="mb-4">1060 Vienna, Austria</div>
          <div className="mb-4">Phone: 01 581 04 89</div>
          <div className="mb-4">E-Mail: <a href="mailto:info@phil.info" className="underline">info@phil.info</a></div>
          <div className="mb-8">Owner: Lewi & Son GmbH</div>
          
          <h2 
            className="mb-4 mt-8"
            style={{
              fontSize: "28px",
              fontStyle: "italic",
              fontWeight: 900,
            }}
          >
            Datenschutz / Privacy Policy
          </h2>
          <p className="mb-4">
            This website does not collect personal data except for what is necessary to process contact requests. 
            For more information, please contact us at <a href="mailto:info@phil.info" className="underline">info@phil.info</a>.
          </p>
          
          <h2 
            className="mb-4 mt-8"
            style={{
              fontSize: "28px",
              fontStyle: "italic",
              fontWeight: 900,
            }}
          >
            AGB / Terms & Conditions
          </h2>
          <p className="mb-4">
            By using this website, you agree to our terms and conditions. 
            For more information, please contact us at <a href="mailto:info@phil.info" className="underline">info@phil.info</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
