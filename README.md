# The Skin Lab Website

A luxury medical spa website built with Next.js 14, featuring AI-powered skin analysis.

## Features

- Modern, responsive design with Tailwind CSS
- AI-powered skin analysis using OpenAI o3 model
- Camera capture functionality for real-time photos
- Service pages for Facials, Laser, Injectables, and Body Contouring
- Mobile app showcase
- Testimonials and results sections

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dfeirstein/the-skin-lab.git
cd the-skin-lab-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Environment Variables

The following environment variables need to be set:

- `OPENAI_API_KEY` - Your OpenAI API key for the AI skin analysis feature

### Setting up on Vercel

1. Deploy to Vercel
2. In your Vercel project settings, go to Environment Variables
3. Add `OPENAI_API_KEY` with your OpenAI API key

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API (o3 model)
- Framer Motion for animations

## License

All rights reserved.