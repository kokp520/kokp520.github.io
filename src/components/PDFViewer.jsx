import React from 'react';

const PDFViewer = ({ filePath }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src={filePath}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default PDFViewer; 