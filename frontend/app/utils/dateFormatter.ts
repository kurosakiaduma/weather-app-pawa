/**
 * Format timestamp to user-friendly date string
 * @param timestamp Unix timestamp
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Get day name from timestamp
   * @param timestamp Unix timestamp
   * @returns Day name (e.g., "Monday")
   */
  export const getDayName = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  