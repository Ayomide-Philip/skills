#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");

// ANSI formatting helpers
const color = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

// Scan packageRoot for available skills (directories containing SKILL.md)
function getAvailableSkills() {
  const entries = fs.readdirSync(packageRoot, { withFileTypes: true });
  const skills = [];
  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      entry.name !== "bin" &&
      entry.name !== "node_modules" &&
      !entry.name.startsWith(".")
    ) {
      const skillFile = path.join(packageRoot, entry.name, "SKILL.md");
      if (fs.existsSync(skillFile)) {
        skills.push(entry.name);
      }
    }
  }
  return skills;
}

// Check for ~/.agents vs ~/.agent
function getSystemAgentsFolder() {
  const home = os.homedir();
  if (fs.existsSync(path.join(home, ".agents"))) {
    return path.join(home, ".agents");
  }
  if (fs.existsSync(path.join(home, ".agent"))) {
    return path.join(home, ".agent");
  }
  return path.join(home, ".agents");
}

function printHelp() {
  const sysFolder = path.basename(getSystemAgentsFolder());
  console.log(`
${color.bold}${color.cyan}Agent Skills Installer${color.reset}
Install production-grade AI agent skills for Antigravity, Claude Code, Cursor, and more.

${color.bold}USAGE:${color.reset}
  ${color.green}npx @ayomide-philip/skills${color.reset}               Interactive wizard
  ${color.green}npx @ayomide-philip/skills add <skill>${color.reset}   Install a specific skill
  ${color.green}npx @ayomide-philip/skills list${color.reset}          List all available skills in this package

${color.bold}TARGET OPTIONS:${color.reset}
  ${color.yellow}--global, -g${color.reset}         Install to System Global (${color.dim}~/${sysFolder}/skills/<skill>${color.reset}) [default global]
  ${color.yellow}--antigravity${color.reset}        Install to Antigravity global (${color.dim}~/.gemini/antigravity/skills/<skill>${color.reset})
  ${color.yellow}--claude-global${color.reset}      Install to Claude Code global (${color.dim}~/.claude/skills/<skill>${color.reset})
  ${color.yellow}--workspace, -w${color.reset}      Install to project workspace (${color.dim}./.agent/skills/<skill>${color.reset})
  ${color.yellow}--claude${color.reset}             Install to local project Claude (${color.dim}./.claude/skills/<skill>${color.reset})
  ${color.yellow}--cursor${color.reset}             Install for Cursor / Windsurf rules (${color.dim}./.cursor/rules/<skill>${color.reset})
  ${color.yellow}--dest <path>, -d${color.reset}      Install to a custom directory path
  ${color.yellow}--force, -f${color.reset}            Overwrite destination if it already exists

${color.bold}EXAMPLES:${color.reset}
  $ npx @ayomide-philip/skills add prd --global
  $ npx @ayomide-philip/skills add prd --workspace
  $ npx @ayomide-philip/skills add prd --claude
  $ npx @ayomide-philip/skills add prd --dest ./my-custom-skills
`);
}

