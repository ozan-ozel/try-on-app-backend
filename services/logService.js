export function logWithTimestamp(message) {
  const now = new Date();
  const timestamp = now.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  console.log(`[${timestamp}] ${message}`);
}
