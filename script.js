let gameInstance = null;

function loadUnityApp(appName) {
    // メニューを非表示にし、ゲームコンテナを表示
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    // アプリごとのビルドパスを設定
    const config = {
        dataUrl: `Build/${appName}/${appName}.data`,
        frameworkUrl: `Build/${appName}/${appName}.framework.js`,
        codeUrl: `Build/${appName}/${appName}.wasm`,
        streamingAssetsUrl: "StreamingAssets",
        companyName: "YourCompany",
        productName: appName,
        productVersion: "1.0",
    };

    const canvas = document.querySelector("#unity-canvas");
    const loadingScreen = document.querySelector("#loading-screen");
    const startScreen = document.querySelector("#start-screen");
    const progressText = document.querySelector("#progress");
    const startButton = document.querySelector("#start-button");

    // 既存のインスタンスがあればクリア
    if (gameInstance) {
        gameInstance.Quit();
        gameInstance = null;
        canvas.innerHTML = ""; // キャンバスをリセット
    }

    // Unityインスタンスをロード
    UnityLoader.instantiate("unity-canvas", `Build/${appName}/${appName}.json`, {
        onProgress: function(instance, progress) {
            loadingScreen.style.display = "flex";
            progressText.textContent = Math.round(progress * 100);
        },
        onSuccess: function(instance) {
            gameInstance = instance;
            loadingScreen.style.display = "none";
            startScreen.style.display = "flex";
        }
    });

    // 開始ボタンのイベントリスナー
    startButton.onclick = function() {
        if (gameInstance) {
            gameInstance.SendMessage("GameController", "StartGame");
            startScreen.style.display = "none";
        }
    };
}
