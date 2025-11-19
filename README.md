# Phishing Simulator

A full-stack phishing simulation and reporting platform designed for cybersecurity awareness training.
Users can receive simulated phishing emails, interact with realistic landing pages, and admins can track results through detailed dashboards.

## Features
### Phishing Simulation
- Create and send phishing emails to targeted mailing lists
- Unique tracking links for monitoring clicks and credential submissions

### Reporting
- Visual reports
- View campaign performance
- Track clicks, credential entries, and user responses

### Security
- JWT-based authentication
- Optional Multi-Factor Authentication (MFA)

## Tech Stack
### Frontend
- HTML
- CSS
- JavaScript + React

### Backend
- Node.js + Express


### Database
- MongoDB + Mongoose
- MariaDB + Sequelize

### Infrastructure
- DigitalOcean Ubuntu 22.04 (Production)
- WSL Ubuntu 22.04 (Development)
- Kali Linux (Testing)
- Nginx (Static hosting, Reverse Proxy)
- IONOS DNS management

### Email Delivery
- Gmail

### Transactional Emails
- Resend

### Defense in Depth
- Users → React → Network Firewall → OS Firewall → Nginx
- Admin → Network Firewall → OS Firewall → SSHD
- Optional multi factor authentication


### Mockups & Design
- Figma (UI mockups)


## Achievements

- Fully functioning MFA
- Scalable architecture

## Future Improvements

- AI Chatbot to quickly find campaign data
- AI-powered generator for custom landing pages and email templates

