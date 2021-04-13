import { TIMEOUT_SEC } from './config.js';

/**
 * Makes GET and POST requests to the forkify API
 * @param {String} url The API url which may contain parameters such as key and search.
 * @param {Object} [uploadData=undefined] If object is passed in, then AJAX makes a POST with upload data.
 * @returns {Object|Error} Returns data as JSON if Promise is resolved otherwise it throws an error.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Helper function to prevent long-running Promises from fetch.
 * @param {Number} s The amount of time in seconds before setTimeout handler is called.
 * @returns {Promise} Returns a rejected promise which throws an error describing that the fetch took too long.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const request = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIMEOUT_SEC),
//     ]);
//     const data = await request.json();
//     if (!request.ok) throw new Error(`${data.message} ${request.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
