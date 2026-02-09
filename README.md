# YTVidHub

<div align="center">
  <img src="public/image/icon.webp" alt="YTVidHub Logo" width="120" height="120" />
  <h1>YTVidHub</h1>
  <p>Professional YouTube subtitle extraction and processing toolkit for AI training, research, and content creation</p>
  
  <div align="center" style="margin-top: 20px; margin-bottom: 20px;">
    <a href="https://github.com/ytvidhub/ytvidhub" target="_blank">
      <img src="https://img.shields.io/github/stars/ytvidhub/ytvidhub.svg?style=social&label=Star&maxAge=2592000" alt="GitHub stars" />
    </a>
    <a href="https://github.com/ytvidhub/ytvidhub/fork" target="_blank">
      <img src="https://img.shields.io/github/forks/ytvidhub/ytvidhub.svg?style=social&label=Fork&maxAge=2592000" alt="GitHub forks" />
    </a>
    <a href="https://github.com/ytvidhub/ytvidhub/issues" target="_blank">
      <img src="https://img.shields.io/github/issues/ytvidhub/ytvidhub.svg" alt="GitHub issues" />
    </a>
  </div>
</div>

## 🚀 Project Overview

YTVidHub is a comprehensive platform designed to simplify the process of extracting, cleaning, and processing YouTube subtitles for various use cases, including:

- **AI Training Data**: Clean, structured text data for fine-tuning LLMs
- **Content Creation**: Repurpose video content into blog posts, articles, and more
- **Research**: Academic and market research data collection and analysis
- **Language Learning**: Transcripts for language study and practice

## ✨ Key Features

- **Bulk Download**: Extract subtitles from entire playlists or multiple videos at once
- **Multiple Formats**: Support for SRT, VTT, TXT, and JSON formats
- **AI-Ready Data**: Clean transcripts with timestamps removed for training
- **No API Limits**: Bypass YouTube API restrictions with our proprietary method
- **Multi-Language Support**: Extract subtitles in over 100 languages
- **Interactive Tools**: Web-based interface for easy processing
- **Fast Processing**: Optimized for speed and efficiency

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js    | 14+     | Frontend framework |
| React      | 18+     | UI library |
| TypeScript | 5+      | Type safety |
| Tailwind CSS | 4+    | Styling |
| next-intl  | 3+      | Internationalization |
| Lucide React | 0.300+ | Icons |

## 📦 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ytvidhub/ytvidhub.git
   cd ytvidhub
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

4. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage Guide

### Basic Usage

1. **Single Video Subtitle Extraction**
   - Go to the main page
   - Paste the YouTube video URL
   - Select your preferred format (SRT, VTT, TXT, JSON)
   - Click "Download Subtitles"

2. **Bulk Playlist Processing**
   - Navigate to the Bulk Downloader page
   - Paste the YouTube playlist URL
   - Select output format and options
   - Click "Download All Subtitles"

3. **Data Preparation for AI**
   - Go to the Data Prep Guide
   - Follow the step-by-step instructions
   - Download clean, timestamp-free text data

## 📁 Project Structure

```
ytvidhub/
├── public/            # Static assets
│   └── image/         # Images and icons
├── src/               # Source code
│   ├── app/           # Next.js app directory
│   │   ├── [locale]/  # Internationalization
│   │   └── api/       # API routes
│   ├── components/    # React components
│   ├── context/       # React contexts
│   ├── i18n/          # Internationalization files
│   ├── lib/           # Utility functions
│   ├── messages/      # Translation messages
│   └── utils/         # Helper utilities
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## 🌍 Internationalization

YTVidHub supports multiple languages:

- **English** (default)
- **Spanish**

## 🤝 Contributing

We welcome contributions to YTVidHub! Here's how you can help:

1. **Report bugs** by opening an issue
2. **Suggest features** through GitHub discussions
3. **Submit pull requests** with bug fixes or improvements
4. **Improve documentation** for better user experience

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: [https://ytvidhub.com](https://ytvidhub.com)
- **GitHub Issues**: [https://github.com/ytvidhub/ytvidhub/issues](https://github.com/ytvidhub/ytvidhub/issues)

## 📣 Acknowledgments

- Thanks to all contributors who have helped make this project possible
- Built with ❤️ for the developer and researcher community
- Not affiliated with YouTube or Google

---

<div align="center">
  <p>Made with ❤️ by the YTVidHub Team</p>
  <p><a href="https://ytvidhub.com" target="_blank">Visit YTVidHub</a></p>
</div>
