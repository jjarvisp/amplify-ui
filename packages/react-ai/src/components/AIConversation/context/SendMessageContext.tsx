import React from 'react';
import type { SendMessage } from '../../../types';

export const SendMessageContext = React.createContext<SendMessage | undefined>(
  undefined
);

export const SendMessageContextProvider = ({
  children,
  handleSendMessage,
}: {
  children?: React.ReactNode;
  handleSendMessage: SendMessage;
}): React.JSX.Element => {
  return (
    <SendMessageContext.Provider value={handleSendMessage}>
      {children}
    </SendMessageContext.Provider>
  );
};
