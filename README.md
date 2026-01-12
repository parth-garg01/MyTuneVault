# MyTuneVault 🎵

**MyTuneVault** is a "Next-Gen" web music player featuring a stunning **Glassmorphism UI** and cloud connectivity via **Supabase**. It is designed to be a premium, portfolio-ready application that moves beyond standard clones.

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20Supabase-blue)

## ✨ Features

*   **Glassmorphism Design**: Modern, frosted-glass aesthetics with animated neon backgrounds.
*   **Cloud Library**: Dynamically fetches songs and metadata from a **Supabase** database.
*   **Smart Fallback**: Works offline using local assets if the database connection fails.
*   **Audio Engine**: Custom JavaScript audio controller with seek, skip, and volume controls.
*   **Responsive**: "App-like" feel on both desktop and mobile.

## 🚀 Tech Stack

*   **Frontend**: Vanilla HTML5, CSS3 (Variables, Grid, Flexbox), JavaScript (ES6+ Modules).
*   **Backend**: Supabase (PostgreSQL Database).
*   **Storage**: Supabase Storage (for MP3s and Cover Art).
*   **Hosting**: Ready for Vercel/Netlify.

## 🛠️ Setup & Installation

### 1. Clone the Repo
```bash
git clone https://github.com/parth-garg01/MyTuneVault.git
cd MyTuneVault/Code
```

### 2. Connect to Supabase
This project requires a `config.js` file (not included in the repo for security) to connect to your database.
1.  Create a project on [Supabase.com](https://supabase.com).
2.  Create a file named `Code/config.js`.
3.  Add your keys:
    ```javascript
    const supabaseUrl = "YOUR_SUPABASE_URL";
    const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
    window.supabaseUrl = supabaseUrl;
    window.supabaseKey = supabaseKey;
    ```

### 3. Run Locally
Simply open `Code/index.html` in your browser!

### 4. Uploading Songs
To add music without coding:
1.  Upload `.mp3` and `.jpg` files to your Supabase Storage bucket.
2.  Add a row to the `songs` table in your Supabase Database with the file URLs.

## 📂 Project Structure

```
MyTuneVault/
├── Code/
│   ├── assets/         # Local fallback assets
│   ├── index.html      # Main application structure
│   ├── style.css       # Glassmorphism styles & animations
│   ├── script.js       # Audio engine & Supabase logic
│   └── config.js       # API Keys (GitIgnored)
└── README.md
```

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
