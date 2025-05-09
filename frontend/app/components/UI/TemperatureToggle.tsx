import React from 'react';

interface TemperatureToggleProps {
    unit: 'C' | 'F';
    onChange: (unit: 'C' | 'F') => void;
}

/**
 * Component for toggling between Celsius and Fahrenheit
 */
const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onChange }) => {
    return (
        <div className="flex items-center">
            <button
                className={`w-10 h-10 rounded-l-lg transition-colors ${
                    unit === 'C' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => onChange('C')}
                aria-label="Switch to Celsius"
            >
                °C
            </button>
            <button
                className={`w-10 h-10 rounded-r-lg transition-colors ${
                    unit === 'F' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => onChange('F')}
                aria-label="Switch to Fahrenheit"
            >
                °F
            </button>
        </div>
    );
};

export default TemperatureToggle;