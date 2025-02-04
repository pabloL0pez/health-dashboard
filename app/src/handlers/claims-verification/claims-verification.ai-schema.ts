export const claimsVerificationAISchema = {
  "name": "VerifiedClaimsResponse",
  "schema": {
    "type": "object",
    "properties": {
      "type": "object",
      "properties": {
        "score": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number",
              "description": "The calculated trust score for the claim.",
            },
            "description": {
              "type": "string",
              "description": "The justification for the calculated trust score."
            },
          },
          "required": [
            "value"
          ],
          "additionalProperties": false
        },
        "status": {
          "type": "object",
          "properties": {
            "value": {
              "type": "string",
              "description": "The assigned status based on the trust score for the claim.",
              "enum": [
                "confirmed",
                "questionable",
                "debunked",
                "unverifiable"
              ],
            },
            "description": {
              "type": "string",
              "description": "The justification for the assigned status."
            },
          },
          "required": [
            "value"
          ],
          "additionalProperties": false
        },
        "sources": {
          "type": "array",
          "description": "List of backed sources for the claim.",
          "items": {
            "type": "object",
            "properties": {
              "source": {
                "type": "string",
                "description": "The backed source of the claim.",
              },
              "url": {
                "type": "string",
                "description": "The URL for the claim's backed source.",
              },
            },
            "required": [
              "source",
            ],
            "additionalProperties": false
          },
        },
      },
      "required": [
        "score",
        "status",
        "sources",
      ],
      "additionalProperties": false
    },
    "required": [
      "verification"
    ],
    "additionalProperties": false
  },
  "strict": true
};