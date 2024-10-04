import React, { useState } from 'react';
import './FAQs.css';
import Navbar from '../shared/Navbar'; // Ensure this path is correct based on your project structure

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I apply for a job?",
      answer:
        "To apply for a job, click on the 'Apply Now' button on the job listing page and fill out the required information in the application form."
    },
    {
      question: "What documents do I need to submit?",
      answer:
        "You typically need to submit your resume and a cover letter. Some employers may also ask for additional documents such as a portfolio, references, or certifications."
    },
    {
      question: "How can I track my job application status?",
      answer:
        "You can track your application status by logging into your account and navigating to the 'My Applications' section, where you will see updates on all your submitted applications."
    },
    {
      question: "Can I edit my job application after submission?",
      answer:
        "No, you cannot edit your application once it has been submitted. However, you can withdraw your application and submit a new one if necessary."
    },
    {
      question: "How long does it take to hear back after applying?",
      answer:
        "Response times vary depending on the employer. Typically, you can expect to hear back within 1 to 2 weeks. You can also check the job listing for any specific timeline information."
    }
  ];

  return (
    <>
      <Navbar /> {/* Include the Navbar at the top of the page */}
      <div className="faqs-page">
        <h2>Frequently Asked Questions</h2>
        <div className="faqs-container">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? '-' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQs;
