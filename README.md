### Multisport Games Website - README

Welcome to the Multisport Games website repository! This site is designed to streamline the organization and management of the annual Multisport Games, an Olympic-style event held every summer. The website helps track scores, standings, and other important details of the event.

---

#### Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

### Overview

The Multisport Games is an annual event that brings together friends and family for a weekend of sports and fun. This website is developed to facilitate event management by tracking scores, updating standings, managing teams, and communicating with participants.

#### Key Details

- **Event Dates**: August 9-11
- **Locations**: Various venues around the Plymouth area
- **Participants**: Teams of four, primarily young adults in their 20s, with some older adults and late teens

---

### Features

- **User Accounts**: Secure login for participants to access their profiles and team information.
- **Team Management**: Option for draft system or committee selection for team formation.
- **Score Tracking**: Real-time updates on scores and standings for each event.
- **Event Scheduling**: Detailed schedule for each day of the event.
- **Communication**: Email notifications and updates using AWS SES.
- **Feedback Collection**: Post-event feedback form for continuous improvement.
- **Participant Preferences**: Options for pre-event activities such as team practices, draft combine, event playtesting, and social hangouts.

---

### Technologies Used

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Auth0
- **Email Service**: AWS SES
- **Hosting**: Heroku
- **Version Control**: Git

---

### Installation

To run the website locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/y2014sheas/multisport-games.git
   cd multisport-games
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   SES_ACCESS_KEY=your_aws_ses_access_key
   SES_SECRET_KEY=your_aws_ses_secret_key
   AUTH0_DOMAIN=your_auth0_domain
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

5. **Open the website in your browser:**
   ```
   http://localhost:3000
   ```

---

### Usage

- **Admin Panel**: Manage event details, participant information, and team assignments.
- **Participant Portal**: Access personal profiles, team info, event schedules, and receive notifications.
- **Scoreboard**: View real-time updates on scores and standings.

---

### Contributing

We welcome contributions from the community! To contribute:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes and commit them:**
   ```bash
   git commit -m "Description of feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-name
   ```
5. **Create a pull request.**

---

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

### Contact

For any questions or suggestions, feel free to reach out to us at [multisportgames@example.com](mailto:multisportgames@example.com).

---

Thank you for being part of the Multisport Games community! Let’s make this event a success together.
(if cum
a=123 then peppe)
