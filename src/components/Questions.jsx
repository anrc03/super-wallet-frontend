import React, { useState } from 'react';

export default function Questions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsData
    .filter((question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(questionsData.length / questionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto animate__animated animate__fadeInUp" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 text-green fw-bold">FAQs</h1>
          <p className="text-green fs-5 mb-3">Frequently Asked Questions</p>
          <input type="text" placeholder="Search for a question ..." className="form-control mb-4 py-2" value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {currentQuestions.length === 0 && (
              <>
                <div className="image-search d-flex justify-content-center">
                  <img style={{ width: '200px' }} src="./src/assets/images/Search.png" alt="Search Picture" />
                </div>
                <p className="text-center text-green">Sorry, your search <strong>"{searchQuery}"</strong> was not found</p>
              </>
            )}
            {currentQuestions.length > 0 && (
              <div className="accordion" id="accordionExample">
                {currentQuestions.map((question, index) => (
                  <div key={index} className="accordion-item animate__animated animate__fadeInUp">
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>{question.title}</button>
                    </h2>
                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                      <div className="accordion-body">{question.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <nav className="mt-4" aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={prevPage}>&laquo;</button>
                </li>
                {Array.from({ length: Math.ceil(questionsData.length / questionsPerPage) }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link page-number" onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(questionsData.length / questionsPerPage) ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={nextPage}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

const questionsData = [
  {
    title: "What is Super Wallet and how does it work?",
    answer: "Super Wallet is a user-friendly platform designed for seamless currency exchange. It allows you to buy, sell, and manage various currencies effortlessly. Download the app, sign up, and start exchanging currencies with ease."
  },
  {
    title: "Is Super Wallet secure?",
    answer: "Yes, security is our top priority. Super Wallet employs advanced encryption and secure storage protocols to ensure the confidentiality and safety of your financial information. Your transactions and data are protected 24/7."
  },
  {
    title: "How do I get started with Super Wallet?",
    answer: "Getting started is easy! Download the app, create an account, and follow the simple setup process. Once registered, you can explore the features and start trading and exchanging currencies at your own pace."
  },
  {
    title: "Are there any fees for using Super Wallet?",
    answer: "Super Wallet offers cheap and efficient currency exchange fees for your needs."
  },
  {
    title: "What currencies are supported by Super Wallet?",
    answer: "Super Wallet supports various currencies, allowing you to exchange and manage multiple denominations. You can find the complete list of supported currencies within the app."
  },
  {
    title: "Can I track my transaction history on Super Wallet?",
    answer: "Absolutely. Super Wallet provides a comprehensive transaction history feature, allowing you to track and review all your past exchanges. This feature enhances transparency and helps you keep detailed records."
  },
  {
    title: "How long does it take for transactions to process on Super Wallet?",
    answer: "Transaction processing times may vary depending on factors such as the type of transaction and network congestion. Typically, transactions on Super Wallet are processed within a few minutes to a few hours."
  },
  {
    title: "Can I transfer funds between different currency wallets on Super Wallet?",
    answer: "Yes, you can transfer funds between different currency wallets within your Super Wallet account. Simply navigate to the \"Transfer\" or \"Exchange\" section of the app to initiate the transfer."
  },
  {
    title: "What customer support options are available on Super Wallet?",
    answer: "Super Wallet provides various customer support options, including email support, live chat, and a comprehensive FAQ section. You can reach out to our support team at any time for assistance with your account or transactions."
  },
  {
    title: "Is there a minimum or maximum amount for transactions on Super Wallet?",
    answer: "Super Wallet does not impose strict limits on transaction amounts, thereby providing users with flexibility in their transaction activities."
  },
  {
    title: "What measures does Super Wallet take to prevent fraud and unauthorized access to accounts?",
    answer: "Super Wallet employs strong security measures, including multi-factor authentication and continuous monitoring, to protect against fraud and unauthorized access to accounts."
  },
  {
    title: "Are there any restrictions in the countries where the Super Wallet service is available?",
    answer: "Super Wallet aims to provide its services globally. However, certain legal restrictions or regulatory requirements may limit access in some areas. Please check the app for the latest information about supported countries."
  },
  {
    title: "What steps should I take if I experience problems or discrepancies with transactions in Super Wallet?",
    answer: "If any problems or discrepancies occur in the transaction, please immediately contact Super Wallet customer support. Our dedicated team will investigate and resolve the issue efficiently to ensure your satisfaction and safety."
  },
];