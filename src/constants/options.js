export const SELECT_TRAVELES_LIST = [
  {
    id: 1,
    title: "Solo",
    description: "A sole traveles in exploration",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    description: "Two traveles in tandem",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    description: "A group of fun loving adventure",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    description: "A bunch of thrill-seekes",
    people: "5 to 10 People",
  },
];

export const SELECT_BUDGET_OPTIONS = [
  { id: 1, title: "Cheap", description: "Stay conscious of costs" },
  { id: 2, title: "Moderate", description: "Keep cost on the average side" },
  { id: 3, title: "Luxury", description: "Dont worry about cost" },
];

export const AI_PROMPT = `Please provide the information in JSON format. 
  Here is the request: Generate Travel Paln for Location {location} for {days} Days for {traveles} with a {budget} budget, give me Hotels recommendations list with Hotel name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, Place details, Place Image Url, Geo Coordinates, ticket Pricing, Time Travel each of the location for {days} with each day plan with best time to visit. Please include:
* Daily activities with descriptions.
* Suggested restaurants or food experiences.
* Recommended accommodations with approximate price ranges.
* Estimated travel time between locations.
* Approximate cost for each activity.
Please refer to this JSON format: {
    "travelPlan": {
        "notes": "[notes]",
        "duration": "3 Days",
        "travelers": 2,
        "budget": "Moderate",
        "hotels": [
            {
                "description": "[hotel description]",
                "rating": 4.5,
                "name": "[hotel name]",
                "price": "[price range]",
                "imageUrl": "[hotel image]",
                "geoCoordinates": {
                    "longitude": 74.8337,
                    "latitude": 34.0837
                },
                "address": "[road], [town], [state] [pincode], [country]"
            },
        ],
        "itinerary": {
            "day1": {
                "activities": [
                    {
                        "activityDescription": "[activity description]",
                        "placeName": "[place name]",
                        "placeImageUrl": "[place image url]",
                        "ticketPricing": "[ticket price]",
                        "placeDetails": "[place detail]",
                        "geoCoordinates": {
                            "latitude": 34.0167,
                            "longitude": 75.3167
                        },
                        "timeTravel": "[time travel]"
                    },
                ],
                "estimatedCost": "[cost estimation]",
                "foodExperiences": [
                    food experience
                ],
                "title": "[title]",
                "travelTimeBetweenLocations": "[time taken to travel between locations",
                "bestTimeToVisit": "[best time to visit]"
            }, 
        },
        "location": "Jammu and Kashmir, India"
    }
}
`;
