import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles, ImageIcon, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptData {
  title: string;
  description: string;
  aspectRatio: string;
}

const Index = () => {
  const [adType, setAdType] = useState("");
  const [industry, setIndustry] = useState("");
  const [productName, setProductName] = useState("Nano Banana");
  const [toneStyle, setToneStyle] = useState("");
  const [customPrompt, setCustomPrompt] = useState(""); // New state for input text prompt
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const { toast } = useToast();

  const adTypes: Record<string, PromptData> = {
    "image-ad": {
      title: "Image Ad",
      description: "Perfect for social media feeds and square ad placements",
      aspectRatio: "1:1"
    },
    "banner-ad": {
      title: "Banner Ad",
      description: "Wide format banners for website headers and display advertising",
      aspectRatio: "16:1"
    },
    "product-image": {
      title: "Product Image",
      description: "Showcase product features with compelling marketing visuals",
      aspectRatio: "1:1"
    },
    "social-square": {
      title: "Social Media Square",
      description: "Optimized for Instagram, Facebook, and LinkedIn posts",
      aspectRatio: "1:1"
    },
    "social-story": {
      title: "Social Media Story",
      description: "Vertical format perfect for Instagram and Facebook Stories",
      aspectRatio: "9:16"
    }
  };

  const industries: Record<string, string> = {
    "digital-agencies": "Full Service Digital Agencies",
    "social-media": "Social Media Marketing Agencies",
    "seo-sem": "SEO/SEM Specialists",
    "content-marketing": "Content Marketing Agencies"
  };

  const toneStyles: Record<string, string> = {
    "minimalist": "Minimalist",
    "vibrant": "Vibrant",
    "professional": "Professional",
    "playful": "Playful"
  };

  const generatePrompt = (): string => {
    if (!adType || !industry || !toneStyle) return "";

    const adTypeData = adTypes[adType];
    const industryName = industries[industry];

    const industryDescriptions: Record<string, string> = {
      "digital-agencies": "Modern clean layout with professional branding, fresh banana theme elements, and subtle futuristic digital agency vibes. High-quality, optimized for social feed engagement.",
      "social-media": "Bright colors, banana-inspired elements, engaging text placement, perfect for marketing campaigns and social virality.",
      "seo-sem": "Include simple graphics, SEO-focused visual cues, and clear product branding with attention to conversion optimization.",
      "content-marketing": "Storytelling elements with compelling narrative visuals, optimized for audience engagement and shareability."
    };

    const toneDescriptions: Record<string, string> = {
      "minimalist": "Clean, uncluttered design with plenty of white space and simple geometric shapes.",
      "vibrant": "Bold, eye-catching colors with dynamic energy and high contrast elements.",
      "professional": "Sophisticated business aesthetic with refined typography and polished visuals.",
      "playful": "Fun, creative approach with whimsical elements and approachable design."
    };

    const formatDescriptions: Record<string, string> = {
      "image-ad": "Create a bold and eye-catching 1:1 square image ad",
      "banner-ad": "Design a wide 16:1 banner ad showcasing creativity and innovation",
      "product-image": "Generate a crisp 1:1 product image featuring",
      "social-square": "Create a visually engaging 1:1 social media square ad",
      "social-story": "Design a full-screen 9:16 vertical story ad"
    };

    return `${productName} ${adTypeData.title} (${adTypeData.aspectRatio}) for ${industryName}:\n\n"${formatDescriptions[adType]} for ${productName}. ${toneDescriptions[toneStyle]} ${industryDescriptions[industry]}"`;
  };

  const handleCopy = async () => {
    const prompt = generatePrompt();
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Your prompt is ready to use.",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateImage = async () => {
    // Use customPrompt if provided, else fallback to generated prompt
    const prompt = customPrompt.trim() || generatePrompt();
    if (!prompt) return;

    setLoadingImage(true);
    setImageUrl(null);

    try {
      // Use the full prompt directly, no splitting
      const cleanPrompt = prompt.replace(/"/g, '');
      const newImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;

      const img = new Image();
      img.onload = () => {
        setImageUrl(newImageUrl);
        setLoadingImage(false);
        toast({
          title: "Image generated!",
          description: "Your AI image is ready.",
        });
      };
      img.onerror = () => {
        setLoadingImage(false);
        toast({
          title: "Generation failed",
          description: "Please try again.",
          variant: "destructive",
        });
      };
      img.src = newImageUrl;
    } catch (error) {
      setLoadingImage(false);
      toast({
        title: "Error generating image",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };
  
//   //Download function
//   const handleDownload = () => {
//   if (!imageUrl) return;

//   // 1. Trigger file download
//   const link = document.createElement("a");
//   link.href = imageUrl;
//   link.setAttribute(
//     "download",
//     `${productName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.png`
//   );
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);

//   // 2. Open the image in a new tab
//   window.open(imageUrl, "_blank");

//   toast({
//     title: "Download started!",
//     description: "Your image is being downloaded and opened in a new tab.",
//   });
// };
const [downloading, setDownloading] = useState(false);

const handleDownload = async () => {
  if (!imageUrl) return;
  setDownloading(true);

  const filename = `${productName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;

  try {
    // If it's already a data: or blob: url, just use it directly
    if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({ title: 'Downloaded!', description: 'Saved from data/blob URL.' });
      setDownloading(false);
      return;
    }

    // Try to fetch the image (CORS must allow this)
    const res = await fetch(imageUrl, { mode: 'cors' });
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    // Create anchor pointing to blob and force download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke blob URL to free memory
    URL.revokeObjectURL(blobUrl);

    // Also open the original image in a new tab for preview
    window.open(imageUrl, '_blank');

    toast({ title: 'Download ready!', description: 'Saved to your device and opened in a new tab.' });

  } catch (err) {
    console.error('Download failed:', err);

    // Fallback: open the image in a new tab and instruct user to Save As...
    window.open(imageUrl, '_blank');

    toast({
      title: 'Couldn’t auto-download',
      description: 'Opened image in a new tab. Right-click → "Save as…" to save it.',
      variant: 'destructive',
    });
  } finally {
    setDownloading(false);
  }
};



  const isFormComplete = adType && industry && productName && toneStyle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI Content Generator
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              🍌 Nano Banana
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-foreground">
              Content Prompt Generator
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Generate professional AI prompts for your marketing content in seconds
            </p>
          </div>

          <Card className="mb-6 shadow-[var(--shadow-soft)] border-2 hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]">
            <CardHeader>
              <CardTitle className="text-2xl">Generate Your Prompt</CardTitle>
              <CardDescription>Fill in the details to create a customized AI content prompt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ad-type">Ad Type</Label>
                <Select value={adType} onValueChange={setAdType}>
                  <SelectTrigger id="ad-type" className="h-12 text-base shadow-sm hover:border-primary transition-[var(--transition-smooth)]">
                    <SelectValue placeholder="Select ad format..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(adTypes).map(([key, data]) => (
                      <SelectItem key={key} value={key} className="cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{data.title}</span>
                          <span className="text-xs text-muted-foreground ml-4">{data.aspectRatio}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Target Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry" className="h-12 text-base shadow-sm hover:border-primary transition-[var(--transition-smooth)]">
                    <SelectValue placeholder="Select target industry..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(industries).map(([key, name]) => (
                      <SelectItem key={key} value={key} className="cursor-pointer">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-name">Product/Brand Name</Label>
                <Input
                  id="product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Nano Banana"
                  className="h-12 text-base shadow-sm hover:border-primary transition-[var(--transition-smooth)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone-style">Tone/Style</Label>
                <Select value={toneStyle} onValueChange={setToneStyle}>
                  <SelectTrigger id="tone-style" className="h-12 text-base shadow-sm hover:border-primary transition-[var(--transition-smooth)]">
                    <SelectValue placeholder="Select tone and style..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(toneStyles).map(([key, name]) => (
                      <SelectItem key={key} value={key} className="cursor-pointer">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {isFormComplete && (
            <>
              {}

              <Card className="shadow-md border-2 border-dashed border-primary/30 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    
                    <ImageIcon className="w-10 h-10" />
                    AI Image Generator
                  </CardTitle>
                  <CardDescription>
                    Generate an AI image based on your customized prompt
                  </CardDescription>
                </CardHeader>
          <CardContent className="space-y-4">
            {/* New input text field for custom prompt */}
            <Input
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGenerateImage();
                }
              }}
              placeholder="Type your custom prompt here and press Enter to generate image"
              className="w-full h-15 text-base shadow-sm hover:border-primary transition-[var(--transition-smooth)] mb-4"
            />

            {!imageUrl && !loadingImage && (
              <Button
                onClick={handleGenerateImage}
                className="w-full h-12 text-base font-semibold"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Generate Image
              </Button>
            )}

            {loadingImage && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your AI image...</p>
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4 animate-in fade-in-50 zoom-in-95 duration-500">
                <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg">
                  <img
                    src={imageUrl}
                    alt="AI Generated"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerateImage}
                    className="flex-1"
                    variant="secondary"
                  >
                    Regenerate
                  </Button>
                  <Button onClick={handleDownload} disabled={!imageUrl || downloading}>
  {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
  {downloading ? 'Downloading...' : 'Download'}
</Button>

                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </>
    )}

          {!isFormComplete && (
            <div className="text-center py-16 animate-in fade-in-50 duration-500">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-muted-foreground text-lg">
                Fill in all fields above to generate your customized AI prompt
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;