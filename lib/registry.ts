import fs from "fs/promises"
import path from "path"

import registryConfig from "@/config/registry.json"

interface RegistryFile {
  path?: string
  type?: string
  content?: string
}

interface RegistryItem {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  tailwind?: Record<string, unknown>
  cssVars?: Record<string, unknown>
}

const rootDir = process.cwd()
const componentSourceDirectories = registryConfig.componentSourceDirectories as string[]

function toOsPath(relativePath: string) {
  return path.join(rootDir, relativePath)
}

function withTsExtensions(relativePath: string) {
  if (path.extname(relativePath)) {
    return [relativePath]
  }

  return [`${relativePath}.tsx`, `${relativePath}.ts`]
}

async function fileExists(relativePath: string) {
  try {
    await fs.access(toOsPath(relativePath))
    return true
  } catch {
    return false
  }
}

async function readFileIfExists(relativePath: string) {
  if (!(await fileExists(relativePath))) {
    return null
  }

  return fs.readFile(toOsPath(relativePath), "utf-8")
}

function getCanonicalComponentCandidates(name: string) {
  return componentSourceDirectories.flatMap((directory) => withTsExtensions(`${directory}/${name}`))
}

function getManifestRepairCandidates(itemName: string, filePath?: string) {
  const candidates = new Set<string>()

  if (filePath) {
    candidates.add(filePath.replace(/\\/g, "/"))

    const basename = path.basename(filePath, path.extname(filePath))

    for (const candidate of getCanonicalComponentCandidates(basename)) {
      candidates.add(candidate)
    }

    if (basename !== itemName) {
      for (const candidate of getCanonicalComponentCandidates(itemName)) {
        candidates.add(candidate)
      }
    }
  } else {
    for (const candidate of getCanonicalComponentCandidates(itemName)) {
      candidates.add(candidate)
    }
  }

  return [...candidates]
}

async function hydrateFiles(itemName: string, files: RegistryFile[] = []) {
  const hydratedFiles: RegistryFile[] = []

  for (const file of files) {
    const candidates = getManifestRepairCandidates(itemName, file.path)

    let resolvedPath = file.path
    let content = file.content

    for (const candidate of candidates) {
      const candidateContent = await readFileIfExists(candidate)

      if (candidateContent) {
        resolvedPath = candidate
        content = candidateContent
        break
      }
    }

    hydratedFiles.push({
      ...file,
      path: resolvedPath,
      content,
    })
  }

  return hydratedFiles
}

async function readRegistryJson(relativePath: string) {
  try {
    const data = await fs.readFile(toOsPath(relativePath), "utf-8")
    return JSON.parse(data) as RegistryItem
  } catch {
    return null
  }
}

/**
 * Get a registry item by name.
 * Primary source: registry manifests.
 * Secondary source: published public registry JSON.
 * Final fallback: canonical component source directories from config.
 */
export async function getRegistryItem(name: string): Promise<RegistryItem | null> {
  const manifestPaths = [
    `${registryConfig.registryComponentsDirectory}/${name}.json`,
    `${registryConfig.publicRegistryDirectory}/${name}.json`,
  ]

  for (const manifestPath of manifestPaths) {
    const manifest = await readRegistryJson(manifestPath)

    if (!manifest) {
      continue
    }

    return {
      ...manifest,
      files: await hydrateFiles(name, manifest.files),
    }
  }

  for (const candidate of getCanonicalComponentCandidates(name)) {
    const content = await readFileIfExists(candidate)

    if (content) {
      return {
        name,
        type: "registry:ui",
        files: [{ path: candidate, type: "registry:ui", content }],
      }
    }
  }

  return null
}

export async function hasRegistryItem(name: string): Promise<boolean> {
  return (await getRegistryItem(name)) !== null
}
