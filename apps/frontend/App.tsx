/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import AuthenticatedApp from "./components/AuthenticatedApp";
import StoreManual from "./components/StoreManual";

const App: React.FC = () => {
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      {showManual ? (
        <StoreManual onBack={() => setShowManual(false)} />
      ) : (
        <AuthenticatedApp />
      )}
    </div>
  );
};

export default App;
