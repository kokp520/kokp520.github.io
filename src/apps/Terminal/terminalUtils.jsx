import { useFileSystem } from '../FileSystemContext';

export function useTerminalCommands() {
  const { ls, cd, mkdir, touch, currentPath } = useFileSystem();

  const commands = {
    help: () =>
      `可用指令：\nhelp - 顯示說明\nclear - 清除畫面\necho [文字] - 顯示文字\nls - 列出目錄\ncd [dir] - 切換目錄\nmkdir [dir] - 建立資料夾\ntouch [file] - 建立檔案`,
    clear: (_args, setLines) => {
      setLines(() => [
        { type: 'output', value: '\n\n' },
      ]);
      return undefined;
    },
    echo: (args) => args.join(' '),
    ls: () => ls(),
    cd: (args) => {
      if (!args[0]) return '請輸入目標資料夾名稱';
      return cd(args[0]) ? '' : `找不到資料夾：${args[0]}`;
    },
    mkdir: (args) => {
      if (!args[0]) return '請輸入新資料夾名稱';
      mkdir(args[0]);
      return '';
    },
    touch: (args) => {
      if (!args[0]) return '請輸入新檔案名稱';
      touch(args[0]);
      return '';
    },
    pwd: () => '/' + currentPath.join('/'),
  };

  function handleCommand(input, setLines) {
    const [cmd, ...args] = input.trim().split(/\s+/);
    const handler = commands[cmd];
    if (handler) {
      return handler(args, setLines) ?? undefined;
    }
    return `command not found: ${cmd}`;
  }

  return { handleCommand };
} 