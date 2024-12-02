import { ContactFormValues } from "@/pages/contact";

export const generateContactUsEmailBody = (data: ContactFormValues): string => {
  return `
    <!DOCTYPE html>
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
          margin: 8px 0;
          line-height: 1.6;
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
          <strong>Contact Us Query</strong>
        </div>
        <div class="content">
          <p><strong>Full Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Query:</strong> ${data.query}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} CraftersWealth. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
