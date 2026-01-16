import { confirm, input } from "@inquirer/prompts";
import { consola } from "consola";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { packageDirectory } from "package-directory";
import { join } from "path";

(async () => {
  const rootDirectory = await packageDirectory();

  if (!rootDirectory) {
    consola.error("You're not inside the project directory.");
    return;
  }

  const outputFolder = join(rootDirectory, "content/projects");

  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder, { recursive: true });
    consola.warn(
      `Output folder does not exist. It now exists at ${outputFolder}`,
    );
  }

  try {
    const projectName = await input({ message: "Project name (or slug):" });
    const projectDisplayName = await input({
      message: "Project display name (optional):",
      default: "",
    });
    const projectDescription = await input({ message: "Project description:" });
    const isDraft = await confirm({
      message: "Is this a draft?",
      default: true,
    });
    const projectUrl = await input({
      message: "Project URL (optional):",
      default: "",
    });

    const projectData = {
      description: projectDescription,
      isDraft,
      name: projectName,
      displayName: projectDisplayName || undefined,
      url: projectUrl || undefined,
    };

    const filepath = join(outputFolder, `${projectName}.json`);

    writeFileSync(filepath, JSON.stringify(projectData, null, 2));

    console.log();
    consola.success(`Project '${projectName}' created at ${filepath}`);
  } catch (error) {
    consola.error("Failed to create project:", error);
  }
})();
