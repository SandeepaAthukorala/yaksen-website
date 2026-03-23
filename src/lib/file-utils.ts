import fs from 'fs/promises';
import path from 'path';

/**
 * Safely read a JSON file from the data directory
 */
export async function readJsonFile<T>(relativePath: string): Promise<T> {
    const filePath = path.join(process.cwd(), 'src', 'data', relativePath);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
}

/**
 * Safely write a JSON file to the data directory
 * Creates a backup before writing
 */
export async function writeJsonFile<T>(
    relativePath: string,
    data: T,
    createBackup = true
): Promise<void> {
    const filePath = path.join(process.cwd(), 'src', 'data', relativePath);

    // Create backup if file exists
    if (createBackup) {
        try {
            const exists = await fs.access(filePath).then(() => true).catch(() => false);
            if (exists) {
                const backupPath = `${filePath}.backup`;
                await fs.copyFile(filePath, backupPath);
            }
        } catch (error) {
            console.warn('Failed to create backup:', error);
        }
    }

    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    // Write file with pretty formatting
    const jsonContent = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonContent, 'utf-8');
}

/**
 * Check if code is running on localhost
 */
export function isLocalhost(host: string | null): boolean {
    if (!host) return false;
    return (
        host.includes('localhost') ||
        host.includes('127.0.0.1') ||
        host.includes('[::1]')
    );
}
