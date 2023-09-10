// routeGenerator.ts
import { glob } from "glob";
import fs from "fs-extra";
import path from "path";

interface ScreenConfig {
  title: string;
  path: string;
  order?: number;
  component: string;
}

export function generateJSON(
  screensGlobPattern: string,
  jsonPath: string
): void {
  // Get all .tsx files in the screens directory
  const files = glob.sync(screensGlobPattern);

  const routes: ScreenConfig[] = files
    .map((file) => {
      // Read the file content
      const content = fs.readFileSync(file, "utf-8");

      // Extract the @screenConfig comment
      const match = content.match(/@screenConfig:?\s*(\{.+?\})?/);
      if (!match) {
        return null;
      }

      // Get the component name from the file name
      const fileName = file.split("/").pop();
      if (fileName) {
        const componentName = fileName.replace(".tsx", "");

        let config;

        if (match[1]) {
          // Parse the comment as JSON and add the component name
          config = JSON.parse(match[1]);
          config.component = componentName;
        } else {
          // Generate title and route from component name
          config = {
            title: `${componentName.toLowerCase()}-page-title`,
            path: "/" + componentName.toLowerCase(),
            component: componentName,
          };
        }

        return config;
      }

      return null;
    })
    .filter(Boolean); // Remove null values

  // Sort routes based on order property
  routes.sort((a, b) => {
    if (a.order == null) return 1; // a comes after b
    if (b.order == null) return -1; // a comes before b
    return a.order - b.order; // sort by order in ascending order
  });

  // Write the routes to a JSON file
  try {
    // Ensure directory exists
    fs.ensureDirSync(path.dirname(jsonPath));

    // Write the routes to a JSON file
    fs.writeJsonSync(jsonPath, routes);
  } catch (error) {
    console.error("Failed to write JSON file:", error);
  }
}
