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
        <div className="temperature-toggle flex rounded-md overflow-hidden border border-gray-300">
            <button
                className={`py-1 px-3 text-sm transition-colors ${
                    unit === 'C' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => onChange('C')}
            >
                °C
            </button>
            <button
                className={`py-1 px-3 text-sm transition-colors ${
                    unit === 'F' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => onChange('F')}
            >
                °F
            </button>
        </div>
    );
};

export default TemperatureToggle;