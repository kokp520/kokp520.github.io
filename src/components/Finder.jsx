import React from 'react';
import { useFileSystem } from '../apps/FileSystemContext';

function Finder() {
  const { fileSystem, currentPath, cd } = useFileSystem();

  // 取得目前目錄的 node
  function findNodeByPath(root, pathArr) {
    let node = root;
    for (const part of pathArr) {
      if (!node.children) return null;
      node = node.children.find(child => child.name === part && child.type === 'folder');
      if (!node) return null;
    }
    return node;
  }
  const currentNode = findNodeByPath(fileSystem, currentPath) || fileSystem;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <b>目前路徑：</b>/{currentPath.join('/')}
      </div>
      <ul>
        {currentPath.length > 0 && (
          <li style={{ cursor: 'pointer', color: '#2d72d9' }} onClick={() => cd('..')}>.. (上一層)</li>
        )}
        {currentNode.children && currentNode.children.map(child => (
          <li
            key={child.name}
            style={{ cursor: child.type === 'folder' ? 'pointer' : 'default', color: child.type === 'folder' ? '#2d72d9' : '#333' }}
            onClick={() => child.type === 'folder' && cd(child.name)}
          >
            {child.type === 'folder' ? '📁' : '📄'} {child.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Finder; 