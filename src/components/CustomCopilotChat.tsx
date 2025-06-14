"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useState, useRef, useEffect } from "react";

interface CustomCopilotChatProps {
  labels: {
    title: string;
    initial: string;
    placeholder: string;
  };
  instructions: string;
  className?: string;
}

export default function CustomCopilotChat({ labels, instructions, className }: CustomCopilotChatProps) {
  const [isComposing, setIsComposing] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // CopilotChatの入力フィールドをターゲットとする場合のみ処理
      const target = event.target as HTMLElement;
      if (!target.matches('input[type="text"], textarea')) return;

      // Enterキーが押された場合
      if (event.key === 'Enter') {
        // 日本語入力中（変換中）の場合は送信を防ぐ
        if (isComposing) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        
        // Shift+Enterの場合は改行（デフォルトの動作）
        if (event.shiftKey) {
          return;
        }
        
        // 通常のEnterキーの場合は送信を許可
        // CopilotChatのデフォルトの送信処理に任せる
      }
    };

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = () => {
      setIsComposing(false);
    };

    // イベントリスナーを追加
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('compositionstart', handleCompositionStart, true);
    document.addEventListener('compositionend', handleCompositionEnd, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('compositionstart', handleCompositionStart, true);
      document.removeEventListener('compositionend', handleCompositionEnd, true);
    };
  }, [isComposing]);

  return (
    <div ref={chatRef} className={className}>
      <CopilotChat
        labels={labels}
        instructions={instructions}
        className="h-full flex flex-col"
      />
    </div>
  );
}
