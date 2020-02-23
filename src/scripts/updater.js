const api = require('./api')

exports.check = async () => {
    var info = await api.getInfo()
    var version = $file.read("version.conf").string;
    if(version == info.version){
        return
    }

    const actions = ["Update","Cancel"]
    const {index} = await $ui.alert({
        title: "Update",
        message: "New version available!",
        actions: actions
    });

    if(index != 0) {
        return
    }

    const pkgURL = info.url;
    const pkgName = info.name; 
    const redirURL = `jsbox://import?url=${encodeURIComponent(pkgURL)}&name=${encodeURIComponent(pkgName)}`;
   
    $app.openURL(redirURL);
    $app.close()
}