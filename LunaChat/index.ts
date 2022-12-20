import * as fs from "fs";
import * as request from "request";
import {
  ChatTextPath,
  ConfigJsonPath,
  JapaneseONText,
  JapaneseOFFText,
} from "./export";
import { events } from "bdsx/event";
import convert from "./romaji-hira-convert";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { bedrockServer } from "bdsx/launcher";
import { CANCEL } from "bdsx/common";
import { command } from "bdsx/command";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { ServerPlayer } from "bdsx/bds/player";

events.packetBefore(MinecraftPacketIds.Text).on((pkt) => {
  const data_arr: any[] = JSON.parse(
    fs.readFileSync(ConfigJsonPath, "utf8")
  ).masterData;
  for (const i in data_arr) {
    if (data_arr[i].japan == 0) return;
  }
  const hira = convert(pkt.message);
  const name = pkt.name;
  const message = pkt.message;
  const fileUrl = encodeURI(
    `http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${hira}`
  );
  request
    .get(fileUrl)
    .pipe(fs.createWriteStream(ChatTextPath))
    .on("close", async () => {
      const result: string = fs.readFileSync(ChatTextPath, "utf-8").toString();
      let check = true;
      let results: any[] = [];
      for (let i = 3; i < result.split(`"`).length; i = i + 12) {
        results.push(result.split(`"`)[i]);
        if (!check) {
          i = 4;
          check = false;
        }
      }
      let text = "<" + name + ">" + message + " §6( " + results.join("") + " )";
      const pls = bedrockServer.level.getPlayers();
      for (const pl of pls) {
        pl.sendMessage(text);
      }
    });
  return CANCEL;
});
command
  .register("jp", "Japanese on/off", CommandPermissionLevel.Operator)
  .overload(
    (p, o, op) => {
      const jsi: any[] = JSON.parse(
        fs.readFileSync(ConfigJsonPath, "utf8")
      ).masterData;
      const data_arr: any[] = [];
      for (const item of jsi) {
        item.japan = p.enum;
        data_arr.push(item);
      }
      const masterData: string = JSON.stringify(
        { masterData: data_arr },
        null,
        " "
      );
      fs.writeFileSync(ConfigJsonPath, masterData);
      const pl = o.getEntity() as ServerPlayer;
      let txt = "";
      if (p.enum == 1) {
        txt = JapaneseONText;
      } else {
        txt = JapaneseOFFText;
      }
      if (pl != null) {
        pl.sendMessage(txt);
      } else {
        console.log(txt);
      }
    },
    {
      enum: command.enum("enums", {
        on: 1,
        off: 0,
      }),
    }
  );
