export const generateOTPEmailTemplate = (randomOtp: string) => {
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
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      text-align: center;
      margin: 20px 0;
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
      <strong>Your OTP Verification Code</strong>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Thank you for using CraftersWealth services. Please use the OTP below to complete your verification process:</p>
      <div class="otp">${randomOtp}</div>
      <p>This OTP is valid for the next <strong>2 minutes</strong>. Do not share it with anyone.</p>
      <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CraftersWealth. All rights reserved.</p>
      <p>
        Need help? Contact us at <a href="mailto:support@crafterswealth.com">support@crafterswealth.com</a>.
      </p>
    </div>
  </div>
</body>
</html>
`;
};
