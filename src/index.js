/**
 * HTMLレスポンスを生成する関数（iOS 9互換 UI/JS）
 * @returns {string} HTML文字列
 */
function getHtmlContent() {
  return '<!DOCTYPE html>\n' +
'<html>\n' +
'<head>\n' +
'  <meta charset="utf-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Private Gemini Chat</title>\n' +
'  <style>\n' +
'    * {\n' +
'      box-sizing: border-box;\n' +
'    }\n' +
'    body, html {\n' +
'      margin: 0;\n' +
'      padding: 0;\n' +
'      height: 100%;\n' +
'      font-family: -apple-system, Helvetica, Arial, sans-serif;\n' +
'      background-color: #f4f4f7;\n' +
'    }\n' +
'    .clearfix:after {\n' +
'      content: "";\n' +
'      display: table;\n' +
'      clear: both;\n' +
'    }\n' +
'    /* レイアウト構成（パーセント幅＋float） */\n' +
'    #sidebar {\n' +
'      width: 30%;\n' +
'      float: left;\n' +
'      height: 100%;\n' +
'      background-color: #2c3e50;\n' +
'      color: #ecf0f1;\n' +
'      overflow-y: auto;\n' +
'    }\n' +
'    #main-content {\n' +
'      width: 70%;\n' +
'      float: left;\n' +
'      height: 100%;\n' +
'      background-color: #ffffff;\n' +
'      position: relative;\n' +
'    }\n' +
'    /* サイドバー要素 */\n' +
'    .sidebar-header {\n' +
'      padding: 15px;\n' +
'      background-color: #1a252f;\n' +
'      border-bottom: 1px solid #34495e;\n' +
'    }\n' +
'    .sidebar-header h2 {\n' +
'      margin: 0 0 10px 0;\n' +
'      font-size: 16px;\n' +
'    }\n' +
'    .btn-new-chat {\n' +
'      width: 100%;\n' +
'      padding: 8px;\n' +
'      background-color: #3498db;\n' +
'      color: white;\n' +
'      border: none;\n' +
'      border-radius: 4px;\n' +
'      cursor: pointer;\n' +
'      font-size: 14px;\n' +
'    }\n' +
'    .session-list {\n' +
'      list-style: none;\n' +
'      padding: 0;\n' +
'      margin: 0;\n' +
'    }\n' +
'    .session-item {\n' +
'      padding: 12px 15px;\n' +
'      border-bottom: 1px solid #34495e;\n' +
'      cursor: pointer;\n' +
'    }\n' +
'    .session-item.active {\n' +
'      background-color: #34495e;\n' +
'    }\n' +
'    .session-item .title {\n' +
'      font-weight: bold;\n' +
'      font-size: 14px;\n' +
'      overflow: hidden;\n' +
'      text-overflow: ellipsis;\n' +
'      white-space: nowrap;\n' +
'    }\n' +
'    /* メインコンテンツエリア */\n' +
'    #chat-header {\n' +
'      padding: 15px;\n' +
'      background-color: #ecf0f1;\n' +
'      border-bottom: 1px solid #bdc3c7;\n' +
'      font-weight: bold;\n' +
'    }\n' +
'    #chat-messages {\n' +
'      padding: 15px;\n' +
'      overflow-y: auto;\n' +
'      height: calc(100% - 120px);\n' +
'    }\n' +
'    .message-bubble {\n' +
'      margin-bottom: 12px;\n' +
'      padding: 10px 14px;\n' +
'      border-radius: 6px;\n' +
'      max-width: 80%;\n' +
'      line-height: 1.4;\n' +
'      word-wrap: break-word;\n' +
'    }\n' +
'    .message-bubble.user {\n' +
'      float: right;\n' +
'      background-color: #3498db;\n' +
'      color: white;\n' +
'      clear: both;\n' +
'    }\n' +
'    .message-bubble.model {\n' +
'      float: left;\n' +
'      background-color: #e8ecf0;\n' +
'      color: #2c3e50;\n' +
'      clear: both;\n' +
'    }\n' +
'    /* 入力フォーム */\n' +
'    #chat-input-area {\n' +
'      position: absolute;\n' +
'      bottom: 0;\n' +
'      left: 0;\n' +
'      right: 0;\n' +
'      padding: 10px 15px;\n' +
'      background-color: #f4f4f7;\n' +
'      border-top: 1px solid #bdc3c7;\n' +
'    }\n' +
'    #message-input {\n' +
'      width: 80%;\n' +
'      float: left;\n' +
'      padding: 8px;\n' +
'      border: 1px solid #bdc3c7;\n' +
'      border-radius: 4px;\n' +
'      font-size: 14px;\n' +
'    }\n' +
'    #send-btn {\n' +
'      width: 18%;\n' +
'      float: right;\n' +
'      padding: 8px;\n' +
'      background-color: #2ecc71;\n' +
'      color: white;\n' +
'      border: none;\n' +
'      border-radius: 4px;\n' +
'      cursor: pointer;\n' +
'      font-size: 14px;\n' +
'    }\n' +
'    /* モーダルダイアログ */\n' +
'    .modal {\n' +
'      display: none;\n' +
'      position: fixed;\n' +
'      top: 0; left: 0; width: 100%; height: 100%;\n' +
'      background-color: rgba(0,0,0,0.5);\n' +
'      z-index: 1000;\n' +
'    }\n' +
'    .modal-content {\n' +
'      background-color: white;\n' +
'      width: 80%;\n' +
'      max-width: 400px;\n' +
'      margin: 100px auto;\n' +
'      padding: 20px;\n' +
'      border-radius: 6px;\n' +
'    }\n' +
'    .modal-content h3 {\n' +
'      margin-top: 0;\n' +
'    }\n' +
'    .modal-content input, .modal-content textarea {\n' +
'      width: 100%;\n' +
'      margin-bottom: 12px;\n' +
'      padding: 8px;\n' +
'      border: 1px solid #ccc;\n' +
'      border-radius: 4px;\n' +
'      box-sizing: border-box;\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="app" class="clearfix">\n' +
'    <div id="sidebar">\n' +
'      <div class="sidebar-header">\n' +
'        <h2>Gemini Chat</h2>\n' +
'        <button class="btn-new-chat" onclick="openNewChatModal()">+ 新しい会話</button>\n' +
'      </div>\n' +
'      <ul id="session-list" class="session-list"></ul>\n' +
'    </div>\n' +
'    <div id="main-content">\n' +
'      <div id="chat-header">会話を選択してください</div>\n' +
'      <div id="chat-messages" class="clearfix"></div>\n' +
'      <div id="chat-input-area" class="clearfix">\n' +
'        <input type="text" id="message-input" placeholder="メッセージを入力..." onkeypress="handleKeyPress(event)">\n' +
'        <button id="send-btn" onclick="sendMessage()">送信</button>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <!-- 新規会話作成モーダル -->\n' +
'  <div id="new-chat-modal" class="modal">\n' +
'    <div class="modal-content">\n' +
'      <h3>新しい会話を作成</h3>\n' +
'      <label>タイトル:</label>\n' +
'      <input type="text" id="new-title" placeholder="例: 英語学習アシスタント">\n' +
'      <label>システムプロンプト (任意):</label>\n' +
'      <textarea id="new-system-prompt" rows="3" placeholder="例: あなたは親切な英語教師です。"></textarea>\n' +
'      <button class="btn-new-chat" onclick="createSession()">作成</button>\n' +
'      <button style="margin-top: 5px; width: 100%; padding: 8px;" onclick="closeNewChatModal()">キャンセル</button>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <script>\n' +
'    /* iOS 9 (ES5) 準拠JavaScript */\n' +
'    var currentSessionId = null;\n' +
'\n' +
'    function ajaxRequest(method, url, data, callback) {\n' +
'      var xhr = new XMLHttpRequest();\n' +
'      xhr.open(method, url, true);\n' +
'      xhr.setRequestHeader("Content-Type", "application/json");\n' +
'      xhr.onreadystatechange = function() {\n' +
'        if (xhr.readyState === 4) {\n' +
'          if (xhr.status >= 200 && xhr.status < 300) {\n' +
'            var res = null;\n' +
'            try { res = JSON.parse(xhr.responseText); } catch(e) {}\n' +
'            callback(null, res);\n' +
'          } else {\n' +
'            callback(new Error("Request failed with status " + xhr.status), null);\n' +
'          }\n' +
'        }\n' +
'      };\n' +
'      xhr.send(data ? JSON.stringify(data) : null);\n' +
'    }\n' +
'\n' +
'    function loadSessions() {\n' +
'      ajaxRequest("GET", "/api/sessions", null, function(err, data) {\n' +
'        if (err || !data) return;\n' +
'        var listEl = document.getElementById("session-list");\n' +
'        listEl.innerHTML = "";\n' +
'        var sessions = data.sessions || [];\n' +
'        for (var i = 0; i < sessions.length; i++) {\n' +
'          var sess = sessions[i];\n' +
'          var li = document.createElement("li");\n' +
'          li.className = "session-item" + (sess.id === currentSessionId ? " active" : "");\n' +
'          li.setAttribute("data-id", sess.id);\n' +
'          li.onclick = (function(s) {\n' +
'            return function() { selectSession(s); };\n' +
'          })(sess);\n' +
'          li.innerHTML = \'<div class="title">\' + escapeHtml(sess.title) + \'</div>\';\n' +
'          listEl.appendChild(li);\n' +
'        }\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function selectSession(session) {\n' +
'      currentSessionId = session.id;\n' +
'      document.getElementById("chat-header").innerText = session.title;\n' +
'      loadSessions();\n' +
'      loadMessages(session.id);\n' +
'    }\n' +
'\n' +
'    function loadMessages(sessionId) {\n' +
'      ajaxRequest("GET", "/api/sessions/" + sessionId + "/messages", null, function(err, data) {\n' +
'        if (err || !data) return;\n' +
'        var msgContainer = document.getElementById("chat-messages");\n' +
'        msgContainer.innerHTML = "";\n' +
'        var messages = data.messages || [];\n' +
'        for (var i = 0; i < messages.length; i++) {\n' +
'          var msg = messages[i];\n' +
'          appendMessageBubble(msg.role, msg.text);\n' +
'        }\n' +
'        scrollToBottom();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function sendMessage() {\n' +
'      if (!currentSessionId) {\n' +
'        alert("会話を選択してください。");\n' +
'        return;\n' +
'      }\n' +
'      var inputEl = document.getElementById("message-input");\n' +
'      var text = inputEl.value;\n' +
'      if (!text) return;\n' +
'      inputEl.value = "";\n' +
'      appendMessageBubble("user", text);\n' +
'      scrollToBottom();\n' +
'\n' +
'      ajaxRequest("POST", "/api/sessions/" + currentSessionId + "/messages", { text: text }, function(err, data) {\n' +
'        if (err || !data) {\n' +
'          appendMessageBubble("model", "エラー: 送信に失敗しました。");\n' +
'        } else {\n' +
'          appendMessageBubble("model", data.ai_message);\n' +
'        }\n' +
'        scrollToBottom();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function appendMessageBubble(role, text) {\n' +
'      var msgContainer = document.getElementById("chat-messages");\n' +
'      var div = document.createElement("div");\n' +
'      div.className = "message-bubble " + (role === "user" ? "user" : "model");\n' +
'      div.innerText = text;\n' +
'      msgContainer.appendChild(div);\n' +
'    }\n' +
'\n' +
'    function scrollToBottom() {\n' +
'      var msgContainer = document.getElementById("chat-messages");\n' +
'      msgContainer.scrollTop = msgContainer.scrollHeight;\n' +
'    }\n' +
'\n' +
'    function handleKeyPress(e) {\n' +
'      if (e.keyCode === 13) {\n' +
'        sendMessage();\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function openNewChatModal() {\n' +
'      document.getElementById("new-chat-modal").style.display = "block";\n' +
'    }\n' +
'    function closeNewChatModal() {\n' +
'      document.getElementById("new-chat-modal").style.display = "none";\n' +
'    }\n' +
'\n' +
'    function createSession() {\n' +
'      var title = document.getElementById("new-title").value;\n' +
'      var sysPrompt = document.getElementById("new-system-prompt").value;\n' +
'      if (!title) title = "新しい会話";\n' +
'\n' +
'      ajaxRequest("POST", "/api/sessions", { title: title, system_instruction: sysPrompt }, function(err, data) {\n' +
'        closeNewChatModal();\n' +
'        document.getElementById("new-title").value = "";\n' +
'        document.getElementById("new-system-prompt").value = "";\n' +
'        if (data) {\n' +
'          selectSession(data);\n' +
'        }\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function escapeHtml(str) {\n' +
'      if (!str) return "";\n' +
'      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");\n' +
'    }\n' +
'\n' +
'    // 初期化\n' +
'    loadSessions();\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

/**
 * Basic認証を検証する関数
 * @param {Request} request - HTTPリクエストオブジェクト
 * @param {Object} env - 環境変数オブジェクト
 * @returns {boolean} 認証成功の場合true
 */
function checkBasicAuth(request, env) {
  var authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }
  var base64Credentials = authHeader.substring(6);
  try {
    var credentials = atob(base64Credentials);
    var parts = credentials.split(":");
    var username = parts[0];
    var password = parts.slice(1).join(":");

    var expectedUser = env.BASIC_USER || "admin";
    var expectedPass = env.BASIC_PASS || "password";

    return username === expectedUser && password === expectedPass;
  } catch (e) {
    return false;
  }
}

