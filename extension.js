const vscode = require('vscode');

function activate(context) {
    registerCommand('helpgpt.prompt', promptTheGPT);
    registerCommand('helpgpt.document', () => commandTheGPT("please generate documentation for this code"));
    registerCommand('helpgpt.summarize', () => commandTheGPT("please explain and summarize this code"));
    registerCommand('helpgpt.debug', () => commandTheGPT("please debug this code"));
    registerCommand('helpgpt.refactor', () => commandTheGPT("please refactor and optimize this code"));
    registerCommand('helpgpt.ask', askSpecificQuestion);
    registerCommand('helpgpt.open', () => vscode.env.openExternal(vscode.Uri.parse('https://chatgpt.com/')));

    context.subscriptions.push(...Object.values(commands));
}

const commands = {};

function registerCommand(name, callback) {
    commands[name] = vscode.commands.registerCommand(name, callback);
}

function promptTheGPT() {
    showInputBox('Prompt', (value) => {
        if (value) {
            openChatGPT(`https://chatgpt.com/?q=${encodeURIComponent(value)}`);
        } else {
            showErrorMessage('Please supply a prompt! 🤮');
        }
    });
}

function commandTheGPT(prompt) {
    const content = getEditorContent();
    const selectedText = getSelectedContent();
    const fullPrompt = selectedText ? `${selectedText} \n\n ${prompt}` : `${content} \n\n ${prompt}`;
    openChatGPT(`https://chatgpt.com/?q=${encodeURIComponent(fullPrompt)}`);
}

function askSpecificQuestion() {
    showInputBox('Ask a specific question about your code', (value) => {
        if (value) {
            commandTheGPT(value);
        } else {
            showErrorMessage('Please supply a prompt! 🤮');
        }
    });
}

function showInputBox(placeHolder, callback) {
    vscode.window.showInputBox({ prompt: '', placeHolder, value: '' }).then(callback);
}

function showErrorMessage(message) {
    vscode.window.showErrorMessage(message);
}

function openChatGPT(url) {
    vscode.window.showInformationMessage("Opening ChatGPT 👀");
    vscode.env.openExternal(vscode.Uri.parse(url));
}

function getSelectedContent() {
    const editor = vscode.window.activeTextEditor;
    return editor ? editor.document.getText(editor.selection) : null;
}

function getEditorContent() {
    const editor = vscode.window.activeTextEditor;
    return editor ? editor.document.getText() : null;
}

function deactivate() {}

module.exports = { activate, deactivate };
