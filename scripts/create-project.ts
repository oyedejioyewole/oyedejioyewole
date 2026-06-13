import { confirm, input } from "@inquirer/prompts";
import { consola } from "consola";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { packageDirectory } from "package-directory";
import { join } from "node:path";
import { dump as dumpYaml } from "js-yaml";

(async () => {
  const rootDirectory = await packageDirectory();

  if (!rootDirectory) {
    consola.error("You're not inside the project directory.");
    return;
  }

  const outputFolder = join(rootDirectory, "src/data/projects");

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

    // const filepath = join(outputFolder, `${projectName}.json`);
    const filepath = join(outputFolder, `${projectName}.yml`);

    writeFileSync(filepath, dumpYaml(projectData));

    console.log();
    consola.success(`Project '${projectName}' created at ${filepath}`);
  } catch (error) {
    consola.error("Failed to create project:", error);
  }
})();
