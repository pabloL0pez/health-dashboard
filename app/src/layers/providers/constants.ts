interface SystemPrompts {
  preciseAndComplete: string;
  structuredJSONData: string;
  noComments: string;
}

interface PromptsDictionary {
  system: SystemPrompts;
}

export const promptsDictionary: PromptsDictionary = {
  system: {
    preciseAndComplete: 'Be precise and complete.',
    structuredJSONData: 'Only output structured JSON data with the requested fields.',
    noComments: 'Don\'t add any additional comments outside of the requested JSON data.',
  }
}