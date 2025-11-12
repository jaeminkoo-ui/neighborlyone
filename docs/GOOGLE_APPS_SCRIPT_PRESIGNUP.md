# Google Apps Script Setup for Pre-Sign Up Form

## Overview
This guide will help you set up a second Google Apps Script to handle pre-sign up submissions from the "Polishing Up" page. The script will:
1. Save form data to a Google Sheet named "Pre Sign Up"
2. Send email notifications to neighborlyone0129@gmail.com with subject "[Pre Sign Up Requested]"

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Pre Sign Up"
3. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Platform(s)`
   - C1: `Email Address`

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
      data.platforms || 'Not specified',
      data.email
    ]);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        ok: true,
        status: 'success' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        ok: false,
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  const recipient = 'neighborlyone0129@gmail.com';
  const subject = '[Pre Sign Up Requested]';
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #F4C542 0%, #1D3557 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✨ New Pre-Sign Up!</h1>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1D3557; margin-top: 0;">Someone wants to be notified when the app launches!</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F4C542;">
          <p style="margin: 10px 0;"><strong style="color: #1D3557;">Platform(s) of Interest:</strong></p>
          <p style="margin: 10px 0; font-size: 16px; color: #333;">${data.platforms || 'Not specified'}</p>
          
          <p style="margin: 20px 0 10px 0;"><strong style="color: #1D3557;">Email Address:</strong></p>
          <p style="margin: 10px 0; font-size: 16px; color: #333;">
            <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
          </p>
          
          <p style="margin: 20px 0 10px 0;"><strong style="color: #1D3557;">Timestamp:</strong></p>
          <p style="margin: 10px 0; font-size: 14px; color: #666;">${data.timestamp || new Date().toISOString()}</p>
        </div>
        
        <div style="background-color: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400E; font-size: 14px;">
            <strong>💡 Reminder:</strong> This user will receive a $5 coupon when you notify them of the app launch!
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
        
        <p style="color: #666; font-size: 12px; margin: 0;">
          This is an automated notification from the NeighborlyOne Pre-Sign Up Form.
          Add this email to your launch notification list!
        </p>
      </div>
    </div>
  `;
  
  const plainBody = `
New Pre-Sign Up Request for NeighborlyOne App

Platform(s) of Interest: ${data.platforms || 'Not specified'}
Email Address: ${data.email}
Timestamp: ${data.timestamp || new Date().toISOString()}

REMINDER: This user will receive a $5 coupon when you notify them of the app launch!

---
This is an automated notification from the NeighborlyOne Pre-Sign Up Form.
Add this email to your launch notification list!
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
    platforms: 'iOS, Android',
    email: 'test@example.com'
  };
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    testData.timestamp,
    testData.platforms,
    testData.email
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
   - **Description**: "Pre Sign Up Handler" (optional)
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
5. Check the email inbox at neighborlyone0129@gmail.com - you should receive a test notification with subject "[Pre Sign Up Requested]"

## Step 5: Update the Web App

1. Open `/Users/jaeminkoo/neione/web/src/app/polishing-up/page.jsx`
2. Find this line (around line 68):
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_PRESIGNUP_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_PRESIGNUP_URL_HERE"` with your actual Web app URL from Step 3

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
2. Navigate to `http://localhost:4000/polishing-up`
3. Select a platform and enter a test email
4. Click "Send"
5. Verify:
   - Check the "Pre Sign Up" Google Sheet for the new entry
   - Check neighborlyone0129@gmail.com for the notification email with subject "[Pre Sign Up Requested]"
   - Confirm the success message appears on the page

## Troubleshooting

### Form submission fails
- Make sure the Web app is deployed with "Anyone" access
- Verify the URL in `page.jsx` is correct and ends with `/exec`
- Check the Apps Script execution logs: **Executions** tab in Apps Script editor

### Email not received
- Check the spam folder
- Look for subject line "[Pre Sign Up Requested]" (with square brackets)
- Verify the email address in the `sendEmailNotification` function
- Check Apps Script logs for email errors

### Sheet not updating
- Make sure the sheet is named "Pre Sign Up" exactly
- Verify column headers match exactly (Timestamp, Platform(s), Email Address)
- Make sure the sheet is the active (first) sheet in the spreadsheet

## Managing Pre-Sign Up List

### Viewing Submissions
- Open your "Pre Sign Up" Google Sheet to see all submissions
- Sort by Timestamp to see the most recent sign-ups
- Filter by Platform to see iOS vs Android interest

### Preparing for Launch
When you're ready to launch the app:
1. Export the email list from the Google Sheet
2. Draft your launch announcement email
3. Include the $5 coupon code/link as promised
4. Send individual emails or use a mail merge tool
5. Update the `/polishing-up` page to redirect to actual app stores

### Email Template for Launch (Suggested)
```
Subject: 🎉 NeighborlyOne is LIVE + Your $5 Coupon Inside!

Hi there!

Great news – the NeighborlyOne app is now available for [iOS/Android]!

Thank you for pre-signing up. As promised, here's your exclusive $5 coupon:

[COUPON CODE/LINK]

Download the app now:
[iOS App Store Link / Android Play Store Link]

Start discovering local deals in your neighborhood today!

Best regards,
The NeighborlyOne Team
```

## Security Notes

- The Web app URL is public, but that's expected for form submissions
- Consider adding rate limiting or CAPTCHA if you receive spam
- The script only accepts POST requests, not GET requests
- Email addresses are validated on the client side before submission

## Maintenance

### Updating the Script
1. Make changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon ✏️ to edit
4. Under "Version", select **New version**
5. Click **Deploy**
6. **Note**: The Web app URL remains the same, so you don't need to update your code

### Data Privacy
- Pre-sign up data should be handled according to your privacy policy
- Consider adding a note to the form about how the email will be used
- Delete old entries after the launch campaign is complete

---

**Need Help?**
If you encounter any issues, email neighborlyone0129@gmail.com with screenshots of any error messages.

