# Terminal 元件說明

## 結構
- `Terminal.tsx`：主要的 Terminal UI 元件。
- `TerminalInput.tsx`：處理使用者輸入。
- `TerminalOutput.tsx`：顯示指令輸出。
- `terminalUtils.ts`：模擬指令處理的工具。
- `terminal.css`：Terminal 樣式。
- `index.ts`：統一 export。

## 維護方式
- 新增指令請於 `terminalUtils.ts` 裡擴充。
- 若需自訂 UI，請修改 `Terminal.tsx` 及 `terminal.css`。
- 子元件拆分，方便維護與測試。

## 如何擴充指令
1. 在 `terminalUtils.ts` 新增對應的指令處理函式。
2. 在指令對應表中註冊新指令。
3. 於 `README.md` 補充新指令說明。

---

如有問題，請聯絡維護者。 