/**
 * Convert temperature between Celsius and Fahrenheit
 * @param temp Temperature value to convert
 * @param to Unit to convert to ('C' or 'F')
 * @returns Converted temperature value
 */
export const convertTemperature = (temp: number, to: 'C' | 'F'): number => {
  if (to === 'C') {
    // If temperature is already in Celsius, return as is
    return temp;
  } else {
    // Convert from Celsius to Fahrenheit
    return (temp * 9) / 5 + 32;
  }
};

/**
 * Format temperature with units
 * @param temp Temperature value (in Celsius)
 * @param unit Display unit ('C' or 'F')
 * @returns Formatted temperature string with units
 */
export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
  // First convert the temperature if needed
  const convertedTemp = unit === 'F' ? convertTemperature(temp, 'F') : temp;
  
  // Then round it
  const roundedTemp = Math.round(convertedTemp);
  
  // Return formatted string
  return `${roundedTemp}°${unit}`;
};