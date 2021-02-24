# Recover Password

**FR**

- The user should be able to request a password recover using his e-email;
- The user should receive an e-mail with recover password instructions;
- The user should be able to reset his password;

**NFR**

- Use MailTrap Service to test the e-mails sending process in DEV;
- Use Amazon SES to send e-mails in production;
- Sending e-mails must be done in background Job (Queue);

**BR**

- Create tokens to represent the user email and the expiration date.
- The reset password link sent to the user, must expire in 2h;
- The user must confirm his new password when requested;

# Update Profile

**FR**

- The User should be able to update his name, e-mail and password;

**BR**

- The User shouldn't be able to change his e-email to a alredy userd one;
- To update the password, the user must provide the old password;
- To Update the password, the user must confirm the new password;

# Provider Dashboad

**FR**

- The Provider should be able to list his appointments by day;
- The Provider should receive a notification when happen any new appointment;
- The Provider should be able to see all unread notifications;

**NFR**

- The list of appointment should be saved in cache;
- The notifications should be saved in MongoDb;
- The notifications should be send in real-time using Socket.io;

**BR**

- The notifications should contain the status read or unread;

# Service scheduling

**FR**

- The User should be able to list all Providers registered;
- The User should be able to list the days with at least one available schedule of a Provider by month;
- The User should be able to list the aveilable schelude of a Provider by day;
- The User should be able to schedule an appointment with a Provider;

**NFR**

- The Provider List should be saved in cache;

**BR**

- Each appointment should last 1h;
- The appointment should be available between 8h until 18h (first: 8h, last: 17h);
- The user shouldn't be able to schedule an appointment at an alredy scheduled time;
- The user shouldn't be able to schedule an appointment in an alredy passed time;
- The user shouldn't be able to schedule an appointment with him self;

# Legend

- FR = Functional requirements
- NFR = Non-functional requirements
- BR = Business Requirements
