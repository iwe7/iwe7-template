import { of } from 'rxjs';
import { listDir } from 'list-dir-file';
import { compile } from 'handlebars';
import { extname, dirname } from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { map, switchMap, tap } from 'rxjs/operators';
import { relative, normalize, join } from '@angular-devkit/core';

export function iwe7Template<T>(
    sourcePath: string,
    destPath: string,
    options: T
) {
    const templateRoot = normalize(sourcePath);
    const outputPath = normalize(destPath);
    return listDir(sourcePath).pipe(
        map(res => normalize(res.replace(extname(res), ''))),
        map(res => relative(templateRoot, res)),
        switchMap(filename => {
            return of(readFileSync(join(templateRoot, filename + '.imeepos')).toString('utf-8')).pipe(
                map(fileContent => {
                    return {
                        filename: iwe7Compiler(filename, options),
                        content: iwe7Compiler(fileContent, options)
                    }
                }),
                tap(res => {
                    const file = join(outputPath, res.filename);
                    const filePath = dirname(file);
                    if (!existsSync(filePath)) {
                        mkdirSync(filePath);
                    }
                    writeFileSync(file, res.content);
                }),
                tap(res => console.log(`create:${res.filename}`))
            );
        })
    )
}

export function iwe7Compiler(source: string, options: any) {
    const template = compile(source);
    const tmpl = template(options);
    return tmpl;
}
