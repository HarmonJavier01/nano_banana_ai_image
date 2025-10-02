import React, { useState } from "react";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(null);
    try {
      // Mock API call - replace with your real API endpoint
      setTimeout(() => {
        setImageUrl("https://placehold.co/400x300?text=Generated+Image");
        setLoading(false);
      }, 1500);
    } catch (error) {
      alert("Failed to generate image.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold">AI Image Generator</h2>
      <textarea
        className="w-full border rounded p-2"
        rows={3}
        placeholder="Paste your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !prompt}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Generated" className="w-full rounded mt-4" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;