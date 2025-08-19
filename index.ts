import { Client, Databases, Permission, Role } from "node-appwrite";

interface Context {
    req: any;
    res: any;
    log: (message: string) => void;
    error: (message: string) => void;
}

interface StopPlace {
    id: string;
    name: string;
    estimatedCalls: EstimatedCall[];
    [key: string]: any;
}

interface EstimatedCall {
    realtime: boolean;
    aimedArrivalTime: string;
    aimedDepartureTime: string;
    expectedArrivalTime: string;
    expectedDepartureTime: string;
    [key: string]: any;
}
/*
Request:
Base URL: https://api.entur.io/journey-planner/v3/graphql
# Avgangstavle - Stavanger stadion

{
  stopPlace(id: "NSR:StopPlace:59605") {
    id
    name
    estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {     
      realtime
      aimedArrivalTime
      aimedDepartureTime
      expectedArrivalTime
      expectedDepartureTime
      actualArrivalTime
      actualDepartureTime
      date
      forBoarding
      forAlighting
      destinationDisplay {
        frontText
      }
      quay {
        id
      }
      serviceJourney {
        journeyPattern {
          line {
            id
            name
            transportMode
          }
        }
      }
    }
  }
}

Response:
{
  "data": {
    "stopPlace": {
      "id": "NSR:StopPlace:59605",
      "name": "Nydalen",
      "estimatedCalls": [
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T13:53:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:53:00+02:00",
          "expectedArrivalTime": "2025-08-19T13:54:07+02:00",
          "expectedDepartureTime": "2025-08-19T13:54:07+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Maridalen"
          },
          "quay": {
            "id": "NSR:Quay:11162"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:51",
                "name": "Maridalen - Nydalen",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T13:46:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:46:00+02:00",
          "expectedArrivalTime": "2025-08-19T13:54:53+02:00",
          "expectedDepartureTime": "2025-08-19T13:54:53+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Nydalen"
          },
          "quay": {
            "id": "NSR:Quay:11161"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:58",
                "name": "Nydalen - Tveita (- Bøler) via Bjerke",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T13:56:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:56:00+02:00",
          "expectedArrivalTime": "2025-08-19T13:56:00+02:00",
          "expectedDepartureTime": "2025-08-19T13:56:00+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": false,
          "destinationDisplay": {
            "frontText": "Helsfyr"
          },
          "quay": {
            "id": "NSR:Quay:11158"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:37",
                "name": "Nydalen T - Helsfyr",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": false,
          "aimedArrivalTime": "2025-08-19T13:57:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:57:00+02:00",
          "expectedArrivalTime": "2025-08-19T13:57:00+02:00",
          "expectedDepartureTime": "2025-08-19T13:57:00+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Tveita"
          },
          "quay": {
            "id": "NSR:Quay:11162"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:58",
                "name": "Nydalen - Tveita (- Bøler) via Bjerke",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T13:56:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:56:00+02:00",
          "expectedArrivalTime": "2025-08-19T13:57:38+02:00",
          "expectedDepartureTime": "2025-08-19T13:57:38+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Nydalen"
          },
          "quay": {
            "id": "NSR:Quay:11161"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:58",
                "name": "Nydalen - Tveita (- Bøler) via Bjerke",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T13:57:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:57:00+02:00",
          "expectedArrivalTime": "2025-08-19T13:58:22+02:00",
          "expectedDepartureTime": "2025-08-19T13:58:22+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Bergkrystallen via Blindern"
          },
          "quay": {
            "id": "NSR:Quay:11151"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:4",
                "name": "Vestli - Bergkrystallen",
                "transportMode": "metro"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T14:00:00+02:00",
          "aimedDepartureTime": "2025-08-19T14:00:00+02:00",
          "expectedArrivalTime": "2025-08-19T14:00:00+02:00",
          "expectedDepartureTime": "2025-08-19T14:00:00+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Bygdøy via Bygdøynes"
          },
          "quay": {
            "id": "NSR:Quay:11162"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:30",
                "name": "Bygdøy - Nydalen",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T13:59:00+02:00",
          "aimedDepartureTime": "2025-08-19T13:59:00+02:00",
          "expectedArrivalTime": "2025-08-19T14:00:18+02:00",
          "expectedDepartureTime": "2025-08-19T14:00:18+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Vestli"
          },
          "quay": {
            "id": "NSR:Quay:11153"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:4",
                "name": "Vestli - Bergkrystallen",
                "transportMode": "metro"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T14:01:00+02:00",
          "aimedDepartureTime": "2025-08-19T14:01:00+02:00",
          "expectedArrivalTime": "2025-08-19T14:01:00+02:00",
          "expectedDepartureTime": "2025-08-19T14:01:00+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": false,
          "destinationDisplay": {
            "frontText": "Helsfyr"
          },
          "quay": {
            "id": "NSR:Quay:11158"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:37",
                "name": "Nydalen T - Helsfyr",
                "transportMode": "bus"
              }
            }
          }
        },
        {
          "realtime": true,
          "aimedArrivalTime": "2025-08-19T14:03:00+02:00",
          "aimedDepartureTime": "2025-08-19T14:03:00+02:00",
          "expectedArrivalTime": "2025-08-19T14:03:00+02:00",
          "expectedDepartureTime": "2025-08-19T14:03:00+02:00",
          "actualArrivalTime": null,
          "actualDepartureTime": null,
          "date": "2025-08-19",
          "forBoarding": true,
          "forAlighting": true,
          "destinationDisplay": {
            "frontText": "Vestli via Blindern"
          },
          "quay": {
            "id": "NSR:Quay:11151"
          },
          "serviceJourney": {
            "journeyPattern": {
              "line": {
                "id": "RUT:Line:5",
                "name": "Sognsvann - Vestli",
                "transportMode": "metro"
              }
            }
          }
        }
      ]
    }
  }
}
*/

