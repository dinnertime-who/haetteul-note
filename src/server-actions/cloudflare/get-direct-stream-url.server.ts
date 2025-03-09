import "server-only";

export type GetDirectStreamUrlParams = {
  requireSignedURLs: boolean;
  maxDurationSeconds: number;
  creator: string;
  allowedOrigins?: string[];
  thumbnailTimestampPct?: number;
  metadata?: Record<string, string>;
};

export const getDirectStreamUrl = async function (
  params: GetDirectStreamUrlParams
) {
  try {
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cfApiToken = process.env.CLOUDFLARE_API_TOKEN;

    const fetched = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfApiToken}`,
          ["Content-Type"]: "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    const result = (await fetched.json()) as {
      result: {
        scheduledDeletion: string;
        uid: string;
        uploadURL: string;
      };
      result_info: unknown;
      success: boolean;
      errors: unknown[];
      messages: unknown[];
    };

    return result;
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};