/**
 * 401 Unauthorized レスポンスを生成する関数
 * @returns {Response} 401レスポンス
 */
function createUnauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Private Gemini Chat"',
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

/**
 * JSONレスポンスを生成するユーティリティ関数
 * @param {Object} data - レスポンスデータ
 * @param {number} status - HTTPステータスコード
 * @returns {Response}
 */
function jsonResponse(data, status) {
  if (typeof status === "undefined") {
    status = 200;
  }
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

/**
 * 全セッション一覧を取得する関数
 * @param {Object} db - D1データベースバインディング
 * @returns {Promise<Response>}
 */
async function handleGetSessions(db) {
  var stmt = db.prepare("SELECT * FROM sessions ORDER BY created_at DESC");
  var result = await stmt.all();
  return jsonResponse({ sessions: result.results || [] });
}

/**
 * 新規セッションを作成する関数
 * @param {Request} request - HTTPリクエスト
 * @param {Object} db - D1データベースバインディング
 * @returns {Promise<Response>}
 */
async function handleCreateSession(request, db) {
  var body = await request.json();
  var title = body.title || "新しい会話";
  var systemInstruction = body.system_instruction || "";
  var id = "sess_" + Date.now();

  var stmt = db.prepare(
    "INSERT INTO sessions (id, title, system_instruction) VALUES (?, ?, ?)"
  );
  await stmt.bind(id, title, systemInstruction).run();

  return jsonResponse({
    id: id,
    title: title,
    system_instruction: systemInstruction
  }, 201);
}

/**
 * 指定したセッションを削除する関数
 * @param {string} sessionId - セッションID
 * @param {Object} db - D1データベースバインディング
 * @returns {Promise<Response>}
 */
async function handleDeleteSession(sessionId, db) {
  var stmt1 = db.prepare("DELETE FROM messages WHERE session_id = ?");
  await stmt1.bind(sessionId).run();

  var stmt2 = db.prepare("DELETE FROM sessions WHERE id = ?");
  await stmt2.bind(sessionId).run();

  return jsonResponse({ success: true });
}

/**
 * 指定したセッションのメッセージ履歴を取得する関数
 * @param {string} sessionId - セッションID
 * @param {Object} db - D1データベースバインディング
 * @returns {Promise<Response>}
 */
async function handleGetMessages(sessionId, db) {
  var stmt = db.prepare(
    "SELECT * FROM messages WHERE session_id = ? ORDER BY id ASC"
  );
  var result = await stmt.bind(sessionId).all();
  return jsonResponse({ messages: result.results || [] });
}

/**
 * メッセージを送信しGemini APIからの回答を取得して保存する関数
 * @param {string} sessionId - セッションID
 * @param {Request} request - HTTPリクエスト
 * @param {Object} env - 環境変数オブジェクト
 * @returns {Promise<Response>}
 */
async function handleSendMessage(sessionId, request, env) {
  var body = await request.json();
  var userText = body.text;
  if (!userText) {
    return jsonResponse({ error: "Text is required" }, 400);
  }

  // 1. セッション情報の取得 (system_instruction 確認のため)
  var sessionStmt = env.DB.prepare("SELECT * FROM sessions WHERE id = ?");
  var session = await sessionStmt.bind(sessionId).first();
  if (!session) {
    return jsonResponse({ error: "Session not found" }, 404);
  }

  // 2. ユーザーメッセージをDBに保存
  var saveUserStmt = env.DB.prepare(
    "INSERT INTO messages (session_id, role, text) VALUES (?, ?, ?)"
  );
  await saveUserStmt.bind(sessionId, "user", userText).run();

  // 3. これまでの会話履歴を取得
  var historyStmt = env.DB.prepare(
    "SELECT role, text FROM messages WHERE session_id = ? ORDER BY id ASC"
  );
  var historyResult = await historyStmt.bind(sessionId).all();
  var messages = historyResult.results || [];

  // 4. Gemini API 呼び出しリクエストの構築
  var contents = [];
  for (var i = 0; i < messages.length; i++) {
    var msg = messages[i];
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    });
  }

  var geminiPayload = {
    contents: contents
  };

  if (session.system_instruction) {
    geminiPayload.system_instruction = {
      parts: [{ text: session.system_instruction }]
    };
  }

  var apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "GEMINI_API_KEY is not configured" }, 500);
  }

  var geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

  var geminiRes = await fetch(geminiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(geminiPayload)
  });

  if (!geminiRes.ok) {
    var errText = await geminiRes.text();
    return jsonResponse({ error: "Gemini API Error", details: errText }, 500);
  }

  var geminiData = await geminiRes.json();
  var aiText = "";
  try {
    aiText = geminiData.candidates[0].content.parts[0].text;
  } catch (e) {
    aiText = "エラー: AIからの応答の解析に失敗しました。";
  }

  // 5. AIメッセージをDBに保存
  var saveAiStmt = env.DB.prepare(
    "INSERT INTO messages (session_id, role, text) VALUES (?, ?, ?)"
  );
  await saveAiStmt.bind(sessionId, "model", aiText).run();

  return jsonResponse({
    user_message: userText,
    ai_message: aiText
  });
}

