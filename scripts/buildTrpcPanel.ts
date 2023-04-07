import fs from "fs";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "../src/ts/trpc.js";

const folderPath = 'src/pages/trpc';
fs.mkdirSync(folderPath, { recursive: true } );

const trpcPanelHtml = renderTrpcPanel(appRouter, { url: "/" });
fs.writeFileSync(folderPath + "/index.html", trpcPanelHtml);