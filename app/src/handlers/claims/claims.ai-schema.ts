export const claimsAISchema = {
  "name": "ClaimsResponse",
  "schema": {
    "type": "object",
    "properties": {
      "claims": {
        "type": "array",
        "description": "List of claims.",
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
                "url",
              ],
              "additionalProperties": false
            },
          },
          "required": [
            "quote",
            "title",
            "category",
            "source"
          ],
          "additionalProperties": false
        },
      },
    },
    "required": [
      "claims"
    ],
    "additionalProperties": false
  },
  "strict": true
}