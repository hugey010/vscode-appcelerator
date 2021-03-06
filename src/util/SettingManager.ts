import * as vscode from 'vscode';
import * as fs from 'fs';

var config_file = vscode.workspace.rootPath+'/.vscode-appcelerator/settings.json';

export class SettingManager {
    public static getConfig() {
        if(fs.existsSync(config_file)) {
            var configText = fs.readFileSync(config_file, {"encoding":"utf8"});
            return JSON.parse(configText);
        }
        else return {};
    }

    public static updateConfig(newConfig) {
        var config = SettingManager.getConfig();
        for(var element in newConfig) {
            config[element] = newConfig[element];
        }
        if(!fs.existsSync(config_file)) fs.mkdirSync(vscode.workspace.rootPath+'/.vscode-appcelerator');
        fs.writeFile(config_file,JSON.stringify(config), function(err) {
            console.log("fs.writeFile", err);
        });
    }
}