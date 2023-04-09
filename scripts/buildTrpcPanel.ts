import fs from "fs";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "../src/ts/trpc.js";

const folderPath = 'src/pages/trpc';
fs.mkdirSync(folderPath, { recursive: true });

const trpcPanelHtml = renderTrpcPanel(appRouter, { url: "/trpc/api" });
fs.writeFileSync(folderPath + "/index.html", trpcPanelHtml);

const splitTrpcPanelIntoIndexJsAndIndexHtml = () => {
    // Extract index.html from the file, because of a roll up error? See https://discord.com/channels/830184174198718474/1093693121755365486/1094065490088960131
    fs.readFile('src/pages/trpc/index.html', 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        }
    
        // Extract the contents of the <script> tag
        const startIndex = data.indexOf('<script>') + '<script>'.length;
        const endIndex = data.indexOf('</script>');
        const scriptCode = data.substring(startIndex, endIndex);
    
        // Remove the <script> tag and its contents from the HTML file
        const updatedData = data.replace(scriptCode, '');
    
        // Write the updated HTML file
        fs.writeFile('src/pages/trpc/index.html', updatedData, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    
        // Write the script code to a separate JavaScript file
        fs.writeFile('public/trpc/index.js', scriptCode, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    
        const updatedDataWithScript = updatedData.replace('<script>', '<script src="trpc/index.js">');
    
        // Write the updated HTML file with the new script reference
        fs.writeFile('src/pages/trpc/index.html', updatedDataWithScript, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });    
}

splitTrpcPanelIntoIndexJsAndIndexHtml();