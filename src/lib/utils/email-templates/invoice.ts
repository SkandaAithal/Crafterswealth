import { InvoiceData } from "@/lib/types/checkout";

export const generateInvoiceHTMLforPDF = (invoiceData: InvoiceData): string => {
  const roundedGrandTotal = Math.round(invoiceData.totals.grandTotal);
  const roundOff = roundedGrandTotal - invoiceData.totals.grandTotal;

  const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          line-height: 1.4;
        }
        p {
          margin: 0px;
          padding: 0px;
          font-size: 14px;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .address {
          width: 70%;
        }
        .invoice-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .invoice-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .buyer-details,
        .invoice-details {
          width: 30%;
        }
        .section-title {
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .subproduct {
          padding-left: 10px;
        }
        .total-row {
          font-weight: bold;
        }
        .tax-details,
        .totals {
          margin-bottom: 20px;
        }
        .amount-in-words {
          margin: 15px 0;
        }
        .amount-words {
          font-size: 14px;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .signature {
          text-align: right;
        }
        .declaration {
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1 class="invoice-title">TAX INVOICE</h1>
      </div>
  
      <div class="invoice-info">
        <div class="address">
          <div class="section-title">Crafters Financial Research Pvt., Ltd.</div>
          <p># A-303, 2nd Floor, IGV Apartments, Ideal Home Township, Rajarajeshwari Nagar, Bangalore – 560098.</p>
          <p>GSTIN/UIN: 29AALCC6221H1ZK</p>
          <p>PAN/IT No: AALCC6221H</p>
          <p>SEBI Regn. No: INH000016117</p>
          <p>State Name: Karnataka, Code: 29</p>
          <p>E-Mail: support@crafterswealth.com</p>
        </div>
  
        <div class="invoice-details">
          <p><span class="section-title">Invoice No:</span> ${invoiceData.invoiceMetadata.invoiceNumber}</p>
          <p><span class="section-title">Invoice Date:</span> ${invoiceData.invoiceMetadata.invoiceDate}</p>
        </div>
      </div>
  
      <div class="invoice-info">
        <div class="buyer-details">
          <div class="section-title">Buyer (Bill To):</div>
          <p>${invoiceData.buyerDetails.name}</p>
          <p>${invoiceData.buyerDetails.email}</p>
          <p>${invoiceData.buyerDetails.phone}</p>
          <p>${invoiceData.buyerDetails.address.area}</p>
          <p>${invoiceData.buyerDetails.address.city}, ${invoiceData.buyerDetails.address.state}, ${invoiceData.buyerDetails.address.postalCode}</p>
          <p>${invoiceData.buyerDetails.address.country}</p>
        </div>
        <div class="invoice-details">
          <p><span class="section-title">Payment Method:</span> ${invoiceData.invoiceMetadata.paymentMethod}</p>
          <p><span class="section-title">Order Number:</span> ${invoiceData.orderDetails.orderNumber}</p>
          <p><span class="section-title">Order Date:</span> ${invoiceData.orderDetails.orderDate}</p>
          <p><span class="section-title">Place of Supply:</span> ${invoiceData.orderDetails.placeOfSupply}</p>
        </div>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Particulars</th>
            <th>HSN/SAC</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items
            .map(
              (item, index) =>
                `<tr>
                  <td>${index + 1}</td>
                  <td><div>${item.name}</div>
                    ${item.subProducts
                      .map(
                        (subProduct, subIndex) =>
                          `<p class="subproduct">
                            <span>${index + 1}${String.fromCharCode(97 + subIndex)}. </span>
                            <span>${subProduct}</span>
                          </p>`
                      )
                      .join("")}
                  </td>
                  <td>${item.hsnCode}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.amount.toFixed(2)}</td>
                </tr>`
            )
            .join("")}
          <tr class="total-row">
            <td colspan="4">Subtotal</td>
            <td>₹${invoiceData.totals.subtotal.toFixed(2)}</td>
          </tr>
          ${
            invoiceData.taxDetails.isWithinState
              ? `<tr><td colspan="4">SGST</td><td>₹${invoiceData.taxDetails.sgst.toFixed(2)}</td></tr>
                 <tr><td colspan="4">CGST</td><td>₹${invoiceData.taxDetails.cgst.toFixed(2)}</td></tr>`
              : `<tr><td colspan="4">IGST</td><td>₹${invoiceData.taxDetails.igst.toFixed(2)}</td></tr>`
          }
          ${
            roundOff !== 0
              ? `<tr><td colspan="4">Round Off</td><td>₹${roundOff.toFixed(2)}</td></tr>`
              : ""
          }
          <tr class="total-row">
            <td colspan="4">Total</td>
            <td>₹${roundedGrandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="invoice-info amount-in-words">
        <div>
          <p class="amount-words">Amount Chargeable (in words):</p><strong> ${invoiceData.totals.amountInWords}</strong>
        </div>
        <p>E. & O.E.</p>
      </div>
  
      <div class="tax-details">
        <div><strong>Tax Details:</strong></div>
        <table>
          <thead>
            <tr>
              <th>HSN/SAC</th>
              <th>Taxable Value</th>
              ${
                invoiceData.taxDetails.isWithinState
                  ? `<th>SGST</th><th>CGST</th>`
                  : `<th>IGST</th>`
              }
              <th>Total Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items
              .map(
                (item) =>
                  `<tr>
                    <td>${item.hsnCode}</td>
                    <td>₹${item.amount.toFixed(2)}</td>
                    ${
                      invoiceData.taxDetails.isWithinState
                        ? `<td>₹${(item.amount * 0.09).toFixed(2)}</td>
                           <td>₹${(item.amount * 0.09).toFixed(2)}</td>`
                        : `<td>₹${(item.amount * 0.18).toFixed(2)}</td>`
                    }
                    <td>₹${(item.amount * 0.18).toFixed(2)}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
       <div class="amount-in-words">
          <p class="amount-words">Tax Amount (in words):</p><strong> ${invoiceData.taxDetails.amountInWords}</strong>
       </div>
      <div class="footer">
        <div class="declaration">
          <p><strong>Declaration:</strong></p>
          <p>This is a digitally generated invoice and does not require a signature.</p>
          <p>Subject to Bangalore, Karnataka, India Jurisdiction</p>
        </div>
  
        <div class="signature">
          <p>For Crafters Financial Research Pvt., Ltd.,</p>
          <p>Sd/-</p>
          <p>Authorized Signatory</p>
        </div>
      </div>
    </body>
  </html>
  `;

  return htmlContent;
};

export const generateInvoiceEmailTemplate = (
  invoiceData: InvoiceData,
  pdfLink: string
): string => {
  const { buyerDetails, invoiceMetadata } = invoiceData;

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 20px;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content p {
      margin: 0 0 16px;
      line-height: 1.6;
    }
    .invoice-number {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
      text-align: center;
      margin: 20px 0;
    }
    .pdf-link {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      text-align: center;
    }
    .pdf-link:hover {
      background-color: #0056b3;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666666;
      padding: 20px;
      background-color: #f1f1f1;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <strong>Order Invoice</strong>
    </div>
    <div class="content">
      <p>Hi ${buyerDetails.name},</p>
      <p>Thank you for your business with CraftersWealth! Please download your invoice below:</p>
      <div class="invoice-number">Invoice Number: ${invoiceMetadata.invoiceNumber}</div>
      <div style="display: flex; justify-content: center;">
       <a href="${pdfLink}" class="pdf-link" download>Download Invoice</a>
      </div>
     
      <p style="text-align: center">We appreciate your trust in us and look forward to serving you again!</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CraftersWealth. All rights reserved.</p>
      <p>
        Need help? Contact us at <a href="mailto:support@crafterswealth.com">support@crafterswealth.com</a>.
      </p>
    </div>
  </div>
</body>
</html>`;
};
