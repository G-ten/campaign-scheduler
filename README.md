## Setup backend

1) just create MongoDB Atlas accout database url
2) cd campaign-scheduler-server
3) npm install

## Setup frontend
1) cd campaign-scheduler
2) npm install
 
## start server
1) cd campaign-scheduler-server
2) nodemon

## start react app
1) cd campaign-scheduler
2) npm start

# Campaign Scheduler App

A simple campaign management app that allows users to create campaigns, schedule messages, and manage recipients. Users can view campaign lists, detailed campaign information, and receive email notifications for scheduled campaigns.

---

## **Features**

- User **Sign Up** and **Login** (JWT-based)
- Add a campaign with:
  - Title
  - Message
  - Scheduled time
  - Multiple recipients (Name & Email)
- Email notifications sent at the scheduled time
- View all campaigns with status (Pending / Sent)
- View detailed campaign information including recipients and their status
- Responsive and modern UI using React and Bootstrap

---

## **App Test Instructions**

### **1. Sign Up / Log In**
- Create a new account **or** log in using your existing credentials.  
- Confirm access to the **dashboard**.

### **2. Add a Campaign**
- Navigate to **“Add Campaign”**.  
- Fill in campaign details:
  - **Title:** Descriptive name of the campaign  
  - **Message:** Content to be sent to recipients  
  - **Scheduled Time:** Must be a **future date/time**  
  - **Recipients:** Add one or more recipients with **Name** and **Email**  
- Click **Submit** to save the campaign.

### **3. Verify Email Notification**
- Ensure the scheduled time triggers an **email notification** to all recipients.  
- Confirm correct delivery of emails.

### **4. View Campaign List**
- Go to the **Campaign List / Dashboard**.  
- Verify that the newly created campaign appears.  
- Check **status** (Pending / Sent).

### **5. View Campaign Details**
- Click on a campaign to open **Detailed View**.  
- Confirm all details:
  - **Title**  
  - **Message**  
  - **Scheduled Time**  
  - **Recipients** with **Name, Email, and Status**

---

## **Validation & Tips**
- Required fields must be filled.  
- Recipients can be added or removed dynamically.  
- Scheduled time **cannot be in the past**.  
- Multiple recipients should be tested to ensure proper handling.  
- After the scheduled time, **check emails** and verify the **status updates** on the dashboard.

---

## **Tech Stack**

- **Frontend:** React, Formik, Bootstrap, React DatePicker  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Mailer:** Nodemailer 


