import { useState, useEffect } from 'react';

// Main App component
export default function App() {
  const [selectedSheet, setSelectedSheet] = useState('Kotak SRG');
  const [formData, setFormData] = useState({
    Date: '',
    Particulars: '',
    'Credit or Debit': '',
    Amount: '',
    Remarks: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Handles input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset message
    setMessage('');
    setMessageType('');

    // Simple validation
    if (!formData.Date || !formData.Particulars || !formData['Credit or Debit'] || !formData.Amount) {
      setMessage('Please fill in all required fields.');
      setMessageType('error');
      return;
    }

    try {
      // In a real application, you would make an API call here to save data to your Google Sheet.
      // Example using a hypothetical API:
      // const response = await fetch('/api/save-to-sheet', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sheet: selectedSheet, data: formData }),
      // });
      // const result = await response.json();
      // if (result.success) {
      //   setMessage(`Data successfully added to ${selectedSheet} sheet.`);
      //   setMessageType('success');
      // } else {
      //   setMessage('Failed to save data. Please try again.');
      //   setMessageType('error');
      // }

      // Simulating a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Simulating data entry for sheet: ${selectedSheet}`);
      console.log(formData);
      
      setMessage(`Transaction data successfully submitted to the "${selectedSheet}" sheet.`);
      setMessageType('success');

      // Clear the form after successful submission
      setFormData({
        Date: '',
        Particulars: '',
        'Credit or Debit': '',
        Amount: '',
        Remarks: '',
      });
    } catch (error) {
      setMessage('An error occurred. Please check your network and try again.');
      setMessageType('error');
      console.error('Error submitting form:', error);
    }
  };

  // Utility function to get today's date in YYYY-MM-DD format
  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Data Entry Form</h1>
        
        {/* Sheet Selection Dropdown */}
        <div className="mb-6">
          <label htmlFor="sheet-select" className="block text-gray-700 font-semibold mb-2">
            Select Sheet:
          </label>
          <select
            id="sheet-select"
            value={selectedSheet}
            onChange={(e) => setSelectedSheet(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
          >
            <option value="Kotak SRG">Kotak SRG</option>
            <option value="UBI SRG">UBI SRG</option>
          </select>
        </div>

        {/* Form for Data Entry */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input for Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="Date"
              value={formData.Date}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            />
          </div>

          {/* Input for Particulars */}
          <div>
            <label htmlFor="particulars" className="block text-gray-700 font-semibold mb-2">
              Particulars:
            </label>
            <input
              type="text"
              id="particulars"
              name="Particulars"
              placeholder="e.g., Restaurant, Amazon, Rent"
              value={formData.Particulars}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            />
          </div>

          {/* Input for Credit or Debit */}
          <div>
            <label htmlFor="credit-debit" className="block text-gray-700 font-semibold mb-2">
              Credit or Debit:
            </label>
            <select
              id="credit-debit"
              name="Credit or Debit"
              value={formData['Credit or Debit']}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            >
              <option value="">Select Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          {/* Input for Amount */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="Amount"
              placeholder="Enter amount"
              value={formData.Amount}
              onChange={handleInputChange}
              required
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            />
          </div>

          {/* Input for Remarks */}
          <div>
            <label htmlFor="remarks" className="block text-gray-700 font-semibold mb-2">
              Remarks:
            </label>
            <input
              type="text"
              id="remarks"
              name="Remarks"
              placeholder="e.g., Uber, Swiggy, etc."
              value={formData.Remarks}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            />
          </div>

          {/* Message Box for success or error messages */}
          {message && (
            <div
              className={`p-4 rounded-lg text-center ${
                messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