export default async (context: Context) => {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!);

    const databases = new Databases(client);

    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const departuresCollectionId = process.env.APPWRITE_DEPARTURES_COLLECTION_ID!; // departures collection
    const stopPlacesCollectionId = process.env.APPWRITE_STOP_PLACES_COLLECTION_ID!;

    const enturClientName = process.env.ENTUR_CLIENT_NAME ?? "biso.app/1.0";
    const timeRangeSeconds = Number.parseInt(process.env.ENTUR_TIME_RANGE ?? "7200", 10);
    const numberOfDepartures = Number.parseInt(process.env.ENTUR_NUM_DEPARTURES ?? "10", 10);

    const ENTUR_GRAPHQL_ENDPOINT = "https://api.entur.io/journey-planner/v3/graphql";

    const query = `
        query StopDepartures($id: String!, $timeRange: Int!, $numberOfDepartures: Int!) {
            stopPlace(id: $id) {
                id
                name
                estimatedCalls(timeRange: $timeRange, numberOfDepartures: $numberOfDepartures) {
                    realtime
                    aimedArrivalTime
                    aimedDepartureTime
                    expectedArrivalTime
                    expectedDepartureTime
                    actualArrivalTime
                    actualDepartureTime
                    date
                    forBoarding
                    forAlighting
                    destinationDisplay { frontText }
                    quay { id }
                    serviceJourney {
                        id
                        journeyPattern { line { id name transportMode } }
                    }
                }
            }
        }
    `;

    async function fetchStop(id: string): Promise<StopPlace | null> {
        try {
            const res = await fetch(ENTUR_GRAPHQL_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "ET-Client-Name": enturClientName,
                },
                body: JSON.stringify({
                    query,
                    variables: { id, timeRange: timeRangeSeconds, numberOfDepartures },
                }),
            });

            if (!res.ok) {
                context.error(`Entur request failed for ${id}: ${res.status} ${res.statusText}`);
                return null;
            }

            const json: any = await res.json();
            if ((json as any).errors) {
                context.error(`Entur GraphQL errors for ${id}: ${JSON.stringify((json as any).errors)}`);
                return null;
            }

            return (json as any).data?.stopPlace ?? null;
        } catch (err: any) {
            context.error(`Entur fetch error for ${id}: ${err?.message ?? String(err)}`);
            return null;
        }
    }

    async function upsertStopDocument(stop: StopPlace) {
        const documentId = stop.id;
        const payload = {
            stopPlaceId: stop.id,
            stopPlaceName: stop.name,
            updatedAt: new Date().toISOString(),
            estimatedCalls: JSON.stringify(stop.estimatedCalls),
        } as any;

        try {
            await databases.updateDocument(databaseId, departuresCollectionId, documentId, payload);
        } catch (e: any) {
            if (e?.code === 404) {
                await databases.createDocument(
                    databaseId,
                    departuresCollectionId,
                    documentId,
                    payload,
                    [Permission.read(Role.any())]
                );
            } else {
                throw e;
            }
        }
    }

    // Load stop place IDs from the configured collection
    const stopDocs = await databases.listDocuments(databaseId, stopPlacesCollectionId);
    const stopPlaceIds = stopDocs.documents
        .filter((d: any) => d.enabled !== false)
        .map((d: any) => d.stopPlaceId)
        .filter((v: any) => typeof v === "string" && v.trim().length > 0);

    const results = await Promise.all(stopPlaceIds.map((id: string) => fetchStop(id)));
    const successful = results.filter((r): r is StopPlace => Boolean(r));

    for (const stop of successful) {
        try {
            await upsertStopDocument(stop);
            context.log(`Updated stop ${stop.name} (${stop.id}) with ${stop.estimatedCalls.length} departures`);
        } catch (err: any) {
            context.error(`Failed to upsert document for ${stop.id}: ${err?.message ?? String(err)}`);
        }
    }

    return {
        updated: successful.map((s) => s.id),
        skipped: stopPlaceIds.filter((id) => !successful.find((s) => s.id === id)),
    };
}