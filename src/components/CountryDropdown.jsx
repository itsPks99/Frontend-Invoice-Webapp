// CountryDropdown.js
import React from 'react';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "USA", "UK", "India", "France", "Germany"
];

const CountryDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
      required
    >
      <option value="">Select Country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
