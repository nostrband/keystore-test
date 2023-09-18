
document.addEventListener('deviceready', onDeviceReady, false);

const logs = document.getElementById('logs');

function log(s) {
    logs.value += s + "\n";
}

function exec(method, params) {
    log("Method: "+method+" params "+JSON.stringify(params));
    window.cordova.plugins.NostrKeyStore[method]((r) => {
        log("Result: "+JSON.stringify(r));
    }, (e) => {
        console.log("error", e);
        log("Error: "+e);
    }, params);
}

function addKey() {
    exec('addKey');
}

function listKeys() {
    exec('listKeys');
}

function selectKey() {
    const publicKey = document.getElementById("selectKeyInput").value;
    exec('selectKey', {publicKey});
}

function getPublicKey() {
    exec('getPublicKey');
}

function signEvent() {
    const event = JSON.parse(document.getElementById("signEventInput").value);
    exec('signEvent', event);
}

function encrypt() {
    const pubkey = document.getElementById("encryptPubkeyInput").value;
    const plaintext = document.getElementById("encryptPlaintextInput").value;
    exec('encrypt', {pubkey, plaintext});
}

function decrypt() {
    const pubkey = document.getElementById("decryptPubkeyInput").value;
    const ciphertext = document.getElementById("decryptCiphertextInput").value;
    exec('decrypt', {pubkey, ciphertext});
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    document.getElementById('addKey').addEventListener('click', addKey);
    document.getElementById('listKeys').addEventListener('click', listKeys);
    document.getElementById('selectKey').addEventListener('click', selectKey);
    document.getElementById('getPublicKey').addEventListener('click', getPublicKey);
    document.getElementById('signEvent').addEventListener('click', signEvent);
    document.getElementById('encrypt').addEventListener('click', encrypt);
    document.getElementById('decrypt').addEventListener('click', decrypt);
}
