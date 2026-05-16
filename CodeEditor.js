import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function CodeEditor() {

  const [code, setCode] = useState(
`a = 10
b = 0
print(a/b)`
  );

  const [result, setResult] = useState(null);

  const analyzeCode = async () => {

    const response = await axios.post(
      'http://127.0.0.1:5000/analyze',
      { code }
    );

    setResult(response.data);
  };

  return (
    <div>

      <Editor
        height="400px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <button onClick={analyzeCode}>
        Analyze Code
      </button>

      {result && (
        <div className="result-box">
          <h2>Status: {result.status}</h2>

          <h3>Error Message</h3>
          <p>{result.message}</p>

          <h3>AI Explanation</h3>
          <p>{result.explanation}</p>

          <h3>Optimized Code</h3>
          <pre>{result.optimized_code}</pre>
        </div>
      )}

    </div>
  );
}

export default CodeEditor;
