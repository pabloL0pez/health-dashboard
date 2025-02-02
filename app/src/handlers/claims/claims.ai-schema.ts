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
                  "score": {
                    "type": "number",
                    "description": "Score assigned to the claim."
                  },
                  "status": {
                    "type": "string",
                    "description": "Status of the claim.",
                    "enum": [
                      "Pending",
                      "Verified",
                      "Rejected"
                    ]
                  }
                },
                "required": [
                  "quote",
                  "title",
                  "category",
                  "score",
                  "status"
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