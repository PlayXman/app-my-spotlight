const fs = require("fs");
const fsp = fs.promises;
const packageJson = require("./package.json");
const archiver = require("archiver");
const del = require("del");

const DIST_PATH = "./dist";
const BUILD_PATH = "./build";

class PostBuild {
  /**
   * Updates manifest file for extension registration
   * @returns {Promise<void>}
   */
  static async updateManifest() {
    try {
      const manifestPath = DIST_PATH + "/manifest.json";

      console.log("Manifest is being updated...");
      const fileContent = await fsp.readFile(manifestPath, "utf8");
      const manifest = JSON.parse(fileContent);

      manifest.version = packageJson.version;
      manifest.description = packageJson.description;
      manifest.homepage_url = packageJson.homepage;

      await fsp.writeFile(manifestPath, JSON.stringify(manifest), "utf8");
      console.log("...Manifest was modified.");
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Zips built files for extension upload
   * @returns {Promise<void>}
   */
  static async zipFiles() {
    try {
      const zipPath = BUILD_PATH + "/package.zip";

      await del(BUILD_PATH);
      await fsp.mkdir(BUILD_PATH);

      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", {
        zlib: {
          level: 9
        }
      });

      output.on("close", function() {
        console.log("Zip created.");
      });

      archive.on("error", function(err) {
        throw err;
      });
      archive.pipe(output);
      archive.directory(DIST_PATH + "/", false);
      archive.finalize();
    } catch (err) {
      console.log(err);
    }
  }
}

//run
PostBuild.updateManifest().then(() => {
  PostBuild.zipFiles();
});
