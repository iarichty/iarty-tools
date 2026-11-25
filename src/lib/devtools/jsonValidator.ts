/**
 * JSON Validator with syntax & schema error diagnostics.
 */

export interface JsonErrorDetail {
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning';
    snippet?: string;
    hint?: string;
}

export interface ValidationReport {
    isValid: boolean;
    errors: JsonErrorDetail[];
    warnings: JsonErrorDetail[];
    stats: {
        totalErrors: number;
        totalWarnings: number;
    };
    parsedData?: unknown;
}

export function validateJsonSyntax(jsonStr: string): ValidationReport {
    const errors: JsonErrorDetail[] = [];
    const warnings: JsonErrorDetail[] = [];

    if (!jsonStr.trim()) {
        return {
            isValid: false,
            errors: [{ line: 1, column: 1, message: 'JSON input is empty', severity: 'error' }],
            warnings: [],
            stats: { totalErrors: 1, totalWarnings: 0 }
        };
    }

    try {
        const parsed = JSON.parse(jsonStr);

        // Check for trailing commas or other common issues with heuristics
        if (/,\s*[}\]]/.test(jsonStr)) {
            warnings.push({
                line: 1,
                column: 1,
                message: 'Possible trailing comma detected (some environments reject this).',
                severity: 'warning'
            });
        }

        return {
            isValid: true,
            errors: [],
            warnings,
            stats: { totalErrors: 0, totalWarnings: warnings.length },
            parsedData: parsed
        };
    } catch (err: unknown) {
        const rawMessage = err instanceof Error ? err.message : 'Invalid JSON';
        let line = 1;
        let column = 1;

        // Try extracting line and column from error message
        const posMatch = rawMessage.match(/position\s+(\d+)/i);
        const lineColMatch = rawMessage.match(/line\s+(\d+)\s+column\s+(\d+)/i);

        if (lineColMatch) {
            line = parseInt(lineColMatch[1], 10);
            column = parseInt(lineColMatch[2], 10);
        } else if (posMatch) {
            const pos = parseInt(posMatch[1], 10);
            const prefix = jsonStr.slice(0, pos);
            const lines = prefix.split('\n');
            line = lines.length;
            column = lines[lines.length - 1].length + 1;
        }

        // Hints
        let hint = 'Check JSON syntax around this position.';
        if (/unexpected token/i.test(rawMessage)) {
            if (rawMessage.includes("'") || jsonStr.includes("'")) {
                hint = 'Single quotes are invalid in JSON. Use double quotes ("key": "value").';
            } else if (rawMessage.includes(',')) {
                hint = 'Check for trailing comma or missing comma between elements.';
            } else if (/unexpected token \}/i.test(rawMessage) || /unexpected token \]/i.test(rawMessage)) {
                hint = 'Check for trailing commas before closing braces or brackets.';
            }
        } else if (/unexpected end of/i.test(rawMessage)) {
            hint = 'Unclosed bracket or brace. Ensure all { and [ have matching } and ].';
        }

        const lines = jsonStr.split('\n');
        const snippetLine = lines[line - 1] || '';
        const snippet = snippetLine.trim();

        errors.push({
            line,
            column,
            message: rawMessage,
            severity: 'error',
            snippet,
            hint
        });

        return {
            isValid: false,
            errors,
            warnings,
            stats: { totalErrors: 1, totalWarnings: 0 }
        };
    }
}

interface JsonSchemaNode {
    type?: string | string[];
    required?: string[];
    properties?: Record<string, JsonSchemaNode>;
    items?: JsonSchemaNode;
}

export function validateJsonSchema(data: unknown, schemaObj: unknown): ValidationReport {
    const errors: JsonErrorDetail[] = [];
    const warnings: JsonErrorDetail[] = [];

    function checkNode(node: unknown, schemaInput: unknown, path: string) {
        if (!schemaInput || typeof schemaInput !== 'object') return;
        const schema = schemaInput as JsonSchemaNode;

        if (schema.type) {
            const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
            let actualType: string = typeof node;
            if (node === null) actualType = 'null';
            else if (Array.isArray(node)) actualType = 'array';

            if (!expectedTypes.includes(actualType)) {
                errors.push({
                    line: 1,
                    column: 1,
                    message: `Field '${path || 'root'}' expects type ${expectedTypes.join('/')}, but got ${actualType}.`,
                    severity: 'error'
                });
            }
        }

        if (schema.required && typeof node === 'object' && node !== null && !Array.isArray(node)) {
            for (const reqKey of schema.required) {
                if (!(reqKey in node)) {
                    errors.push({
                        line: 1,
                        column: 1,
                        message: `Missing required property '${path ? `${path}.${reqKey}` : reqKey}'.`,
                        severity: 'error'
                    });
                }
            }
        }

        if (schema.properties && typeof node === 'object' && node !== null && !Array.isArray(node)) {
            for (const [key, propSchema] of Object.entries(schema.properties)) {
                if (key in node) {
                    checkNode((node as Record<string, unknown>)[key], propSchema, path ? `${path}.${key}` : key);
                }
            }
        }

        if (schema.items && Array.isArray(node)) {
            node.forEach((item, idx) => {
                checkNode(item, schema.items, `${path}[${idx}]`);
            });
        }
    }

    try {
        checkNode(data, schemaObj, '');
    } catch (e: unknown) {
        errors.push({
            line: 1,
            column: 1,
            message: `Schema execution error: ${(e instanceof Error ? e.message : String(e))}`,
            severity: 'error'
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        stats: { totalErrors: errors.length, totalWarnings: warnings.length },
        parsedData: data
    };
}
