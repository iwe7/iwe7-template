"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const list_dir_file_1 = require("list-dir-file");
const handlebars_1 = require("handlebars");
const path_1 = require("path");
const fs_1 = require("fs");
const operators_1 = require("rxjs/operators");
const core_1 = require("@angular-devkit/core");
const logger = new core_1.logging.IndentLogger('create');
function iwe7Template(sourcePath, destPath, options) {
    const templateRoot = core_1.normalize(sourcePath);
    const outputPath = core_1.normalize(destPath);
    logger.subscribe(res => {
        console.log(`${core_1.terminal.red(`${res.name}`)} ${core_1.terminal.green(res.message)}`);
    });
    return list_dir_file_1.listDir(sourcePath).pipe(operators_1.map(res => core_1.normalize(res.replace(path_1.extname(res), ''))), operators_1.map(res => core_1.relative(templateRoot, res)), operators_1.switchMap(filename => {
        return rxjs_1.of(fs_1.readFileSync(core_1.join(templateRoot, filename + '.imeepos')).toString('utf-8')).pipe(operators_1.map(fileContent => {
            return {
                filename: iwe7Compiler(filename, options),
                content: iwe7Compiler(fileContent, options)
            };
        }), operators_1.tap(res => {
            const file = core_1.join(outputPath, res.filename);
            const filePath = path_1.dirname(file);
            if (!fs_1.existsSync(filePath)) {
                fs_1.mkdirSync(filePath);
            }
            fs_1.writeFileSync(file, res.content);
            logger.info(`${res.filename}`);
        }));
    }));
}
exports.iwe7Template = iwe7Template;
function iwe7Compiler(source, options) {
    const template = handlebars_1.compile(source);
    const tmpl = template(options);
    return tmpl;
}
exports.iwe7Compiler = iwe7Compiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTBCO0FBQzFCLGlEQUF3QztBQUN4QywyQ0FBcUM7QUFDckMsK0JBQXdDO0FBQ3hDLDJCQUF3RTtBQUN4RSw4Q0FBcUQ7QUFDckQsK0NBQW9GO0FBQ3BGLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVsRCxTQUFnQixZQUFZLENBQ3hCLFVBQWtCLEVBQ2xCLFFBQWdCLEVBQ2hCLE9BQVU7SUFFVixNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUNQLEdBQUcsZUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQ2xFLENBQUE7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sdUJBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQzNCLGVBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNwRCxlQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQ3ZDLHFCQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakIsT0FBTyxTQUFFLENBQUMsaUJBQVksQ0FBQyxXQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDckYsZUFBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2QsT0FBTztnQkFDSCxRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQzthQUM5QyxDQUFBO1FBQ0wsQ0FBQyxDQUFDLEVBQ0YsZUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ04sTUFBTSxJQUFJLEdBQUcsV0FBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsTUFBTSxRQUFRLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLGNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QjtZQUNELGtCQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUNMLENBQUE7QUFDTCxDQUFDO0FBbkNELG9DQW1DQztBQUVELFNBQWdCLFlBQVksQ0FBQyxNQUFjLEVBQUUsT0FBWTtJQUNyRCxNQUFNLFFBQVEsR0FBRyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBSkQsb0NBSUMifQ==