export const influencersAISchema = {
  "name": "influencer_array",
  "schema": {
    "type": "object",
    "properties": {
      "influencers": {
        "type": "array",
        "description": "An array of influencer objects.",
        "items": {
          "type": "object",
          "properties": {
            "rank": {
              "type": "number",
              "description": "The rank of the influencer."
            },
            "name": {
              "type": "string",
              "description": "The name of the influencer."
            },
            "instagramUser": {
              "type": "string",
              "description": "Instagram username of the influencer."
            },
            "twitterUser": {
              "type": "string",
              "description": "Twitter username of the influencer."
            },
            "image": {
              "type": "string",
              "description": "Base64 encoded picture of the influencer."
            }
          },
          "required": [
            "rank",
            "name",
            "instagramUser",
            "twitterUser",
            "image"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "influencers"
    ],
    "additionalProperties": false
  },
  "strict": true
}