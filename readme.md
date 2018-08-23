```ts
import { join } from "path";
import { iwe7Template } from 'iwe7-template';

const options = {
    version: '1.0',
    name: 'template'
};
const outputPath = join(process.cwd(), 'src/addons/iwe7-demo');
const templateRoot = join(__dirname, '__file__');
iwe7Template(templateRoot, outputPath, options).subscribe();
```
