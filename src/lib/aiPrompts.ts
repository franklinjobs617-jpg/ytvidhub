// AI 提示词优化，专注于结构化分析

export const SUMMARY_PROMPT = `
Please analyze this video content and provide a comprehensive, structured analysis in the following format:

# 🎯 Video Analysis: [Video Title]

## 📋 Executive Summary
[2-3 sentences summarizing the main topic and key message]

## 🔑 Key Insights
[3-5 main insights or takeaways, each as a bullet point]

## 💡 Core Concepts
[Important concepts or ideas explained, each as a bullet point]

## 🚀 Key Takeaways
[Practical next steps, applications, or actionable insights]

Please ensure:
- Use clear, engaging language
- Focus on practical value for learners
- Include specific examples when possible
- Keep content concise but comprehensive
- Highlight the most valuable insights
`;

export const formatPromptForVideo = (videoTitle: string, transcript?: string) => {
    return SUMMARY_PROMPT.replace('[Video Title]', videoTitle);
};