/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()

    .then(() => {
        console.info("Scripting API ready");
        console.info("Player tags: ", WA.player.tags);

        // -----------------------------
        // CLOCK POPUP
        // -----------------------------
        WA.room.area.onEnter("clock").subscribe(() => {
            closePopup();

            const today = new Date();
            const time =
                today.getHours() +
                ":" +
                today.getMinutes().toString().padStart(2, "0");

            currentPopup = WA.ui.openPopup(
                "clockPopup",
                "🕒 It's " + time,
                []
            );
        });

        WA.room.area.onLeave("clock").subscribe(closePopup);

        // -----------------------------
        // RYOTAN-JI TEMPLE INFORMATION
        // -----------------------------
        WA.room.area.onEnter("ryotanji").subscribe(() => {
            closePopup();

            currentPopup = WA.ui.openPopup(
                "ryotanjiPopup",
                `🏯 Ryōtan-ji Temple

Welcome to Ryōtan-ji Temple, one of Hamamatsu's oldest Zen temples.

📅 Founded: 733 AD

🌸 Highlights
• Traditional Zen Buddhist temple
• Beautiful Japanese garden designed by Kobori Enshu
• Historic connection to the famous Ii samurai clan
• One of Hamamatsu's most visited cultural sites

Take a moment to enjoy the peaceful surroundings and learn about one of Japan's most treasured historical landmarks.`,
                []
            );
        });

        WA.room.area.onLeave("ryotanji").subscribe(closePopup);

        // ---------------------------------------
        // Bootstrap Scripting API Extra
        // ---------------------------------------
        bootstrapExtra()
            .then(() => {
                console.info("Scripting API Extra ready");
            })
            .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
console.log("Main.ts is running!");


export {};