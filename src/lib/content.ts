import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Snippet = {
  title: string;
  body: string;
  source: string;
};

export function loadMarkdownSnippet(
  filename: string,
  maxChars = 1600
): Snippet {
  const source = path.join(CONTENT_DIR, filename);
  try {
    const raw = fs.readFileSync(source, "utf8");
    const body =
      raw.length > maxChars ? `${raw.slice(0, maxChars)}…` : raw.trim();
    const title = filename.replace(/\.md$/i, "");
    return { title, body, source: filename };
  } catch {
    return {
      title: filename,
      body: "Content unavailable. Please ensure the markdown file exists.",
      source: filename,
    };
  }
}

export function loadHunterDialogue(): { title: string; lines: string[] } {
  try {
    const raw = fs.readFileSync(
      path.join(
        CONTENT_DIR,
        "Character Specific Missions _ Companion Missions - Hunter’s Moon.md"
      ),
      "utf8"
    );
    const segments = raw
      .split("\n")
      .filter((line) => line.includes(":"))
      .slice(0, 16);
    return { title: "Hunter’s Moon — Dialogue Beat", lines: segments };
  } catch {
    return {
      title: "Hunter’s Moon — Dialogue Beat",
      lines: [
        "Narrator: Under the blood moon, every choice echoes louder than fate.",
        "Director: Story beats adapt to the player’s resolve and doubt.",
      ],
    };
  }
}

