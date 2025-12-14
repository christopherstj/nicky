"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageSquare, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const handleOptionSelect = (option: DialogueOption) => {
    setSelectedOption(option);
    setViewState("result");
  };

  const handleReset = () => {
    setViewState("context");
    setSelectedOption(null);
  };

  const handleContinue = () => {
    setViewState("choice");
  };

  return (
    <Card className="border-white/5 bg-surface/30 rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-primary" />
              <CardTitle className="text-base font-bold">
                {scene.name}
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="text-xs border-white/10 text-muted-foreground"
              >
                Chapter {scene.chapter}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-white/10 text-muted-foreground flex items-center gap-1"
              >
                <MapPin className="w-3 h-3" />
                {scene.location}
              </Badge>
            </div>
          </div>
          {viewState !== "context" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Restart
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <AnimatePresence mode="wait">
          {/* Context View */}
          {viewState === "context" && (
            <motion.div
              key="context"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                <p className="text-sm uppercase tracking-wider text-primary/80 mb-2">
                  Scene Context
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  {scene.context}
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full rounded-full shadow-lg shadow-primary/20"
              >
                View Player Choices
              </Button>
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
              <p className="text-sm text-muted-foreground mb-4">
                Select a choice to see the consequence:
              </p>
              {scene.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left p-4 rounded-xl border border-white/5 bg-background/30 hover:bg-primary/10 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {option.label}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
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
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm uppercase tracking-wider text-primary mb-2">
                  Your Choice
                </p>
                <p className="font-semibold text-foreground">
                  {selectedOption.label}
                </p>
                <p className="text-sm text-foreground/80 mt-1">
                  {selectedOption.text}
                </p>
              </div>

              {/* Consequence */}
              <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Consequence
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  {selectedOption.result}
                </p>
              </div>

              {/* Try another */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setViewState("choice")}
                  className="flex-1 rounded-full border-white/10 hover:border-primary/50"
                >
                  Try Another Choice
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="text-muted-foreground"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