/**
 * Cloudflare Workers メインフェッチハンドラー
 */
export default {
  async fetch(request, env, ctx) {
    // Basic認証チェック
    if (!checkBasicAuth(request, env)) {
      return createUnauthorizedResponse();
    }

    var url = new URL(request.url);
    var path = url.pathname;
    var method = request.method;

    // トップページ: HTML配信
    if (path === "/" && method === "GET") {
      return new Response(getHtmlContent(), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    if (path === "/api/ping" && method === "GET") {
      return jsonResponse({ status: "ok", message: "Authenticated successfully" });
    }

    // セッション一覧取得
    if (path === "/api/sessions" && method === "GET") {
      return handleGetSessions(env.DB);
    }

    // セッション作成
    if (path === "/api/sessions" && method === "POST") {
      return handleCreateSession(request, env.DB);
    }

    // メッセージ送信 (/api/sessions/:id/messages)
    if (path.startsWith("/api/sessions/") && path.endsWith("/messages") && method === "POST") {
      var parts = path.split("/");
      var sessionIdForSend = parts[3];
      return handleSendMessage(sessionIdForSend, request, env);
    }

    // メッセージ一覧取得 (/api/sessions/:id/messages)
    if (path.startsWith("/api/sessions/") && path.endsWith("/messages") && method === "GET") {
      var partsMsg = path.split("/");
      var sessionIdForMsg = partsMsg[3];
      return handleGetMessages(sessionIdForMsg, env.DB);
    }

    // セッション削除 (/api/sessions/:id)
    if (path.startsWith("/api/sessions/") && method === "DELETE") {
      var sessionIdToDelete = path.replace("/api/sessions/", "");
      return handleDeleteSession(sessionIdToDelete, env.DB);
    }

    return new Response("Not Found", { status: 404 });
  }
};
