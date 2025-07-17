// src/utils/generateChatId.ts
export function generateChatId() {
    const uuid = crypto.randomUUID();
    const timestamp = Date.now();
    return `${uuid}-${timestamp}`;
  }