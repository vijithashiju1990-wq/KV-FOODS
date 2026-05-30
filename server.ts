import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint for AI Recipe generation
  app.post("/api/recipe", async (req: any, res: any) => {
    try {
      const { selectedIngredients, goal } = req.body;
      if (!selectedIngredients || !Array.isArray(selectedIngredients) || selectedIngredients.length === 0) {
        return res.status(400).json({ error: "Please select at least one ingredient." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is required on the server. Please check your secrets panel." });
      }

      // Initialize GoogleGenAI SDK as outline in the gemini-api skill rules
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const ingredientsStr = selectedIngredients.join(", ");
      const prompt = `Develop a gourmet, healthy wellness recipe (such as a fresh organic smoothie, raw energetic bowl, high-nutrition infant puree or baby porridge, wellness wellness-shot, or power trail mix) focusing on these core ingredients: ${ingredientsStr}. The recipe must align with the target goal: "${goal}". Incorporate premium references to KV Foods (based in Kasaragod and Nileshwar) who are famous for soil-rich local crops (deep beetroot root) and pristine fine health powders (including green banana, carrot, jackfruit, sprouted ragi baby food). Make the tone inviting, chef-grade, and health-focused. Let the spotlight section highlight the incredible bio-nutrition of these ingredients.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the Executive Gourmet Chef & Nutrition Director for KV Foods - representing the beautiful agricultural hub of Karuvachery, Nileshwar. You craft visually stunning, highly nutritional recipes using premium nuts, dried fruits, beets, and organic farm-fresh powders (green banana powder, jackfruit powder, beetroot powder, carrot powder, sprouted ragi infant mixes). You write elegant culinary copy. Always return your response as a direct JSON object conforming to the target schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipeName: {
                type: Type.STRING,
                description: "Name of the gourmet recipe"
              },
              prepTime: {
                type: Type.STRING,
                description: "Prep + serving time (e.g., 5 mins, 12 mins)"
              },
              servings: {
                type: Type.STRING,
                description: "Number of servings (e.g., 1 serving, 2 portions)"
              },
              description: {
                type: Type.STRING,
                description: "Enticing 2-3 sentence overview of this masterpiece, highlighting flavor notes"
              },
              kvSpotlight: {
                type: Type.STRING,
                description: "Fanciful spotlight explaining how KV Foods' farm vegetables (sweet carrots, deep beets) or exquisite nuts elevate the dish."
              },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exact list of ingredients including metrics"
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Step-by-step prep instructions"
              },
              benefits: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 to 4 wellness benefits of eating this (e.g. skin glow, fiber, energy)"
              }
            },
            required: ["recipeName", "prepTime", "servings", "description", "kvSpotlight", "ingredients", "steps", "benefits"]
          }
        }
      });

      const textOutput = response.text;
      if (!textOutput) {
        throw new Error("No response returned from the Gemini AI model.");
      }

      res.json(JSON.parse(textOutput.trim()));

    } catch (error: any) {
      console.error("AI Recipe generating failure: ", error);
      res.status(500).json({ error: error.message || "Something went wrong creating your gourmet recipe." });
    }
  });

  // Serve static files in production or delegate to Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
