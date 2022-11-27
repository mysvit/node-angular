// import replace from "replace-in-file";
// import {randomBytes} from "crypto";
//
//
// const optionsProd = {
//     files: 'src/environments/environment.prod.ts',
//     from: /webBuild: '(.*)'/g,
//     to: "webBuild: '" + buildVersion + "'",
//     allowEmptyPaths: false,
// };
//
// try {
//     let changedFilesProd = replace.sync(optionsProd);
//     if (changedFilesProd === 0) {
//         throw "Please make sure that file '" + optionsProd.files + "' has \"version: ''\"";
//     }
//     console.log('Build version set: ' + buildVersion);
//
// } catch (error) {
//     console.error('Error occurred:', error);
//     throw error
// }
//
// export function updateEnvironmentTokenKey() {
//     if (environment.production) {
//         environment.token_key = randomBytes(32).toString('hex')
//     }
// }
