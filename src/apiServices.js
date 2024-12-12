// Base URL and default headers (modify according to your API setup)
const BASE_URL = "https://gst-verification.p.rapidapi.com";
const API_KEY = "4d8a6ddb5fmshd4b6ea5b96b27d2p19e700jsn1763a1a15aea";
const API_HOST = "gst-verification.p.rapidapi.com";

// Validate GST Number
export async function validateGSTNumber(gstNumber) {
  const apiUrl = `https://gst-verification.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_gst_certificate`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
		group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
        data: {
          gstin: gstNumber
        }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);

      return data;
    } else {
      console.error("Failed to validate GST number:", response.statusText);
    
    }
  } catch (error) {
    console.error("Error during GST validation:", error);
    return false;
  }
}