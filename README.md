# Garur2 - Accessible Learning Platform

Garur2 is a modern, accessible learning platform designed specifically for visually impaired and blind learners. The platform provides an intuitive interface with keyboard navigation, screen reader support, and high contrast modes.

## Features

### Core Features
- **Digital Library**: Access to thousands of NCERT books and study materials
- **Interactive Tests**: Take chapter-wise tests with immediate feedback
- **PDF Reader**: Built-in PDF reader with navigation controls
- **Notebook**: Create and organize study notes
- **Dashboard**: Track learning progress and achievements
- **Accessibility First**: Designed with accessibility as a core principle

### Accessibility Features
- **Keyboard Navigation**: Comprehensive keyboard shortcuts for all functions
- **Screen Reader Support**: ARIA labels and roles for optimal screen reader compatibility
- **High Contrast Mode**: Multiple theme options including dark mode
- **Text-to-Speech Support**: Built-in text-to-speech with adjustable settings
- **Font Size Control**: Adjustable font sizes for better readability
- **Spatial Audio**: Enhanced audio positioning for better content navigation

### User Experience
- **Responsive Design**: Works seamlessly across all devices
- **Intuitive Interface**: Clean and organized layout
- **Progress Tracking**: Monitor learning achievements
- **Personalized Settings**: Customize your learning experience
- **Offline Support**: Access content without internet connection

## Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **PDF Handling**: react-pdf
- **Icons**: Lucide React
- **API Integration**: Google Books API

### Backend
- **Server**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **API Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with JavaScript enabled
- MongoDB (for local development)
- AWS account (for production deployment)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/garur2.git
cd garur2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here
VITE_API_URL=http://localhost:5001
VITE_AWS_ACCESS_KEY=your_aws_access_key
VITE_AWS_SECRET_KEY=your_aws_secret_key
VITE_AWS_REGION=your_aws_region
VITE_AWS_BUCKET=your_s3_bucket_name
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5173`

## Keyboard Shortcuts

### Navigation
- **Alt + L**: Navigate to Library
- **Alt + T**: Navigate to Tests
- **Alt + N**: Navigate to Notebook
- **Alt + D**: Navigate to Dashboard
- **Tab**: Navigate through elements
- **Enter**: Activate buttons and links
- **Space**: Toggle buttons
- **Esc**: Close modals and popups

### Reading Controls
- **Ctrl + +**: Increase font size
- **Ctrl + -**: Decrease font size
- **Ctrl + 0**: Reset font size
- **Space**: Play/Pause audio
- **Arrow Keys**: Navigate content
- **Ctrl + F**: Search content

## Project Structure

```
garur2/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Settings/   # Settings related components
│   │   └── Common/     # Common UI elements
│   ├── pages/         # Page components
│   │   ├── Home/      # Home page
│   │   ├── Library/   # Library page
│   │   ├── Reader/    # PDF reader
│   │   └── ...        # Other pages
│   ├── context/       # React Context providers
│   ├── utils/         # Utility functions
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── styles/        # Global styles
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
└── package.json       # Project dependencies
```

## Documentation

The platform includes comprehensive documentation covering:
- User Guide
- API Documentation
- Accessibility Features
- Privacy Policy
- Terms of Service

Access documentation at `/documentation` route.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Books API for providing book data
- React PDF for PDF rendering capabilities
- Tailwind CSS for the styling framework
- Lucide for the beautiful icons
- MongoDB for database solutions
- AWS for cloud services

## Support

### Contact Information
- **Email**: support@garur2.com
- **Phone**: +1 (234) 567-890
- **Address**: 123 Education Street, Learning City, 12345
- **Support Hours**: 24/7

### Resources
- [Documentation](/documentation)
- [Privacy Policy](/privacy-policy)
- [GitHub Issues](https://github.com/yourusername/garur2/issues)
- [Community Forum](https://community.garur2.com)
