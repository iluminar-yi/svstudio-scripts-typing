# svstudio-scripts-typing

A TypeScript typing declaration for Synthesizer V Pro Scripting.

Type [declaration](/global.d.ts) is written based on https://dreamtonics.com/synthv/scripting/.
[Test files](/tests) based on official examples: https://github.com/Dreamtonics/svstudio-scripts

## Quick Start
At this time, the declaration file is not well honed to be published to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped),
but it can already be used in JavaScript and TypeScript projects.

### TypeScript
1. Create a NodeJS project
1. Copy over [`global.d.ts`](/global.d.ts) (required) and 
[`tsconfig.json`](/tsconfig.json) (optional, feel free to customize to your needs) into your project.
1. Install TypeScript compiler
    ```bash
    npm i -D typescript 
    ```
1. Start writing your TypeScript code in Script Mode (i.e. Do not `import` or `export` for the time being).
Note that you have to implement two functions (which cannot be enforced via TypeScript).
    ```typescript
    // Queried by Synthesizer V Pro for your plugin metadata.
    function getClientInfo(): ClientInfo;
    // Entrypoint function (where the code starts execution)
    function main(): void;
    ```
1. Ensure that when your script needs to exit, call `SV.finish()`;
1. To compile, run:
    ```bash
    # In the project root folder
    ./node_modules/.bin/tsc
    ```
   
### JavaScript
Even though `typescript` is not going to work as well with `.js` files, it still helps to have type checking.
Feel free to follow the instructions for [TypeScript](#TypeScript) as `tsconfig.json` is configured to allow JavaScript files.
Note that much of the constraints still apply to your JavaScript project.

### Install as a Module
Technically, this repo can be installed by npm as one of the `devDependencies`,
but glitches happen because it's not well configured.
1. Install dependencies
    ```bash
    npm i -D typescript https://github.com/iluminar-yi/svstudio-scripts-typing.git
    ```
1. Include in your TypeScript file:
    ```typescript
    import 'svstudio-scripts-typing';
    ```
