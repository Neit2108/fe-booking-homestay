// src/components/PaymentFlow.jsx
import React, { useState } from "react";
import Step1 from "../Payments/Step1.jsx";
import Step2 from "../Payments/Step2.jsx";
import Step3 from "../Payments/Step3.jsx";

function PaymentFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const property = {
    mainImage: "src/assets/Home/place_image_example_2.jpg",
    name: "Sample Property",
    address: "123 Sample Street",
    price: 100,
  };
  const people = 2;
  const days = 3;
  const totalPrice = property.price * days;
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + days - 1));

  const handleNext = () => {
    console.log("Current Step before:", currentStep); // Debug
    if (currentStep < 3) {
      setCurrentStep((prevStep) => {
        const newStep = prevStep + 1;
        console.log("Current Step after:", newStep); // Debug
        return newStep;
      });
    }
  };
  const handleBack = () => {
    console.log("handleBack called in PaymentFlow");
    console.log("Current Step before update:", currentStep);
    if (currentStep > 1) {
      setCurrentStep((prevStep) => {
        const newStep = prevStep - 1;
        console.log("Current Step after update:", newStep);
        return newStep;
      });
    } else {
      console.log("Already at the first step");
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <Step1
          onNext={handleNext}
          setPaymentMethod={setPaymentMethod}
          property={property}
          people={people}
          days={days}
          totalPrice={totalPrice}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      {currentStep === 2 && (
        <Step2
          onNext={handleNext}
          onBack={handleBack}
          paymentMethod={paymentMethod}
          property={property}
          days={days}
          totalPrice={totalPrice}
          people={people}
        />
      )}
      {currentStep === 3 && (
        <Step3
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default PaymentFlow;
