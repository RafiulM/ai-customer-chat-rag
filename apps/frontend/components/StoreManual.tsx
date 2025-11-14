/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// @ts-ignore - Vite handles ?raw imports
import storeManualContent from "../Raf Tech — Manual Toko.md?raw";

interface StoreManualProps {
  onBack: () => void;
}

const StoreManual: React.FC<StoreManualProps> = ({ onBack }) => {

  return (
    <div className="h-screen overflow-auto bg-gem-onyx text-gem-offwhite">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-md bg-gem-slate text-gem-offwhite hover:bg-gem-mist transition-colors"
        >
          ← Back to Sign In
        </button>
        <div className="bg-gem-slate rounded-lg shadow-xl p-8">
          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-0 mb-4 text-gem-offwhite" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-4 text-gem-offwhite" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-3 text-gem-offwhite" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gem-offwhite/90 leading-relaxed" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gem-offwhite" {...props} />,
                a: ({node, ...props}) => <a className="text-gem-teal hover:text-gem-blue underline" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2 text-gem-offwhite/90" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gem-offwhite/90" {...props} />,
                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                table: ({node, ...props}) => <table className="w-full border-collapse border border-gem-mist mb-4" {...props} />,
                thead: ({node, ...props}) => <thead className="bg-gem-mist" {...props} />,
                th: ({node, ...props}) => <th className="border border-gem-mist px-4 py-2 text-left font-bold text-gem-offwhite" {...props} />,
                td: ({node, ...props}) => <td className="border border-gem-mist px-4 py-2 text-gem-offwhite/90" {...props} />,
                hr: ({node, ...props}) => <hr className="my-6 border-gem-mist" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gem-teal pl-4 italic my-4 text-gem-offwhite/80" {...props} />,
              }}
            >
              {storeManualContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManual;

