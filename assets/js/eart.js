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

    document.getElementById("eart-info").textContent =
        earthquake.hypocenter.name;

    document.getElementById("eart-note").textContent =
        `M${earthquake.hypocenter.magnitude} / 最大震度${getShindo(earthquake.maxScale)}`;
    document.getElementById("eart-time").textContent =
        new Date(earthquake.time).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
            hour12: false,
        });
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