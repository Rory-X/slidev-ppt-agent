const fs = require("node:fs");
const path = require("node:path");

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const [k, v] = a.slice(2).split('='); return [k, v || true]; })
);

if (!args.schema || !args.data) {
  console.error('Usage: node validate-schema.js --schema=<path> --data=<path>');
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(path.resolve(args.schema), 'utf-8'));
const data = JSON.parse(fs.readFileSync(path.resolve(args.data), 'utf-8'));

const errors = [];

function validate(value, schemaDef, jsonPath) {
  if (!schemaDef || typeof schemaDef !== 'object') return;

  // type check
  if (schemaDef.type) {
    const types = Array.isArray(schemaDef.type) ? schemaDef.type : [schemaDef.type];
    const actualType = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value);
    if (!types.includes(actualType)) {
      errors.push(`${jsonPath}: expected type ${types.join('|')}, got ${actualType}`);
      return;
    }
  }

  // enum check
  if (schemaDef.enum && !schemaDef.enum.includes(value)) {
    errors.push(`${jsonPath}: value "${value}" not in enum [${schemaDef.enum.join(', ')}]`);
  }

  // required check
  if (schemaDef.required && typeof value === 'object' && value !== null && !Array.isArray(value)) {
    for (const key of schemaDef.required) {
      if (!(key in value)) {
        errors.push(`${jsonPath}: missing required property "${key}"`);
      }
    }
  }

  // properties check
  if (schemaDef.properties && typeof value === 'object' && value !== null && !Array.isArray(value)) {
    for (const [key, propSchema] of Object.entries(schemaDef.properties)) {
      if (key in value) {
        validate(value[key], propSchema, `${jsonPath}.${key}`);
      }
    }
  }

  // items check (array)
  if (schemaDef.items && Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      validate(value[i], schemaDef.items, `${jsonPath}[${i}]`);
    }
  }

  // minItems / maxItems
  if (Array.isArray(value)) {
    if (schemaDef.minItems !== undefined && value.length < schemaDef.minItems) {
      errors.push(`${jsonPath}: array has ${value.length} items, minimum is ${schemaDef.minItems}`);
    }
    if (schemaDef.maxItems !== undefined && value.length > schemaDef.maxItems) {
      errors.push(`${jsonPath}: array has ${value.length} items, maximum is ${schemaDef.maxItems}`);
    }
  }

  // minLength / maxLength (string)
  if (typeof value === 'string') {
    if (schemaDef.minLength !== undefined && value.length < schemaDef.minLength) {
      errors.push(`${jsonPath}: string length ${value.length} < minLength ${schemaDef.minLength}`);
    }
  }
}

validate(data, schema, '$');

if (errors.length === 0) {
  console.log('Schema validation passed.');
} else {
  console.error(`Schema validation failed with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exitCode = 1;
}
