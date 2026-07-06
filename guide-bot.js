export async function run() {
    await WA.onInit();

    console.info("[GuideBot] starting");

    try {
        await WA.players.configureTracking({ players: true, movement: true });
        console.info("[GuideBot] player tracking enabled");
    } catch (error) {
        console.warn("[GuideBot] unable to enable player tracking", error);
    }

    WA.player.setOutlineColor(0, 135, 255).catch(() => {
        console.warn("[GuideBot] cannot set outline color");
    });

    const BOT_NAME = "GuideBot";
    const FOLLOW_DISTANCE = 120;
    let currentTargetId = undefined;
    let currentTargetPosition = undefined;
    let currentTargetName = undefined;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const sendMessage = (message) => {
        try {
            WA.chat.sendChatMessage(message, { author: BOT_NAME, scope: "bubble" });
        } catch (error) {
            console.warn("[GuideBot] send message failed", error);
            try {
                WA.ui.displayPlayerMessage({ message: `${BOT_NAME}: ${message}`, callback: () => {} });
            } catch (uiError) {
                console.warn("[GuideBot] ui fallback failed", uiError);
            }
        }
    };

    const announce = (message) => {
        console.info(`[GuideBot] ${message}`);
        sendMessage(message);
    };

    async function computeFollowPosition(targetPos) {
        const botPos = await WA.player.getPosition();
        const dx = targetPos.x - botPos.x;
        const dy = targetPos.y - botPos.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= FOLLOW_DISTANCE) {
            return null;
        }

        const keepDistance = Math.max(60, dist - FOLLOW_DISTANCE);
        return {
            x: botPos.x + (dx * keepDistance) / dist,
            y: botPos.y + (dy * keepDistance) / dist,
        };
    }

    const setTarget = (player) => {
        if (!player || currentTargetId === player.playerId) {
            return;
        }

        currentTargetId = player.playerId;
        currentTargetPosition = player.position;
        currentTargetName = player.name;

        announce(`Hello ${player.name}. I will follow you and guide you around the map.`);
        console.info(`[GuideBot] new target set: ${player.name} (${player.playerId})`, player.position);
    };

    const clearTarget = () => {
        announce("I lost you. Come closer and I will continue guiding.");
        currentTargetId = undefined;
        currentTargetPosition = undefined;
        currentTargetName = undefined;
    };

    const scanForPlayer = () => {
        if (currentTargetId) {
            return;
        }

        const players = Array.from(WA.players.list());
        console.info("[GuideBot] scanForPlayer found", players.length, "nearby players");

        for (const player of players) {
            setTarget(player);
            break;
        }
    };

    const updateTargetPosition = ({ player, newPosition }) => {
        if (currentTargetId === player.playerId) {
            currentTargetPosition = newPosition;
            console.info("[GuideBot] target moved", player.name, newPosition);
        }
    };

    WA.players.onPlayerEnters.subscribe((player) => {
        console.info("[GuideBot] onPlayerEnters", player.name, player.playerId, player.position);
        setTarget(player);
    });

    WA.players.onPlayerLeaves.subscribe((player) => {
        console.info("[GuideBot] onPlayerLeaves", player.name, player.playerId);
        if (currentTargetId === player.playerId) {
            clearTarget();
        }
    });

    WA.players.onPlayerMoves.subscribe(updateTargetPosition);

    await wait(1000);
    scanForPlayer();
    setInterval(scanForPlayer, 3000);

    announce("GuideBot is active. Walk around and I will stay close to you.");

    while (true) {
        if (currentTargetPosition) {
            const destination = await computeFollowPosition(currentTargetPosition);
            if (destination) {
                console.info("[GuideBot] moving toward", currentTargetName, destination);
                const result = await WA.player.moveTo(destination.x, destination.y, 130).catch((error) => {
                    console.warn("[GuideBot] moveTo failed", error);
                    return { cancelled: true };
                });

                if (result.cancelled) {
                    console.info("[GuideBot] moveTo cancelled, retrying");
                    await wait(400);
                }
            }
        }
        await wait(500);
    }
}
