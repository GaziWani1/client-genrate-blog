export function calculateDays(date: string) {
  const featureDate = new Date(date);

  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = featureDate - currentDate;

  // Convert to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return `Remanining days: ${diffInDays}`;
}