function prompt(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const children = fs.readdirSync(src);
    for (const child of children) {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function resolveTargetDir(targetType, skillName, customPath) {
  const cwd = process.cwd();
  const home = os.homedir();
  const systemAgentsFolder = getSystemAgentsFolder();

  switch (targetType) {
    case "system-global":
    case "global":
      return path.join(systemAgentsFolder, "skills", skillName);
    case "antigravity-global":
    case "antigravity":
      return path.join(home, ".gemini", "antigravity", "skills", skillName);
    case "claude-global":
      return path.join(home, ".claude", "skills", skillName);
    case "claude":
    case "claude-workspace":
      return path.join(cwd, ".claude", "skills", skillName);
    case "cursor":
      return path.join(cwd, ".cursor", "rules", skillName);
    case "custom":
      return path.resolve(cwd, customPath, skillName);
    case "workspace":
    default:
      return path.join(cwd, ".agent", "skills", skillName);
  }
}

async function installSkill(skillName, targetType, customPath, force) {
  const availableSkills = getAvailableSkills();
  if (!availableSkills.includes(skillName)) {
    console.error(
      `\n${color.red}Error: Skill '${skillName}' not found.${color.reset}`,
    );
    console.log(
      `Available skills: ${availableSkills.map((s) => `${color.cyan}${s}${color.reset}`).join(", ")}\n`,
    );
    process.exit(1);
  }

  const sourceDir = path.join(packageRoot, skillName);
  const targetDir = resolveTargetDir(targetType, skillName, customPath);

  if (fs.existsSync(targetDir)) {
    if (!force) {
      console.log(
        `\n${color.yellow}Notice:${color.reset} Destination already exists at:`,
      );
      console.log(`  ${color.dim}${targetDir}${color.reset}`);
      const answer = await prompt(`Do you want to overwrite it? (y/N): `);
      if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "yes") {
        console.log(`\n${color.cyan}Installation cancelled.${color.reset}\n`);
        return;
      }
    }
  }

  console.log(`\n${color.dim}Installing '${skillName}'...${color.reset}`);
  copyRecursiveSync(sourceDir, targetDir);

  console.log(
    `\n${color.green}${color.bold}✔ Successfully installed '${skillName}' skill!${color.reset}`,
  );
  console.log(
    `${color.dim}Destination:${color.reset} ${color.cyan}${targetDir}${color.reset}\n`,
  );

  console.log(`${color.bold}Next steps:${color.reset}`);
  if (targetType === "system-global" || targetType === "global") {
    console.log(
      `  • The skill is now active globally across all agents reading from your system skills directory (${color.cyan}${path.dirname(targetDir)}${color.reset}).`,
    );
  } else if (
    targetType === "antigravity-global" ||
    targetType === "antigravity"
  ) {
    console.log(
      `  • The skill is now active globally across all your Antigravity agent sessions.`,
    );
  } else if (targetType === "claude-global") {
    console.log(
      `  • The skill is now active globally across all your Claude Code sessions.`,
    );
  } else {
    console.log(
      `  • Commit the ${color.cyan}${path.relative(process.cwd(), targetDir)}${color.reset} directory to your project repository.`,
    );
  }
  console.log(
    `  • In chat, try: ${color.green}/prd${color.reset} or ${color.green}"Build a PRD for [your project]"${color.reset}\n`,
  );
}

async function runInteractive() {
  const availableSkills = getAvailableSkills();
  if (availableSkills.length === 0) {
    console.error(`${color.red}No skills available in package.${color.reset}`);
    process.exit(1);
  }

  console.log(
    `\n${color.bold}${color.cyan}⚡ Agent Skills Setup Wizard${color.reset}\n`,
  );

  let selectedSkill = availableSkills[0];
  if (availableSkills.length > 1) {
    console.log(`${color.bold}Available Skills:${color.reset}`);
    availableSkills.forEach((s, idx) => console.log(`  [${idx + 1}] ${s}`));
    const choice = await prompt(
      `\nSelect a skill to install (1-${availableSkills.length}) [default 1]: `,
    );
    const num = parseInt(choice, 10);
    if (!isNaN(num) && num >= 1 && num <= availableSkills.length) {
      selectedSkill = availableSkills[num - 1];
    }
  } else {
    console.log(`Selected skill: ${color.green}${selectedSkill}${color.reset}`);
  }

  const sysFolder = path.basename(getSystemAgentsFolder());

  console.log(
    `\n${color.bold}Where would you like to install '${selectedSkill}'?${color.reset}\n`,
  );
  console.log(
    `  ${color.bold}${color.magenta}SYSTEM GLOBAL (Available across all projects on your machine):${color.reset}`,
  );
  console.log(
    `  [1] System Global (${color.dim}~/${sysFolder}/skills/${selectedSkill}${color.reset}) ${color.green}(Recommended Global)${color.reset}`,
  );
  console.log(
    `  [2] Antigravity Global (${color.dim}~/.gemini/antigravity/skills/${selectedSkill}${color.reset})`,
  );
  console.log(
    `  [3] Claude Code Global (${color.dim}~/.claude/skills/${selectedSkill}${color.reset})\n`,
  );

  console.log(
    `  ${color.bold}${color.blue}LOCAL PROJECT (Current workspace directory only):${color.reset}`,
  );
  console.log(
    `  [4] Project Workspace (${color.dim}./.agent/skills/${selectedSkill}${color.reset}) ${color.green}(Recommended for repos)${color.reset}`,
  );
  console.log(
    `  [5] Claude Code Local (${color.dim}./.claude/skills/${selectedSkill}${color.reset})`,
  );
  console.log(
    `  [6] Cursor / Windsurf Rules (${color.dim}./.cursor/rules/${selectedSkill}${color.reset})\n`,
  );

  console.log(`  ${color.bold}CUSTOM:${color.reset}`);
  console.log(`  [7] Custom Path...`);

  const targetChoice = await prompt(
    `\nChoose target destination (1-7) [default 1]: `,
  );
  let targetType = "system-global";
  let customPath = "";

  if (targetChoice === "1" || targetChoice === "") targetType = "system-global";
  else if (targetChoice === "2") targetType = "antigravity-global";
  else if (targetChoice === "3") targetType = "claude-global";
  else if (targetChoice === "4") targetType = "workspace";
  else if (targetChoice === "5") targetType = "claude";
  else if (targetChoice === "6") targetType = "cursor";
  else if (targetChoice === "7") {
    targetType = "custom";
    customPath = await prompt(
      `Enter custom relative or absolute folder path: `,
    );
  }

  await installSkill(selectedSkill, targetType, customPath, false);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  if (args[0] === "list" || args[0] === "ls") {
    const skills = getAvailableSkills();
    console.log(
      `\n${color.bold}Available Skills (${skills.length}):${color.reset}`,
    );
    for (const skill of skills) {
      console.log(`  • ${color.green}${skill}${color.reset}`);
    }
    console.log(
      `\nRun ${color.cyan}npx @ayomide-philip/skills add <skill>${color.reset} to install.\n`,
    );
    return;
  }

  let targetType = "system-global";
  let customPath = "";
  let force = false;
  let skillToInstall = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "add" || arg === "install") {
      skillToInstall = args[i + 1];
      i++;
    } else if (arg === "--global" || arg === "-g") {
      targetType = "system-global";
    } else if (arg === "--antigravity") {
      targetType = "antigravity-global";
    } else if (arg === "--claude-global") {
      targetType = "claude-global";
    } else if (arg === "--workspace" || arg === "-w") {
      targetType = "workspace";
    } else if (arg === "--claude") {
      targetType = "claude";
    } else if (arg === "--cursor") {
      targetType = "cursor";
    } else if (arg === "--force" || arg === "-f") {
      force = true;
    } else if (arg === "--dest" || arg === "-d") {
      targetType = "custom";
      customPath = args[i + 1];
      i++;
    } else if (!arg.startsWith("-") && !skillToInstall) {
      skillToInstall = arg;
    }
  }

  if (skillToInstall) {
    await installSkill(skillToInstall, targetType, customPath, force);
  } else {
    await runInteractive();
  }
}

main().catch((err) => {
  console.error(`\n${color.red}Error:${color.reset}`, err.message);
  process.exit(1);
});
