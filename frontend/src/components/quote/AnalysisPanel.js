"use client";

export default function AnalysisPanel() {
  return (
    <div className="w-full bg-neutral-900/75 rounded-lg p-4 border border-neutral-800 space-y-4">
      {/* Header + Risk Meter column */}
      <div className="flex justify-between items-start">
        {/* Analysis Section */}
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-blue-400">Analysis</h2>
          <p className="text-neutral-400 text-sm mt-1">
            This section provides insights into the stock’s recent performance,
            volatility, and sentiment trends to help guide trading decisions.
          </p>
        </div>

        {/* Risk Meter Section */}
        <div className="w-1/3">
          <h3 className="text-sm font-medium text-neutral-300 mb-1">
            Risk Meter
          </h3>
          <div className="w-full bg-neutral-800 rounded-full h-3 border border-neutral-700 overflow-hidden">
            <div
              className="h-full bg-yellow-400"
              style={{ width: "60%" }} // Adjust percentage dynamically if needed
            />
          </div>
        </div>
      </div>
    </div>
  );
}
