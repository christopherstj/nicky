import fs from "fs";
import path from "path";

// Types
export type DialogueOption = {
  label: string;
  text: string;
  result: string;
};

export type DialogueScene = {
  id: string;
  name: string;
  chapter: number;
  location: string;
  context: string;
  options: DialogueOption[];
};

export type WorkflowImage = {
  src: string;
  alt: string;
  description: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  description?: string;
};

export type Excerpt = {
  id: string;
  title: string;
  type: string;
  project: string;
  content: string;
};

export type Project = {
  id: string;
  title: string;
  role: string;
  studio: string;
  year: string;
  summary: string;
  heroImage: string;
  highlights: string[];
  excerpts: string[];
  dialogueScenes: string[];
  workflowImages: WorkflowImage[];
  galleryImages: GalleryImage[];
};

export type Skill = {
  name: string;
  description: string;
};

export type PortfolioData = {
  projects: Project[];
  skills: Skill[];
};

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), "content");
const DIALOGUE_DIR = path.join(CONTENT_DIR, "dialogue");
const EXCERPTS_DIR = path.join(CONTENT_DIR, "excerpts");

/**
 * Load the main portfolio.json file
 */
export function loadPortfolioData(): PortfolioData {
  const filePath = path.join(CONTENT_DIR, "portfolio.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

/**
 * Parse CSV content into rows
 */
function parseCSV(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentField.trim());
        currentField = "";
      } else if (char === "\n" || (char === "\r" && nextChar === "\n")) {
        currentRow.push(currentField.trim());
        if (currentRow.some((cell) => cell.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = "";
        if (char === "\r") i++; // Skip \n in \r\n
      } else {
        currentField += char;
      }
    }
  }

  // Handle last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((cell) => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Load a dialogue scene from CSV
 */
export function loadDialogueScene(sceneId: string): DialogueScene | null {
  const filePath = path.join(DIALOGUE_DIR, `${sceneId}.csv`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const rows = parseCSV(content);

  if (rows.length < 2) return null;

  // Skip header row
  const dataRows = rows.slice(1);

  // First row has the context
  const firstRow = dataRows[0];
  const scene: DialogueScene = {
    id: firstRow[0] || sceneId,
    name: firstRow[1] || "",
    chapter: parseInt(firstRow[2]) || 0,
    location: firstRow[3] || "",
    context: firstRow[4] || "",
    options: [],
  };

  // Collect all options from all rows
  for (const row of dataRows) {
    if (row[5] && row[6]) {
      scene.options.push({
        label: row[5],
        text: row[6],
        result: row[7] || "",
      });
    }
  }

  return scene;
}

/**
 * Load all dialogue scenes for a project
 */
export function loadDialogueScenesForProject(
  sceneIds: string[]
): DialogueScene[] {
  return sceneIds
    .map((id) => loadDialogueScene(id))
    .filter((scene): scene is DialogueScene => scene !== null);
}

/**
 * Parse markdown frontmatter
 */
function parseFrontmatter(content: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];

  const frontmatter: Record<string, string> = {};
  const lines = frontmatterStr.split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Load an excerpt markdown file
 */
export function loadExcerpt(excerptId: string): Excerpt | null {
  const filePath = path.join(EXCERPTS_DIR, `${excerptId}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(content);

  return {
    id: excerptId,
    title: frontmatter.title || excerptId,
    type: frontmatter.type || "excerpt",
    project: frontmatter.project || "",
    content: body.trim(),
  };
}

/**
 * Load all excerpts for a project
 */
export function loadExcerptsForProject(excerptIds: string[]): Excerpt[] {
  return excerptIds
    .map((id) => loadExcerpt(id))
    .filter((excerpt): excerpt is Excerpt => excerpt !== null);
}

/**
 * Load a complete project with all its content
 */
export function loadProjectWithContent(projectId: string): {
  project: Project;
  excerpts: Excerpt[];
  dialogueScenes: DialogueScene[];
} | null {
  const data = loadPortfolioData();
  const project = data.projects.find((p) => p.id === projectId);

  if (!project) return null;

  return {
    project,
    excerpts: loadExcerptsForProject(project.excerpts),
    dialogueScenes: loadDialogueScenesForProject(project.dialogueScenes),
  };
}

/**
 * Load all projects with their content
 */
export function loadAllProjectsWithContent(): Array<{
  project: Project;
  excerpts: Excerpt[];
  dialogueScenes: DialogueScene[];
}> {
  const data = loadPortfolioData();

  return data.projects.map((project) => ({
    project,
    excerpts: loadExcerptsForProject(project.excerpts),
    dialogueScenes: loadDialogueScenesForProject(project.dialogueScenes),
  }));
}

