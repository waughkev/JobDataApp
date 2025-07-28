# Job Application AI Assistant

This application provides a suite of AI-powered tools to streamline the job application process, helping users manage their job experiences, tailor resumes, generate cover letters, and utilize an AI agent network for comprehensive application assistance.

## Features

### User Authentication

* **Secure Login:** Users can securely sign in using their Google account.

* **Persistent Sessions:** Maintains user sessions for seamless access.

### Job Experience Editor (`index.html`)

This page allows users to manage their professional work history.

* **Add New Job Experiences:** Input details such as Job Name, Company, Start/End Dates, Job Description, and Key Skills.

* **Sub-Project Management:** Add, edit, and delete individual sub-projects within each job experience, detailing specific contributions, roles, descriptions, and skills.

* **In-Place Editing:** Easily modify existing job experience and sub-project details directly on the page.

* **Delete Functionality:** Remove job experiences and their associated sub-projects.

* **Real-time Data Synchronization:** All job data is stored and synchronized in real-time with Firestore.

### AI Resume Tailor (`tailor.html`)

This tool helps users customize their resumes for specific job postings.

* **Job Description Input:** Paste a job description, with support for highlighting important keywords using double asterisks (e.g., `**project management**`).

* **AI-Powered Tailoring:** Generates personalized resume suggestions by analyzing the job description against your stored job experiences.

* **Relevant Experience Identification:** Automatically identifies and leverages your most relevant past job experiences for tailoring.

* **Customizable AI Prompts:** Users can add, edit, delete, and enable/disable custom AI directives to guide the tailoring process. Default prompts are also available.

* **ATS Review Notes:** Provides an ATS (Applicant Tracking System) compatibility review of the tailored resume, offering insights on keyword matching, formatting, and readability.

### Cover Letters (`coverletter.html`)

This page serves as a repository for managing your cover letter drafts.

* **Cover Letter Management:** Add, view, edit, and delete your cover letter entries.

* **Real-time Data Synchronization:** Cover letter data is stored and synchronized in real-time with Firestore.

### AI Cover Letter Writer (`cover_letter_writer.html`)

This tool assists in drafting professional cover letters.

* **Job Description Input:** Provide a job description for the AI to analyze.

* **Automated Draft Generation:** Generates a tailored cover letter draft based on the job description, your relevant job experiences, and past cover letter phrasing for inspiration.

* **Customizable AI Prompts:** Integrates user-defined AI prompts to refine the generated cover letter.

* **Company Context:** Leverages company information to ensure the cover letter's tone and emphasis align with the company's values.

### AI Agent Network (`agent_network.html`)

This integrated workflow streamlines the application process from job posting to tailored documents.

* **Flexible Job Input:** Input job postings either by pasting a direct URL or by pasting the full job description content.

* **Job Posting Classification:** An AI agent classifies the content, extracts the detailed job description, determines remote status, identifies location, and extracts salary information.

* **Tailored Resume Generation:** Automatically generates tailored resume suggestions using the extracted job details and your stored job experiences.

* **Cover Letter Draft Generation:** Creates a draft cover letter based on the job description and your relevant professional history.

* **Company Context (Currently Disabled):** The company context research step is currently commented out and disabled, meaning it will not provide company-specific insights for resume or cover letter generation on this page.

## Technologies Used

* **Frontend:** HTML, Tailwind CSS, JavaScript

* **Backend/Database:** Google Firebase (Authentication, Firestore)

* **AI/LLM:** Google Gemini API (gemini-2.0-flash for text generation and structured responses, google_search tool for web research)

## Deployment

This application is designed for deployment on Heroku.