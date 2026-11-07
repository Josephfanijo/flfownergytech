/**
 * Web3Forms API Integration Service for FLOWNERGY GLOBAL LIMITED
 * Delivers customer enquiries directly to the company inbox via Web3Forms.
 */

/**
 * Validates email format if an email address is provided.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || !email.trim()) return true; // Optional field
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailPattern.test(email.trim());
}

/**
 * Formats current date and time for Nigerian/WAT locale and ISO string.
 * @returns {string}
 */
export function getFormattedSubmissionTime() {
  const now = new Date();
  return now.toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Africa/Lagos'
  });
}

/**
 * Submits an enquiry payload to Web3Forms API.
 * 
 * @param {Object} payload - The fields to transmit
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitToWeb3Forms(payload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey || accessKey.trim() === "" || accessKey.includes("your_web3forms_access_key")) {
    return {
      success: false,
      message: "Web3Forms access key is not yet configured. Please set VITE_WEB3FORMS_ACCESS_KEY in your environment (.env) file."
    };
  }

  // Honeypot spam check: if hidden botcheck field was filled by a crawler, silently fail
  if (payload.botcheck) {
    return {
      success: false,
      message: "Spam detected."
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "FLOWNERGY TECH Portal",
        ...payload
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || "Enquiry successfully transmitted to FLOWNERGY engineering desk."
      };
    } else {
      return {
        success: false,
        message: result.message || "Submission failed. Please verify your details or use our direct WhatsApp dispatch."
      };
    }
  } catch (error) {
    console.error("Web3Forms API network error:", error);
    return {
      success: false,
      message: "Network connection error while sending your enquiry. Please check your connection or forward via WhatsApp."
    };
  }
}

