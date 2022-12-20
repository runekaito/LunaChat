"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const request = require("request");
const export_1 = require("./export");
const event_1 = require("bdsx/event");
const romaji_hira_convert_1 = require("./romaji-hira-convert");
const packetids_1 = require("bdsx/bds/packetids");
const launcher_1 = require("bdsx/launcher");
const common_1 = require("bdsx/common");
const command_1 = require("bdsx/command");
const command_2 = require("bdsx/bds/command");
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((pkt) => {
    const data_arr = JSON.parse(fs.readFileSync(export_1.ConfigJsonPath, "utf8")).masterData;
    for (const i in data_arr) {
        if (data_arr[i].japan == 0)
            return;
    }
    const hira = (0, romaji_hira_convert_1.default)(pkt.message);
    const name = pkt.name;
    const message = pkt.message;
    const fileUrl = encodeURI(`http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${hira}`);
    request
        .get(fileUrl)
        .pipe(fs.createWriteStream(export_1.ChatTextPath))
        .on("close", async () => {
        const result = fs.readFileSync(export_1.ChatTextPath, "utf-8").toString();
        let check = true;
        let results = [];
        for (let i = 3; i < result.split(`"`).length; i = i + 12) {
            results.push(result.split(`"`)[i]);
            if (!check) {
                i = 4;
                check = false;
            }
        }
        let text = "<" + name + ">" + message + " §6( " + results.join("") + " )";
        const pls = launcher_1.bedrockServer.level.getPlayers();
        for (const pl of pls) {
            pl.sendMessage(text);
        }
    });
    return common_1.CANCEL;
});
command_1.command
    .register("jp", "Japanese on/off", command_2.CommandPermissionLevel.Operator)
    .overload((p, o, op) => {
    const jsi = JSON.parse(fs.readFileSync(export_1.ConfigJsonPath, "utf8")).masterData;
    const data_arr = [];
    for (const item of jsi) {
        item.japan = p.enum;
        data_arr.push(item);
    }
    const masterData = JSON.stringify({ masterData: data_arr }, null, " ");
    fs.writeFileSync(export_1.ConfigJsonPath, masterData);
    const pl = o.getEntity();
    let txt = "";
    if (p.enum == 1) {
        txt = export_1.JapaneseONText;
    }
    else {
        txt = export_1.JapaneseOFFText;
    }
    if (pl != null) {
        pl.sendMessage(txt);
    }
    else {
        console.log(txt);
    }
}, {
    enum: command_1.command.enum("enums", {
        on: 1,
        off: 0,
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF5QjtBQUN6QixtQ0FBbUM7QUFDbkMscUNBS2tCO0FBQ2xCLHNDQUFvQztBQUNwQywrREFBNEM7QUFDNUMsa0RBQXdEO0FBQ3hELDRDQUE4QztBQUM5Qyx3Q0FBcUM7QUFDckMsMENBQXVDO0FBQ3ZDLDhDQUEwRDtBQUcxRCxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3RELE1BQU0sUUFBUSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQ2hDLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQWMsRUFBRSxNQUFNLENBQUMsQ0FDeEMsQ0FBQyxVQUFVLENBQUM7SUFDYixLQUFLLE1BQU0sQ0FBQyxJQUFJLFFBQVEsRUFBRTtRQUN4QixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztZQUFFLE9BQU87S0FDcEM7SUFDRCxNQUFNLElBQUksR0FBRyxJQUFBLDZCQUFPLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUM1QixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQ3ZCLGdFQUFnRSxJQUFJLEVBQUUsQ0FDdkUsQ0FBQztJQUNGLE9BQU87U0FDSixHQUFHLENBQUMsT0FBTyxDQUFDO1NBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBWSxDQUFDLENBQUM7U0FDeEMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtRQUN0QixNQUFNLE1BQU0sR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLHFCQUFZLEVBQUUsT0FB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