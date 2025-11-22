import { GoogleGenAI } from "@google/genai";
import { Preferences, PlanResult, SearchSource, RouteStyle } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHikingPlan = async (preferences: Preferences): Promise<PlanResult> => {
  const modelId = "gemini-2.5-flash";
  const isChinese = preferences.language === 'zh';
  const isHiddenGem = preferences.routeStyle === RouteStyle.HIDDEN_GEM;

  const prompt = `
    Act as an expert outdoor adventure guide for families in Ningbo, China.
    I need a detailed weekend hiking plan suitable for winter (current season).
    
    LANGUAGE REQUIREMENT: Output the entire response in ${isChinese ? 'Simplified Chinese (简体中文)' : 'English'}.

    User Constraints:
    - Children Age: ${preferences.childAge} years old.
    - Preferred Difficulty: ${preferences.difficulty}.
    - Desired Hike Duration: Approx ${preferences.durationHours} hours.
    - Route Style: ${isHiddenGem ? "HIDDEN GEM / SECLUDED / NON-TOURISTY (Find a local favorite that is not crowded)" : "Classic Popular Route"}.

    Please perform a Google Search to find REAL, specific trails near Ningbo. 
    
    Structure your response strictly in Markdown as follows:

    # 🏔️ ${isChinese ? '推荐路线' : 'Recommended Route'}: [Name of Specific Trail/Area]
    
    **${isChinese ? '地点' : 'Location'}:** [District/Area, distance from downtown Ningbo]
    **${isChinese ? '冬季亮点' : 'Why it\'s good for winter'}:** [Specifics about scenery, wind shelter, or sun exposure]
    **${isChinese ? '难度' : 'Difficulty'}:** [Rating]
    
    ## 🗺️ ${isChinese ? '路线详情' : 'Route Details'}
    *   **${isChinese ? '起点' : 'Start Point'}:** [Location]
    *   **${isChinese ? '终点' : 'End Point'}:** [Location]
    *   **${isChinese ? '途经景点' : 'Key Sights'}:** [List specific spots like temples, bamboo forests, reservoirs]
    *   **${isChinese ? '路况' : 'Trail Conditions'}:** [Paved/Dirt/Steps]

    ## 📅 ${isChinese ? '周末行程安排' : 'Weekend Itinerary'}
    ### ${isChinese ? '周六' : 'Saturday'}
    *   **${isChinese ? '上午' : 'Morning'}:** [Activity]
    *   **${isChinese ? '午餐' : 'Lunch'}:** [Specific recommendation if possible, or picnic advice]
    *   **${isChinese ? '下午' : 'Afternoon'}:** [Activity]
    
    ### ${isChinese ? '周日' : 'Sunday'}
    *   **${isChinese ? '上午' : 'Morning'}:** [Activity]
    *   **${isChinese ? '午餐' : 'Lunch'}:** [Local food recommendation]
    *   **${isChinese ? '返程' : 'Departure'}:** [Advice]

    ## ❄️ ${isChinese ? '宁波冬季亲子贴士' : 'Winter Parenting Tips (Specific to Ningbo Climate)'}
    *   [Tip 1]
    *   [Tip 2]
    *   [Tip 3]

    ## 🎒 ${isChinese ? '装备建议' : 'Packing Advice'}
    *   [Item 1]
    *   [Item 2]
    *   [Item 3]
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Grounding
      },
    });

    const markdownContent = response.text || (isChinese ? "抱歉，暂时无法生成计划。" : "Sorry, I couldn't generate a plan at this time.");
    
    // Extract sources from grounding metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: SearchSource[] = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return { markdownContent, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(isChinese ? "生成计划失败，请重试。" : "Failed to generate hiking plan. Please try again.");
  }
};