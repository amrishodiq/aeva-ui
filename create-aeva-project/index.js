#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import { blue, green, red, reset, yellow } from 'kolorist';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2), { string: ['_'] });
const cwd = process.cwd();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES = [
    {
        name: 'template-ts',
        display: 'TypeScript',
        color: blue
    },
    {
        name: 'template-js',
        display: 'JavaScript',
        color: yellow
    }
];

async function init() {
    let targetDir = argv._[0];
    let template = argv.template || argv.t;

    const defaultProjectName = targetDir || 'aeva-app';

    let result = {};

    try {
        result = await prompts(
            [
                {
                    type: targetDir ? null : 'text',
                    name: 'projectName',
                    message: reset('Project name:'),
                    initial: defaultProjectName,
                    onState: (state) => {
                        targetDir = state.value.trim() || defaultProjectName;
                    }
                },
                {
                    type: template && TEMPLATES.some(t => t.name === template) ? null : 'select',
                    name: 'template',
                    message: reset('Select a template:'),
                    initial: 0,
                    choices: TEMPLATES.map((t) => ({
                        title: t.color(t.display || t.name),
                        value: t.name
                    }))
                }
            ],
            {
                onCancel: () => {
                    throw new Error(red('✖') + ' Operation cancelled');
                }
            }
        );
    } catch (cancelled) {
        console.log(cancelled.message);
        return;
    }

    const { projectName, template: selectedTemplate } = result;
    const root = path.join(cwd, targetDir);

    if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true });
    }

    const templateDir = path.resolve(__dirname, 'templates', selectedTemplate || template);

    console.log(`\nScaffolding project in ${blue(root)}...`);

    const write = (file, targetFile, content) => {
        const targetPath = path.join(root, targetFile || file);
        if (content) {
            fs.writeFileSync(targetPath, content);
        } else {
            fs.copySync(path.join(templateDir, file), targetPath);
        }
    };

    const files = fs.readdirSync(templateDir);
    for (const file of files) {
        let targetFileName = file;
        if (file === '_gitignore') {
            targetFileName = '.gitignore';
        }

        if (file === 'package.json') {
            const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, file), 'utf-8'));
            pkg.name = path.basename(root);
            write(file, targetFileName, JSON.stringify(pkg, null, 2));
        } else {
            write(file, targetFileName);
        }
    }

    console.log(`\n${green('Done!')} Now run:\n`);
    if (root !== cwd) {
        console.log(`  cd ${path.relative(cwd, root)}`);
    }
    console.log(`  npm install`);
    console.log(`  npm run dev\n`);
}

init().catch((e) => {
    console.error(e);
});
