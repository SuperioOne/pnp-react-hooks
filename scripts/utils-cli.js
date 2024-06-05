#!/usr/bin/env node

import fs, { copyFileSync, rmdirSync, mkdirSync } from "node:fs";
import { argv } from "node:process";
import { join, parse } from "node:path";

function delete_types(target = "./types") {
  fs.rmdir("./types", (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      process.exit();
    }
  });
}

/**
 * @param {string} source_path
 * @param {string} target_path
 */
function copy_extra_types(source_path, target_path) {
  try {
    console.log("Cloning custom types.");

    const files = fs
      .readdirSync(source_path, {
        recursive: true,
      })
      .filter((/** @type{string | Buffer}  **/ e) => {
        const path = parse(e);
        return path.ext === ".ts" && path.base.endsWith(".d.ts");
      });

    for (const file of files) {
      const source_file = join(source_path, file);
      const target_file = join(target_path, file);
      const base_dir = parse(target_file).dir;

      mkdirSync(base_dir, { recursive: true });

      console.log(`Cloning ${source_file} -> ${target_file}`);
      copyFileSync(source_file, target_file);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

copy_extra_types(argv[2], argv[3]);
