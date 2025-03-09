import "server-only";

export type GetDirectImageUrlParams = {
  requireSignedURLs: boolean;
  metadata?: Record<string, string>;
};

export async function getDirectImageUrl(params: GetDirectImageUrlParams) {
  try {
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cfApiToken = process.env.CLOUDFLARE_API_TOKEN;

    const formData = new FormData();
    formData.set("requireSignedURLs", `${params.requireSignedURLs}`);
    if (params.metadata) {
      formData.set("metadata", JSON.stringify(params.metadata));
    }

    const fetched = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${cfApiToken}` },
        body: formData,
      }
    );

    const result = (await fetched.json()) as {
      result: {
        id: string;
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
}
