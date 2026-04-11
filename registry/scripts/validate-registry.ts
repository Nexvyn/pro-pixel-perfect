/* eslint-disable no-console */
/**
 * Registry Validation Script
 * Validates all registry JSON files to ensure:
 * - JSON schema compliance
 * - Referenced file paths exist
 * - Dependencies are valid
 *
 * Run with: npx tsx scripts/validate-registry.ts
 * Or: npm run validate:registry
 */

import fs from "fs/promises"
import path from "path"

import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..", "..")

interface RegistryFile {
  path: string
  type: string
  content?: string
  target?: string
}

interface RegistryItem {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  tailwind?: Record<string, unknown>
  cssVars?: Record<string, unknown>
}

function validateSchema(item: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const obj = item as Record<string, unknown>

  if (!obj.name || typeof obj.name !== "string") {
    errors.push("Missing or invalid 'name' field")
  }
  if (!obj.type || typeof obj.type !== "string") {
    errors.push("Missing or invalid 'type' field")
  }
  if (!Array.isArray(obj.files)) {
    errors.push("Missing or invalid 'files' field")
  }

  const validTypes = [
    "registry:ui",
    "registry:lib",
    "registry:example",
    "registry:icon",
    "registry:svg-loader",
    "registry:file",
    "registry:style",
    "registry:theme",
    "registry:block",
  ]
  if (obj.type && !validTypes.includes(obj.type as string)) {
    errors.push(`Invalid type: ${obj.type}. Must be one of: ${validTypes.join(", ")}`)
  }

  if (Array.isArray(obj.files)) {
    obj.files.forEach((file: unknown, index: number) => {
      const fileObj = file as Record<string, unknown>
      if (!fileObj.path || typeof fileObj.path !== "string") {
        errors.push(`File[${index}]: Missing or invalid 'path' field`)
      }
      if (!fileObj.type || typeof fileObj.type !== "string") {
        errors.push(`File[${index}]: Missing or invalid 'type' field`)
      }
      if (fileObj.type && !validTypes.includes(fileObj.type as string)) {
        errors.push(`File[${index}]: Invalid type: ${fileObj.type}`)
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(rootDir, filePath)
    await fs.access(fullPath)
    return true
  } catch {
    return false
  }
}

async function validateRegistryItem(
  name: string,
  item: RegistryItem
): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
  const errors: string[] = []
  const warnings: string[] = []

  const schemaResult = validateSchema(item)
  if (!schemaResult.valid) {
    errors.push(...schemaResult.errors)
  }

  if (item.files && Array.isArray(item.files)) {
    for (const file of item.files) {
      if (file.path) {
        const exists = await fileExists(file.path)
        if (!exists) {
          errors.push(`File path does not exist: ${file.path}`)
        }
      }
    }
  }

  if (item.registryDependencies && Array.isArray(item.registryDependencies)) {
    for (const dep of item.registryDependencies) {
      let found = false
      const types = ["components", "icons", "loaders"]
      for (const type of types) {
        const depPath = path.join(rootDir, "registry", "manifests", type, `${dep}.json`)
        try {
          await fs.access(depPath)
          found = true
          break
        } catch {
          // Dependency search failed
        }
      }

      if (!found) {
        warnings.push(`Registry dependency may not exist: ${dep}`)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

async function getJsonFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name)
      return entry.isDirectory() ? getJsonFiles(res) : res
    })
  )
  return Array.prototype
    .concat(...files)
    .filter((f) => f.endsWith(".json") && !f.endsWith("schema.json"))
}

async function validateRegistry(): Promise<boolean> {
  const manifestsDir = path.join(rootDir, "registry", "manifests")
  let allValid = true

  try {
    const jsonFiles = await getJsonFiles(manifestsDir)

    console.log(`\nValidating ${jsonFiles.length} registry files...\n`)

    for (const filePath of jsonFiles) {
      const name = path.basename(filePath, ".json")

      try {
        let content = await fs.readFile(filePath, "utf-8")
        if (content.charCodeAt(0) === 0xfeff) {
          content = content.slice(1)
        }
        const item = JSON.parse(content) as RegistryItem

        console.log(`  ${name}...`)

        const result = await validateRegistryItem(name, item)

        if (result.errors.length > 0) {
          console.error(`  Errors:`)
          result.errors.forEach((error) => console.error(`     - ${error}`))
          allValid = false
        }

        if (result.warnings.length > 0) {
          console.warn(`  Warnings:`)
          result.warnings.forEach((warning) => console.warn(`     - ${warning}`))
        }

        if (result.valid && result.warnings.length === 0) {
          console.log(`  [OK]\n`)
        } else if (result.valid) {
          console.log(`  [OK] (with warnings)\n`)
        }
      } catch (error) {
        console.error(`  Failed to parse JSON: ${error}`)
        allValid = false
      }
    }

    if (allValid) {
      console.log("All registry files are valid!\n")
    } else {
      console.error("Some registry files have errors. Please fix them before proceeding.\n")
    }

    return allValid
  } catch (error) {
    console.error(`Failed to read manifests directory: ${error}`)
    return false
  }
}

validateRegistry()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("Validation failed:", error)
    process.exit(1)
  })
