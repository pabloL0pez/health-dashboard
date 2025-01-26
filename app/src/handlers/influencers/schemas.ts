export const InfluencersResponseSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "influencers": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "rank": {
              "type": "integer"
            },
            "name": {
              "type": "string"
            },
            "instagramUser": {
              "type": "string"
            },
            "twitterUser": {
              "type": "string"
            }
          },
          "required": [
            "rank",
            "name",
          ]
        }
      ]
    }
  },
  "required": [
    "influencers"
  ]
}