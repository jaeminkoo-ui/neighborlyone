# Google Apps Script Setup for Support Form

## Overview
This guide will help you set up a Google Apps Script to handle support form submissions. The script will:
1. Save form data to a Google Sheet
2. Send email notifications to neighborlyone0129@gmail.com

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "NeighborlyOne Support Requests"
3. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Message`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append the data to the sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.message
    ]);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  const recipient = 'neighborlyone0129@gmail.com';
  const subject = 'New Support Request Posted';
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2D7FF9;">New Support Request from NeighborlyOne</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 10px 0;"><strong>Timestamp:</strong> ${data.timestamp || new Date().toISOString()}</p>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #333;">Message:</h3>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2D7FF9; border-radius: 4px;">
          ${data.message}
        </p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
      
      <p style="color: #666; font-size: 12px;">
        This is an automated notification from the NeighborlyOne Support Form.
        Please reply directly to ${data.email} to respond to this request.
      </p>
    </div>
  `;
  
  const plainBody = `
New Support Request from NeighborlyOne

Name: ${data.name}
Email: ${data.email}
Timestamp: ${data.timestamp || new Date().toISOString()}

Message:
${data.message}

---
This is an automated notification. Please reply to ${data.email} to respond.
  `;
  
  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody,
      replyTo: data.email
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error - we still want to save to sheet even if email fails
  }
}

// Test function (optional - for debugging)
function testScript() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message to verify the script is working correctly.'
  };
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    testData.timestamp,
    testData.name,
    testData.email,
    testData.message
  ]);
  
  sendEmailNotification(testData);
  
  Logger.log('Test completed successfully!');
}
```

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Support Form Handler" (optional)
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone"
5. Click **Deploy**
6. **Important**: Copy the **Web app URL** that appears (it will look like: `https://script.google.com/macros/s/AKfycbz.../exec`)
7. Click **Done**

## Step 4: Test the Script (Optional)

1. In the Apps Script editor, select the `testScript` function from the dropdown
2. Click the **Run** button (▶️)
3. The first time you run it, you'll need to authorize the script:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project name] (unsafe)**
   - Click **Allow**
4. Check your Google Sheet - you should see a test row added
5. Check the email inbox at neighborlyone0129@gmail.com - you should receive a test notification

## Step 5: Update the Web App

1. Open `/Users/jaeminkoo/neione/web/src/app/support/page.jsx`
2. Find this line (around line 45):
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"` with your actual Web app URL from Step 3

Example:
```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXX/exec";
```

## Step 6: Test the Form

1. Start your local development server:
   ```bash
   cd /Users/jaeminkoo/neione/web
   npm run dev
   ```
2. Navigate to `http://localhost:4000/support`
3. Fill out the form with test data
4. Click "Submit Request"
5. Verify:
   - Check the Google Sheet for the new entry
   - Check neighborlyone0129@gmail.com for the notification email

## Troubleshooting

### Form submission fails
- Make sure the Web app is deployed with "Anyone" access
- Verify the URL in `page.jsx` is correct and ends with `/exec`
- Check the Apps Script execution logs: **Executions** tab in Apps Script editor

### Email not received
- Check the spam folder
- Verify the email address in the `sendEmailNotification` function
- Check Apps Script logs for email errors

### Sheet not updating
- Make sure the sheet is the active (first) sheet in the spreadsheet
- Verify column headers match exactly

## Security Notes

- The Web app URL is public, but that's expected for form submissions
- Consider adding rate limiting or CAPTCHA if you receive spam
- The script only accepts POST requests, not GET requests
- Email addresses are validated on the client side before submission

## Maintenance

### Viewing Submissions
- Open your Google Sheet to see all submissions in one place
- Use Google Sheets' built-in features to filter, sort, and analyze data

### Updating the Script
1. Make changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon ✏️ to edit
4. Under "Version", select **New version**
5. Click **Deploy**
6. **Note**: The Web app URL remains the same, so you don't need to update your code

---

**Need Help?**
If you encounter any issues, email neighborlyone0129@gmail.com with screenshots of any error messages.

