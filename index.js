"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const list_dir_file_1 = require("list-dir-file");
const handlebars_1 = require("handlebars");
const path_1 = require("path");
const fs_1 = require("fs");
const operators_1 = require("rxjs/operators");
const core_1 = require("@angular-devkit/core");
function iwe7Template(sourcePath, destPath, options) {
    const templateRoot = core_1.normalize(sourcePath);
    const outputPath = core_1.normalize(destPath);
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
        }), operators_1.tap(res => console.log(`create:${res.filename}`)));
    }));
}
exports.iwe7Template = iwe7Template;
function iwe7Compiler(source, options) {
    const template = handlebars_1.compile(source);
    const tmpl = template(options);
    return tmpl;
}
exports.iwe7Compiler = iwe7Compiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTBCO0FBQzFCLGlEQUF3QztBQUN4QywyQ0FBcUM7QUFDckMsK0JBQXdDO0FBQ3hDLDJCQUF3RTtBQUN4RSw4Q0FBcUQ7QUFDckQsK0NBQWlFO0FBRWpFLFNBQWdCLFlBQVksQ0FDeEIsVUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsT0FBVTtJQUVWLE1BQU0sWUFBWSxHQUFHLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxPQUFPLHVCQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUMzQixlQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDcEQsZUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUN2QyxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sU0FBRSxDQUFDLGlCQUFZLENBQUMsV0FBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JGLGVBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNkLE9BQU87Z0JBQ0gsUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO2dCQUN6QyxPQUFPLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7YUFDOUMsQ0FBQTtRQUNMLENBQUMsQ0FBQyxFQUNGLGVBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNOLE1BQU0sSUFBSSxHQUFHLFdBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sUUFBUSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsZUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QixjQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkI7WUFDRCxrQkFBYSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLEVBQ0YsZUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQ3BELENBQUM7SUFDTixDQUFDLENBQUMsQ0FDTCxDQUFBO0FBQ0wsQ0FBQztBQTlCRCxvQ0E4QkM7QUFFRCxTQUFnQixZQUFZLENBQUMsTUFBYyxFQUFFLE9BQVk7SUFDckQsTUFBTSxRQUFRLEdBQUcsb0JBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUpELG9DQUlDIn0=