export const claimsAISchema = {
  "name": "ClaimsResponse",
  "schema": {
    "type": "object",
    "properties": {
      "claimsByInfluencer": {
        "type": "array",
        "description": "Array of claims organized by influencer.",
        "items": {
          "type": "object",
          "properties": {
            "influencerName": {
              "type": "string",
              "description": "Name of the influencer."
            },
            "claims": {
              "type": "array",
              "description": "List of claims associated with the influencer.",
              "items": {
                "type": "object",
                "properties": {
                  "quote": {
                    "type": "string",
                    "description": "The quote associated with the claim."
                  },
                  "title": {
                    "type": "string",
                    "description": "The title of the claim."
                  },
                  "category": {
                    "type": "string",
                    "description": "Category of the claim."
                  },
                  "source": {
                    "type": "object",
                    "properties": {
                      "source": {
                        "type": "string",
                        "description": "The source of the claim.",
                      },
                      "url": {
                        "type": "string",
                        "description": "The URL for the claim's source.",
                      },
                    },
                    "required": [
                      "source",
                    ],
                    "additionalProperties": false
                  },
                },
                "required": [
                  "quote",
                  "title",
                  "category",
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "influencerName",
            "claims"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "claimsByInfluencer"
    ],
    "additionalProperties": false
  },
  "strict": true
}