// FinancialTipPage.jsx

import React from 'react';

function FinancialTipPage() {
  return (
    <div>
      <h2>Financial Education and Tips</h2>
      <div>
        <h3>Beneficial Financial Tips</h3>
        <ul>
          <li>Start budgeting and track your expenses regularly.</li>
          <li>Set financial goals and create a plan to achieve them.</li>
          <li>Build an emergency fund to cover unexpected expenses.</li>
          <li>Pay off high-interest debt as soon as possible.</li>
          <li>Invest in your financial education and stay informed about personal finance topics.</li>
        </ul>
      </div>
      <div>
        <h3>Watch This Video</h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/j_sfnvgg_JU"
          title="Financial Education Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default FinancialTipPage;
