# 🍌 Nano Banana - AI Content Prompt Generator

A professional AI-powered prompt generator and image creator for marketing content. Generate customized prompts for various ad formats and instantly create AI images based on your specifications.

## ✨ Features

- **Dynamic Prompt Generation** - Create tailored AI prompts based on your specifications
- **Multiple Ad Formats** - Support for various ad types and aspect ratios
- **Industry-Specific Templates** - Pre-configured prompts for different marketing industries
- **Editable Prompts** - Customize generated prompts before creating images
- **AI Image Generation** - Instant image creation using Pollinations.ai
- **One-Click Copy** - Easy clipboard integration for prompt copying
- **Image Download** - Save generated images directly to your device
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🎨 Supported Ad Types

| Ad Type             | Aspect Ratio | Best For                                 |
| ------------------- | ------------ | ---------------------------------------- |
| Image Ad            | 1:1          | Social media feeds and square placements |
| Banner Ad           | 16:1         | Website headers and display advertising  |
| Product Image       | 1:1          | Product showcases and features           |
| Social Media Square | 1:1          | Instagram, Facebook, LinkedIn posts      |
| Social Media Story  | 9:16         | Instagram and Facebook Stories           |

## 🏢 Target Industries

- **Full Service Digital Agencies** - Modern, professional branding with digital vibes
- **Social Media Marketing Agencies** - Bright, engaging, viral-ready content
- **SEO/SEM Specialists** - Conversion-optimized with clear branding
- **Content Marketing Agencies** - Storytelling-focused, shareable visuals

## 🎭 Tone & Style Options

- **Minimalist** - Clean, uncluttered designs with white space
- **Vibrant** - Bold, eye-catching colors with dynamic energy
- **Professional** - Sophisticated business aesthetic
- **Playful** - Fun, creative approach with whimsical elements

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/HarmonJavier01/nano_banana_ai_image.git

# Navigate to project directory
cd nano-banana-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📝 How to Use

1. **Select Ad Type** - Choose your desired ad format and aspect ratio
2. **Choose Target Industry** - Select the industry you're targeting
3. **Enter Product/Brand Name** - Input your product or brand name (default: "Nano Banana")
4. **Select Tone/Style** - Pick the visual style that matches your brand
5. **Review & Edit Prompt** - The generated prompt appears in an editable textarea
6. **Generate Image** - Click "Generate Image" to create your AI visual
7. **Download or Regenerate** - Save the image or create a new variation

## 🛠️ Tech Stack

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Pollinations.ai** - AI image generation API

## 📦 Project Structure

```
nano-banana-generator/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── pages/
│   │   └── Index.tsx     # Main application component
│   └── App.tsx
├── public/
├── package.json
└── README.md
```

## 🎯 Key Components

### Prompt Generator

Combines user inputs to create professional AI image prompts with industry-specific descriptions and tone adjustments.

### AI Image Generator

Integrates with Pollinations.ai to generate images based on custom prompts with real-time loading states and error handling.

### Editable Prompt Field

Users can modify generated prompts before image creation, allowing for fine-tuned control over the output.

## 🌐 API Integration

This project uses the [Pollinations.ai](https://pollinations.ai/) API for image generation:

```javascript
const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
  prompt
)}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;
```

**Note:** No API key required for Pollinations.ai

## 🎨 Customization

### Adding New Ad Types

Edit the `adTypes` object in `Index.tsx`:

```typescript
const adTypes: Record<string, PromptData> = {
  "your-ad-type": {
    title: "Your Ad Type",
    description: "Description of your ad type",
    aspectRatio: "16:9",
  },
};
```

### Adding New Industries

Update the `industries` object:

```typescript
const industries: Record<string, string> = {
  "your-industry": "Your Industry Name",
};
```

### Modifying Tone Styles

Customize the `toneStyles` object:

```typescript
const toneStyles: Record<string, string> = {
  "your-style": "Your Style Name",
};
```

## 🐛 Known Issues

- Image generation may take 5-10 seconds depending on server load
- Some prompts may produce unexpected results (regenerate for variations)
- Downloaded images are in PNG format

## 🔮 Future Enhancements

- [ ] Multiple image size options
- [ ] Batch image generation
- [ ] Prompt history and favorites
- [ ] Advanced editing tools
- [ ] Export to various formats
- [ ] Integration with additional AI image providers
- [ ] Collaborative workspace features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Your Name - _Initial work_

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful component library
- [Pollinations.ai](https://pollinations.ai/) - For free AI image generation API
- [Lucide](https://lucide.dev/) - For the icon set
- [Tailwind CSS](https://tailwindcss.com/) - For the styling framework

## 📧 Contact

Project Link: [https://github.com/HarmonJavier01/nano_banana_ai_image.git](https://github.com/HarmonJavier01/nano_banana_ai_image.git)

---

Made with Content Creation 💛 and 🍌 by the Nano Banana Team
