// Mock data for the terminal
export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

// Mock essays
export const essays: ContentItem[] = [
  {
    slug: 'ai-ethics',
    title: 'Ethics in AI Development',
    description: 'Exploring the ethical considerations in AI development',
    content: `Ethics in AI Development

AI systems are becoming increasingly powerful and integrated into our daily lives. This raises important ethical questions about how these systems should be designed, deployed, and regulated.

Key considerations include:
- Transparency and explainability
- Fairness and bias mitigation
- Privacy and data protection
- Accountability and responsibility

As we continue to develop more advanced AI systems, it's crucial that we prioritize these ethical considerations to ensure that AI benefits humanity as a whole.`
  },
  {
    slug: 'future-of-llms',
    title: 'The Future of Large Language Models',
    description: 'Predictions about where LLMs are headed',
    content: `The Future of Large Language Models

Large Language Models (LLMs) have rapidly evolved in recent years, from GPT-3 to GPT-4 and beyond. These models have demonstrated impressive capabilities in natural language understanding and generation.

Looking ahead, we can expect:
- More specialized models for specific domains
- Improved reasoning capabilities
- Better alignment with human values
- Integration with other AI systems

The future of LLMs is bright, but it will require careful development and deployment to ensure these powerful tools are used responsibly.`
  }
];

// Mock projects
export const projects: ContentItem[] = [
  {
    slug: 'ai-assistant',
    title: 'AI Personal Assistant',
    description: 'A personal assistant powered by AI',
    content: `AI Personal Assistant

This project aims to create a personal assistant that can help with daily tasks, provide information, and assist with productivity.

Features:
- Natural language interaction
- Task management and reminders
- Information retrieval
- Integration with other tools and services

The assistant is built using a combination of LLMs, custom knowledge bases, and API integrations to provide a seamless and helpful experience.`
  },
  {
    slug: 'data-viz',
    title: 'Data Visualization Tool',
    description: 'A tool for visualizing complex datasets',
    content: `Data Visualization Tool

This project provides an intuitive interface for visualizing complex datasets, making it easier to identify patterns and insights.

Features:
- Interactive visualizations
- Support for various data formats
- Customizable charts and graphs
- Export and sharing options

The tool is built using modern web technologies and visualization libraries, with a focus on performance and usability.`
  }
];

// Contact information
export const contactInfo = [
  { name: 'email', value: 'kelvin@sundli.ai' },
  { name: 'twitter', value: '@kelvinsundli' },
  { name: 'github', value: 'github.com/ksundli' }
]; 