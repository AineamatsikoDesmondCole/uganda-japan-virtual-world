const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    backgroundColor: '#87CEEB',

    scene: {
        create: create
    }
};

new Phaser.Game(config);

function create() {

    const g = this.add.graphics();

    // Sky
    g.fillStyle(0x87CEEB, 1);
    g.fillRect(0, 0, 1200, 700);

    // Uganda terrain
    g.fillStyle(0x4CAF50, 1);
    g.fillRect(0, 0, 520, 700);

    // Japan terrain
    g.fillStyle(0xD6D6D6, 1);
    g.fillRect(680, 0, 520, 700);

    // River Nile border
    g.fillStyle(0x1E90FF, 1);
    g.fillRect(520, 0, 160, 700);

    // River ripples
    for (let y = 0; y < 700; y += 40) {
        g.lineStyle(2, 0xFFFFFF);
        g.beginPath();
        g.moveTo(540, y + 10);
        g.lineTo(660, y + 20);
        g.strokePath();
    }

    // Lake Victoria
    g.fillStyle(0x0066CC);
    g.fillEllipse(180, 520, 220, 140);

    // Kampala city
    for (let i = 0; i < 6; i++) {
        let x = 120 + i * 40;
        let h = 80 + Math.random() * 60;

        g.fillStyle(0x777777);
        g.fillRect(x, 180, 30, h);

        for (let w = 0; w < 4; w++) {
            for (let r = 0; r < 6; r++) {
                g.fillStyle(0xFFFF99);
                g.fillRect(x + 5 + w * 6, 190 + r * 10, 3, 3);
            }
        }
    }

    // Murchison Falls
    g.fillStyle(0xFFFFFF);
    g.fillRect(350, 320, 60, 80);

    g.fillStyle(0x66CCFF);
    g.fillRect(360, 300, 40, 120);

    // Bwindi Forest
    for (let i = 0; i < 20; i++) {
        let tx = 300 + Math.random() * 150;
        let ty = 500 + Math.random() * 100;

        g.fillStyle(0x8B4513);
        g.fillRect(tx, ty, 5, 15);

        g.fillStyle(0x006400);
        g.fillCircle(tx + 2, ty - 5, 15);
    }

    // Roads Uganda
    g.fillStyle(0x444444);
    g.fillRect(240, 120, 18, 420);
    g.fillRect(100, 260, 250, 18);

    // Mount Fuji
    g.fillStyle(0x888888);

    g.fillTriangle(
        900, 250,
        1030, 250,
        965, 100
    );

    g.fillStyle(0xFFFFFF);

    g.fillTriangle(
        930, 180,
        1000, 180,
        965, 100
    );

    // Temple District
    for (let i = 0; i < 3; i++) {

        let x = 820 + i * 80;

        g.fillStyle(0xB22222);
        g.fillRect(x, 360, 60, 40);

        g.fillStyle(0x4B0000);
        g.fillTriangle(
            x - 5, 360,
            x + 65, 360,
            x + 30, 330
        );
    }

    // Tokyo skyscrapers
    for (let i = 0; i < 8; i++) {

        let x = 850 + i * 35;
        let h = 120 + Math.random() * 120;

        g.fillStyle(0x555555);
        g.fillRect(x, 500 - h, 25, h);

        for (let r = 0; r < 10; r++) {
            g.fillStyle(0xFFFFAA);
            g.fillRect(x + 5, 500 - h + 10 + r * 10, 3, 3);
            g.fillRect(x + 15, 500 - h + 10 + r * 10, 3, 3);
        }
    }

    // Cherry blossom trees
    for (let i = 0; i < 12; i++) {

        let x = 760 + Math.random() * 250;
        let y = 560 + Math.random() * 80;

        g.fillStyle(0x8B4513);
        g.fillRect(x, y, 5, 15);

        g.fillStyle(0xFFB6C1);
        g.fillCircle(x + 2, y - 8, 12);
    }

    // Japan roads
    g.fillStyle(0x444444);
    g.fillRect(920, 260, 18, 320);
    g.fillRect(780, 430, 250, 18);

    // Labels
    this.add.text(180, 30, "UGANDA", {
        fontSize: "34px",
        color: "#000"
    });

    this.add.text(850, 30, "JAPAN", {
        fontSize: "34px",
        color: "#000"
    });

    this.add.text(560, 30, "RIVER NILE", {
        fontSize: "22px",
        color: "#FFFFFF"
    });

    this.add.text(120, 610, "Lake Victoria", {
        fontSize: "18px",
        color: "#FFFFFF"
    });

    this.add.text(110, 150, "Kampala", {
        fontSize: "18px",
        color: "#FFFFFF"
    });

    this.add.text(320, 280, "Murchison Falls", {
        fontSize: "18px",
        color: "#FFFFFF"
    });

    this.add.text(300, 470, "Bwindi Forest", {
        fontSize: "18px",
        color: "#FFFFFF"
    });

    this.add.text(920, 70, "Mount Fuji", {
        fontSize: "18px",
        color: "#000"
    });

    this.add.text(830, 300, "Temple District", {
        fontSize: "18px",
        color: "#000"
    });

    this.add.text(900, 520, "Tokyo", {
        fontSize: "18px",
        color: "#FFFFFF"
    });

}