"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageSquare, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DialogueScene, DialogueOption } from "@/lib/portfolio";

type Props = {
  scene: DialogueScene;
};

type ViewState = "context" | "choice" | "result";

export default function BranchingDialogue({ scene }: Props) {
  const [viewState, setViewState] = useState<ViewState>("context");
  const [selectedOption, setSelectedOption] = useState<DialogueOption | null>(
    null
  );
  const [contextIndex, setContextIndex] = useState(0);

  const contextLines = scene.contextLines || [];
  const hasSequentialContext = contextLines.length > 0;
  const currentContextLine = hasSequentialContext 
    ? contextLines[contextIndex] 
    : null;
  const isLastContextLine = hasSequentialContext && contextIndex >= contextLines.length - 1;

  const handleOptionSelect = (option: DialogueOption) => {
    setSelectedOption(option);
    setViewState("result");
  };

  const handleReset = () => {
    setViewState("context");
    setSelectedOption(null);
    setContextIndex(0);
  };

  const handleContinue = () => {
    if (hasSequentialContext && !isLastContextLine) {
      setContextIndex(contextIndex + 1);
    } else {
      setViewState("choice");
    }
  };

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(
          155deg,
          #e8dcc8 0%,
          #d4c4a8 50%,
          #c4b498 100%
        )`,
        boxShadow: "2px 3px 12px rgba(0,0,0,0.25), 4px 6px 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div 
        className="p-4 sm:p-6"
        style={{ borderBottom: "1px solid rgba(26, 20, 16, 0.1)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4" style={{ color: "#8b2500" }} />
              <h4 className="font-display text-base font-semibold" style={{ color: "#1a1410" }}>
                {scene.name}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span 
                className="text-xs px-2 py-0.5"
                style={{ 
                  border: "1px solid rgba(26, 20, 16, 0.2)",
                  color: "#5a4a3a" 
                }}
              >
                Chapter {scene.chapter}
              </span>
              <span 
                className="text-xs px-2 py-0.5 flex items-center gap-1"
                style={{ 
                  border: "1px solid rgba(26, 20, 16, 0.2)",
                  color: "#5a4a3a" 
                }}
              >
                <MapPin className="w-3 h-3" />
                {scene.location}
              </span>
            </div>
          </div>
          {viewState !== "context" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="hover:bg-transparent"
              style={{ color: "#5a4a3a" }}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Restart
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {/* Context View */}
          {viewState === "context" && (
            <motion.div
              key={`context-${contextIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {hasSequentialContext && currentContextLine ? (
                <div 
                  className="p-4"
                  style={{ 
                    background: "rgba(232, 220, 200, 0.5)",
                    border: "1px solid rgba(26, 20, 16, 0.1)" 
                  }}
                >
                  <p className="leading-relaxed whitespace-pre-line italic" style={{ color: "#1a1410" }}>
                    {currentContextLine}
                  </p>
                </div>
              ) : (
                <div 
                  className="p-4"
                  style={{ 
                    background: "rgba(232, 220, 200, 0.5)",
                    border: "1px solid rgba(26, 20, 16, 0.1)" 
                  }}
                >
                  <p className="text-sm font-display font-semibold mb-2" style={{ color: "#8b2500" }}>
                    Scene Context
                  </p>
                  <p className="leading-relaxed italic" style={{ color: "#1a1410" }}>
                    {scene.context}
                  </p>
                </div>
              )}
              <button
                onClick={handleContinue}
                className="w-full py-3 font-display font-medium transition-all"
                style={{
                  background: "#8b2500",
                  color: "#e8dcc8",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#6b1a00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#8b2500";
                }}
              >
                {hasSequentialContext && !isLastContextLine ? "Continue" : "View Player Choices"}
              </button>
            </motion.div>
          )}

          {/* Choice View */}
          {viewState === "choice" && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <p className="text-sm mb-4" style={{ color: "#5a4a3a" }}>
                Select a choice to see the consequence:
              </p>
              {scene.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left p-4 transition-all group"
                  style={{
                    border: "1px solid rgba(26, 20, 16, 0.15)",
                    background: "rgba(232, 220, 200, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(139, 37, 0, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(139, 37, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(232, 220, 200, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(26, 20, 16, 0.15)";
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span 
                      className="shrink-0 w-6 h-6 rounded-full text-sm font-bold flex items-center justify-center transition-colors"
                      style={{ 
                        background: "rgba(26, 20, 16, 0.1)", 
                        color: "#1a1410" 
                      }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-display font-semibold" style={{ color: "#1a1410" }}>
                        {option.label}
                      </p>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: "#5a4a3a" }}>
                        {option.text}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Result View */}
          {viewState === "result" && selectedOption && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Selected choice */}
              <div 
                className="p-4"
                style={{ 
                  background: "rgba(139, 37, 0, 0.1)",
                  border: "1px solid rgba(139, 37, 0, 0.25)" 
                }}
              >
                <p className="text-sm font-display font-semibold mb-2" style={{ color: "#8b2500" }}>
                  Your Choice
                </p>
                <p className="font-semibold" style={{ color: "#1a1410" }}>
                  {selectedOption.label}
                </p>
                <p className="text-sm mt-1" style={{ color: "#5a4a3a" }}>
                  {selectedOption.text}
                </p>
              </div>

              {/* Consequence */}
              <div 
                className="p-4"
                style={{ 
                  background: "rgba(232, 220, 200, 0.5)",
                  border: "1px solid rgba(26, 20, 16, 0.1)" 
                }}
              >
                <p className="text-sm font-display font-semibold mb-2" style={{ color: "#5a4a3a" }}>
                  Consequence
                </p>
                <p className="leading-relaxed italic" style={{ color: "#1a1410" }}>
                  {selectedOption.result}
                </p>
              </div>

              {/* Try another */}
              <div className="flex gap-3">
                <button
                  onClick={() => setViewState("choice")}
                  className="flex-1 py-2 font-display font-medium transition-all"
                  style={{
                    border: "1px solid rgba(26, 20, 16, 0.2)",
                    color: "#1a1410",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(139, 37, 0, 0.4)";
                    e.currentTarget.style.color = "#8b2500";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(26, 20, 16, 0.2)";
                    e.currentTarget.style.color = "#1a1410";
                  }}
                >
                  Try Another Choice
                </button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="hover:bg-transparent"
                  style={{ color: "#5a4a3a" }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
