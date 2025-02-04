import { generateHMAC } from "~/utils/crypto";

async function makeAuthenticatedRequest(path: string) {
  const timestamp = Date.now().toString();
  const apiKey = process.env.API_ENDPOINT_SECRET || "";

  // Generate signature
  const payload = timestamp + path;
  const signature = await generateHMAC(payload, apiKey);

  const response = await fetch(`${process.env.API_ENDPOINT_URL}${path}`, {
    headers: {
      "X-Request-Timestamp": timestamp,
      "X-Signature": signature,
    },
  });

  return response;
}

makeAuthenticatedRequest("/api/v1/ping")
  .then((res) => {
    res.json().then((data) => console.log(data));
  })
  .catch((err) => console.error(err));
