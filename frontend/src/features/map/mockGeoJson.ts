export const MOCK_DISTRICTS_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Bangalore Urban" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.4, 12.8],
            [77.7, 12.8],
            [77.7, 13.1],
            [77.4, 13.1],
            [77.4, 12.8]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Mysore" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [76.5, 12.1],
            [76.8, 12.1],
            [76.8, 12.4],
            [76.5, 12.4],
            [76.5, 12.1]
          ]
        ]
      }
    }
  ]
} as any
