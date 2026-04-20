import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { PLATFORM_REGISTRY, PLATFORM_KEYS } from './command-registrar.js';

export function detectPlatforms(cwd) {
  const detected = [];

  for (const key of PLATFORM_KEYS) {
    const config = PLATFORM_REGISTRY[key];
    const dirExists = existsSync(join(cwd, config.dir));

    if (config.defaultSelected || dirExists) {
      detected.push(key);
    }
  }

  return detected;
}
