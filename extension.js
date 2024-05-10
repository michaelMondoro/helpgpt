const vscode = require('vscode');
const opn = require('opn');

function activate(context) {
    let disposable1 = vscode.commands.registerCommand('helpgpt.prompt', () => {
        promptTheGPT();
    });

    let disposable2 = vscode.commands.registerCommand('helpgpt.document', () => {
        commandTheGPT("please generate documentation for this code");
    });

    let disposable3 = vscode.commands.registerCommand('helpgpt.summarize', () => {
        commandTheGPT("please explain and summarize this code");
    });

    let disposable4 = vscode.commands.registerCommand('helpgpt.debug', () => {
        commandTheGPT("please debug this code");
    });

    let disposable5 = vscode.commands.registerCommand('helpgpt.refactor', () => {
        commandTheGPT("please refactor and optimize this code");
    });

    let disposable6 = vscode.commands.registerCommand('helpgpt.open', () => {
        vscode.window.showInformationMessage("Opening ChatGPT 👀");
        opn('https://chatgpt.com/');
    });

    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable4);
    context.subscriptions.push(disposable5);
}

function promptTheGPT() {
    // Open ChatGPT URL in the default browser
    vscode.window.showInputBox({
        prompt: '',
        placeHolder: 'Prompt',
        value: ''
    }).then((value) => {
        if (value) {
            opn('https://chatgpt.com/?q=' + value); 
        } else {
            vscode.window.showErrorMessage('Please supply a prompt! 🤮');
            return;
        }   
    });
}

function commandTheGPT(prompt) {
    const content = getEditorContent();
    if (content) {
        prompt = `${prompt} : ${content}`;
        opn('https://chatgpt.com/?q=' + encodeURIComponent(prompt));
    } else {
        vscode.window.showErrorMessage("Open some code first! 🤬");
    }
}

function getEditorContent() {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        // Get the document associated with the active editor
        const document = editor.document;
        // Get the text contents of the document
        const content = document.getText();
        return content;
    } else {
        return null;
    }
}
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
