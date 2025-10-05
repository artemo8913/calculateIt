import fs from "node:fs";
import ExcelJS from "exceljs";
import { InputFile } from "grammy";

import { BotContext } from "@/1shared/bot";
import db, { thoughtsTable, anxietiesTable, thanksTable } from "@/1shared/database";

const EXPORT_PATH = "./export";

export async function exportDatabase(ctx: BotContext) {
    if (!ctx?.from?.id) {
        throw new Error("Export database: ctx.from.id not exist")
    }
    const workbook = new ExcelJS.Workbook();

    const [thoughts, anxieties, thanks] = await Promise.all([
        db.select().from(thoughtsTable),
        db.select().from(anxietiesTable),
        db.select().from(thanksTable),
    ]);

    const filePath = `${EXPORT_PATH}/${ctx.from.id}.xlsx`;

    workbook.addWorksheet("thoughts").addRows(thoughts.map(Object.values));
    workbook.addWorksheet("anxieties").addRows(anxieties.map(Object.values));
    workbook.addWorksheet("thanks").addRows(thanks.map(Object.values));

    if (!fs.existsSync(EXPORT_PATH)) {
        fs.mkdirSync(EXPORT_PATH);
    }

    await workbook.xlsx.writeFile(filePath);

    await ctx.replyWithDocument(new InputFile(filePath));

    await new Promise<void>((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}