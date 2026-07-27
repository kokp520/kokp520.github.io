import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // 更新狀態以顯示降級 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 在這裡記錄錯誤
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 可以在這裡發送錯誤報告到監控服務
    // 但對於音頻播放錯誤，我們只記錄但不顯示錯誤界面
    if (error.message && error.message.includes('play')) {
      // 如果是音頻播放錯誤，自動重置狀態
      setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 100);
    }
  }

  render() {
    if (this.state.hasError) {
      // 如果是音頻相關錯誤，不顯示錯誤界面
      if (this.state.error && this.state.error.message && 
          this.state.error.message.includes('play')) {
        return this.props.children;
      }
      
      // 其他錯誤顯示降級 UI
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#6c757d' }}>出現了一些問題</h2>
          <p style={{ color: '#868e96' }}>請重新整理頁面或聯繫管理員</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            重新整理
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 