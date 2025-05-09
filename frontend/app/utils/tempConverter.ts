/**
 * Convert temperature between Celsius and Fahrenheit
 * @param temp Temperature value to convert
 * @param to Unit to convert to ('C' or 'F')
 * @returns Converted temperature value
 */
export const convertTemperature = (temp: number, to: 'C' | 'F'): number => {
    if (to === 'C') {
      // Convert from Fahrenheit to Celsius
      return (temp - 32) * (5 / 9);
    } else {
      // Convert from Celsius to Fahrenheit
      return (temp * 9) / 5 + 32;
    }
  };
  
  /**
   * Format temperature with units
   * @param temp Temperature value
   * @param unit Unit ('C' or 'F')
   * @returns Formatted temperature string with units
   */
  export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
    const roundedTemp = Math.round(temp);
    return `${roundedTemp}°${unit}`;
  };