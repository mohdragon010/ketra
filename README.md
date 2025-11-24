# 📚 Ketra - Smart Study Dashboard

<div align="center">

![Ketra Logo](https://img.shields.io/badge/Ketra-Study%20Dashboard-blueviolet?style=for-the-badge)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3-0081CB?style=for-the-badge&logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Your ultimate study companion for organizing subjects, managing tasks, and taking notes.**

[Live Demo](https://ketra.vercel.app) · [Report Bug](https://github.com/mohdragon010/ketra/issues) · [Request Feature](https://github.com/mohdragon010/ketra/issues)

</div>

---

## ✨ Features

### 📖 **Subject Management**
- Create and organize subjects with custom icons and colors
- Track progress with visual indicators
- Quick access to all your courses in one place

### ✅ **Task Management**
- Create tasks with priority levels (High, Medium, Low)
- Mark tasks as complete with satisfying animations
- Filter and sort tasks by priority and status
- Track completion rates and daily progress

### 📝 **Rich Note Taking**
- Powerful Tiptap editor with formatting options
- Text styling (bold, italic, underline, colors)
- Lists, headings, and text alignment
- Image support and link embedding
- Auto-save functionality

### 💡 **Daily Quotes**
- Motivational quotes to inspire your study sessions
- Multiple categories (Motivational, Wisdom, Success, Life, Love)
- Favorite quotes for quick access
- Share quotes on social media
- Text-to-speech functionality

### 🎨 **Beautiful UI/UX**
- Modern glassmorphism design
- Smooth animations with Framer Motion
- Dark/Light mode support
- Fully responsive across all devices
- Custom scrollbar and accessibility features

### 🚀 **Performance**
- Lightning-fast page loads
- Optimized images and assets
- Client-side data persistence
- SEO optimized with meta tags and sitemap

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **UI Library:** [React 19](https://reactjs.org/)
- **Component Library:** [Material-UI (MUI) 7.3](https://mui.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Rich Text Editor:** [Tiptap](https://tiptap.dev/)
- **Icons:** [Material Icons](https://mui.com/material-ui/material-icons/)
- **Date Handling:** [Moment.js](https://momentjs.com/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mohdragon010/ketra.git
cd ketra
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action!

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ketra/
├── app/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── ...
│   ├── contexts/          # React Context providers
│   │   ├── subjectContexts.js
│   │   └── notesContext.js
│   ├── utils/             # Utility functions
│   │   └── seo.js
│   ├── dashboard/         # Dashboard page
│   ├── subjects/          # Subjects management
│   ├── notes/             # Notes editor
│   ├── quotes/            # Quotes page
│   ├── about/             # About page
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── theme.js           # MUI theme configuration
│   └── globals.css        # Global styles
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # SEO robots file
│   └── sitemap.xml        # SEO sitemap
├── package.json
└── next.config.mjs
```

---

## 🎨 Features in Detail

### Dashboard
- Overview of all subjects and tasks
- Progress tracking with visual charts
- Recently completed tasks
- Priority breakdown
- Quick stats (completion rate, tasks today)

### Subjects
- Create subjects with custom icons (8 options)
- Choose from 16 vibrant colors
- Edit and delete subjects
- View task count per subject
- Search and filter subjects

### Notes
- Rich text editor with full formatting
- Create, edit, and delete notes
- Timestamp tracking
- Clean, distraction-free interface

### Quotes
- Random motivational quotes
- Category filtering
- Favorite quotes collection
- Share on Twitter
- Copy to clipboard
- Text-to-speech
- Download as image

---

## 🌐 Deployment

This app is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy with one click!

The app includes:
- ✅ SEO optimization (meta tags, sitemap, robots.txt)
- ✅ PWA support (manifest.json)
- ✅ Performance optimization
- ✅ Analytics integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mohamed Ayman**

- GitHub: [@mohdragon010](https://github.com/mohdragon010)
- Email: mohammed.ayman152433@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Material-UI](https://mui.com/) for the beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tiptap](https://tiptap.dev/) for the rich text editor
- All the open-source contributors who made this possible

---

<div align="center">

**Made with 💜 for students**

⭐ Star this repo if you find it helpful!

</div>
