import React from 'react';

interface InstallPromptModalProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const InstallPromptModal: React.FC<InstallPromptModalProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 text-white shadow-lg z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold">Install Fox App?</h3>
          <p className="text-sm text-gray-300">
            Get quick access to Fox directly from your home screen.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onInstall}
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors duration-150"
          >
            Install
          </button>
          <button
            onClick={onDismiss}
            className="bg-transparent text-gray-400 px-6 py-2 rounded-md border border-gray-600 hover:bg-gray-800 hover:text-white transition-colors duration-150"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPromptModal;
