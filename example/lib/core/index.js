const Koa = require('koa');
const path = require('path');
const {deepMerge, getHooks} = require('./utils/tools')

const hooks = ['lift'];
export default async function DX(params) {
    const app = new Koa();
    const {appPath} = params;

    app.appPath = appPath;

    const env = process.env.NODE_ENV;
    const extName = app.extName = '.js';
    const baseConfig = await import(path.join(appPath, `config/config.base${extName}`));
    const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
    app.config = deepMerge(baseConfig.defaults(app), curConfig.defaults(app));

    const allHooks = await getHooks(hooks);
    for (let hook of allHooks) {
        try {
            await hook.default(app);
        } catch (err) {
            // 异常处理
        }
    }

    app.onerror((err)=>{
        console.error(err)
    })
}
