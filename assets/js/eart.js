async function getEarthquake() {

    const url =
        "https://api.p2pquake.net/v2/jma/quake?limit=1";

    const response = await fetch(url);

    if (!response.ok) {
        console.log("地震情報の取得に失敗しました");
        return;
    }

    const data = await response.json();

    console.log(data);

    const earthquake = data[0].earthquake;

    const eart = document.getElementById("eart-i");

    if (earthquake) {

        // 地震情報
        document.getElementById("eart-info").innerHTML =
            `揺れを検知した地域：${earthquake.hypocenter.name}`;

        document.getElementById("eart-note").textContent =
            `M${earthquake.hypocenter.magnitude} / 最大震度${getShindo(earthquake.maxScale)}`;

        document.getElementById("eart-time").textContent =
            new Date(earthquake.time).toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
                hour12: false,
            });

        eart.style.display = "block";


        // 最大震度
        const shindo = earthquake.maxScale;

        let message = "";

        if (shindo >= 70) {

            message =
                "🚨 震度7の非常に強い揺れです。津波などの情報を確認し、安全を確保してください。";

        } else if (shindo >= 60) {

            message =
                "🚨 震度6強の非常に強い揺れです。津波などの情報を確認し、安全を確保してください。";

        } else if (shindo >= 55) {

            message =
                "⚠️ 震度6弱の強い揺れです。津波などの情報を確認してご注意ください。";

        } else if (shindo >= 50) {

            message =
                "⚠️ 震度5強の強い揺れです。落下物などに注意してください。";

        } else if (shindo >= 45) {

            message =
                "⚠️ 震度5弱の揺れです。身の安全を確保してください。";

        } else if (shindo >= 40) {

            message =
                "⚠️ 震度4の揺れです。揺れに注意してください。";

        } else {

            message =
                "地震が発生しました。";

        }

        document.getElementById("message").textContent = message;

    } else {

        eart.style.display = "none";

    }
}


function getShindo(scale) {

    const scales = {
        10: "1",
        20: "2",
        30: "3",
        40: "4",
        45: "5弱",
        50: "5強",
        55: "6弱",
        60: "6強",
        70: "7"
    };

    return scales[scale] || "不明";
}


getEarthquake();

setInterval(getEarthquake, 60000);