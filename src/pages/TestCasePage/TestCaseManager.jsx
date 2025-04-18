import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios'; // Import axios

const TestCaseManager = () => {
  // ... (all your state declarations remain unchanged)
  const [projectName, setProjectName] = useState('HomiesStay');
  const [version, setVersion] = useState('1.0');
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [newTestCase, setNewTestCase] = useState({
    testId : '',
    name: '',
    target: '',
    implementationSteps: '',
    input: '',
    expectedOutput: '',
    status: 'Đạt',
    note: ''
  });

  const API_BASE_URL = 'https://localhost:7284/testcase';

  // Fetch all test cases using axios
  const fetchTestCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setTestCases(response.data);
    } catch (err) {
      setError(`Failed to fetch test cases: ${err.message}`);
      console.error('Error fetching test cases:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new test case using axios
  const createTestCase = async () => {
    if (!newTestCase.name || !newTestCase.target) {
      alert('Vui lòng điền ít nhất Tên TC và Mục đích');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, {
        testId: newTestCase.testId,
        name: newTestCase.name,
        target: newTestCase.target,
        implementationSteps: newTestCase.implementationSteps,
        input: newTestCase.input,
        expectedOutput: newTestCase.expectedOutput,
        status: newTestCase.status,
        note: newTestCase.note
      });

      const createdTestCase = response.data;
      setTestCases([...testCases, createdTestCase]);
      
      // Reset the form
      setNewTestCase({
        testId: createdTestCase.testId,
        name: '',
        target: '',
        implementationSteps: '',
        input: '',
        expectedOutput: '',
        status: 'Đạt',
        note: ''
      });

    } catch (err) {
      setError(`Failed to create test case: ${err.message}`);
      console.error('Error creating test case:', err);
    } finally {
      setLoading(false);
    }
  };

  // ... (useEffect and all other functions remain unchanged)
  useEffect(() => {
    fetchTestCases();
  }, []);

  const handleNewTestCaseChange = (field, value) => {
    setNewTestCase({...newTestCase, [field]: value});
  };

  const downloadCSV = () => {
    const headerRows = [
      ['TEST CASE PROCEDURE'],
      [''],
      ['Tên dự án:', projectName],
      ['Phiên bản:', version],
      ['Ngày:', new Date().toLocaleDateString()],
      [''],
      ['Mã TC', 'Tên TC', 'Mục đích', 'Các bước thực hiện', 'Đầu vào', 'Kết quả mong đợi', 'Tình trạng test', 'Ghi chú / Lý do']
    ];
    
    const testCaseRows = testCases.map(tc => [
      tc.id,
      tc.testId,
      tc.name,
      tc.target,
      tc.implementationSteps,
      tc.input,
      tc.expectedOutput,
      tc.status,
      tc.note || ''
    ]);
    
    const allRows = [...headerRows, ...testCaseRows];
    const csv = Papa.unparse(allRows);
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${projectName.replace(/\s+/g, '_')}_TestCases.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // ... (JSX remains unchanged)
  return (
    <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">BẢNG TEST CASE</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tên dự án:</label>
          <input 
            type="text" 
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phiên bản:</label>
          <input 
            type="text" 
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      {loading && <div className="text-center py-4">Đang tải dữ liệu...</div>}
      {error && <div className="text-red-600 py-4">{error}</div>}
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Danh sách Test Case</h2>
          <button 
            onClick={fetchTestCases}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            Làm mới
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Mã TC</th>
                <th className="px-4 py-2 border">Tên TC</th>
                <th className="px-4 py-2 border">Mục đích</th>
                <th className="px-4 py-2 border">Các bước thực hiện</th>
                <th className="px-4 py-2 border">Đầu vào</th>
                <th className="px-4 py-2 border">Kết quả mong đợi</th>
                <th className="px-4 py-2 border">Tình trạng test</th>
                <th className="px-4 py-2 border">Ghi chú / Lý do</th>
              </tr>
            </thead>
            <tbody>
              {testCases.length > 0 ? (
                testCases.map((tc) => (
                  <tr key={tc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{tc.testId}</td>
                    <td className="px-4 py-2 border">{tc.name}</td>
                    <td className="px-4 py-2 border">{tc.target}</td>
                    <td className="px-4 py-2 border" style={{whiteSpace: 'pre-line'}}>{tc.implementationSteps}</td>
                    <td className="px-4 py-2 border" style={{whiteSpace: 'pre-line'}}>{tc.input}</td>
                    <td className="px-4 py-2 border">{tc.expectedOutput}</td>
                    <td className="px-4 py-2 border">{tc.status}</td>
                    <td className="px-4 py-2 border">{tc.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center border">
                    {loading ? "Đang tải..." : "Chưa có test case nào"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Thêm Test Case mới</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Mã TC:</label>
          <input 
            type="text" 
            value={newTestCase.testId}
            onChange={(e) => handleNewTestCaseChange('testId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tên TC:</label>
          <input 
            type="text" 
            value={newTestCase.name}
            onChange={(e) => handleNewTestCaseChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Mục đích:</label>
          <textarea 
            value={newTestCase.target}
            onChange={(e) => handleNewTestCaseChange('target', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="2"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Các bước thực hiện:</label>
          <textarea 
            value={newTestCase.implementationSteps}
            onChange={(e) => handleNewTestCaseChange('implementationSteps', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Đầu vào:</label>
          <textarea 
            value={newTestCase.input}
            onChange={(e) => handleNewTestCaseChange('input', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="2"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Kết quả mong đợi:</label>
          <textarea 
            value={newTestCase.expectedOutput}
            onChange={(e) => handleNewTestCaseChange('expectedOutput', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tình trạng test:</label>
            <select 
              value={newTestCase.status}
              onChange={(e) => handleNewTestCaseChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Đạt">ĐẠT</option>
              <option value="Chưa test">Chưa test</option>
              <option value="Không đạt">Không đạt</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Ghi chú / Lý do:</label>
            <textarea 
              value={newTestCase.note}
              onChange={(e) => handleNewTestCaseChange('note', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="2"
              placeholder="Có thể ghi nhận lý do vì sao Không Test / Chưa Test"
            ></textarea>
          </div>
        </div>
        
        <button 
          onClick={createTestCase}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Đang xử lý...' : 'Thêm Test Case'}
        </button>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={downloadCSV}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
        >
          Tải Test Case (CSV)
        </button>
        <p className="mt-2 text-sm text-gray-600">File CSV có thể được nhập vào Excel hoặc Google Sheets</p>
      </div>
    </div>
  );
};

export default TestCaseManager;