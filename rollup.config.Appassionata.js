import clear from 'rollup-plugin-clear'
import screeps from 'rollup-plugin-screeps'
import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript2'
// 在代码头部引入包
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

let config
// 根据指定的目标获取对应的配置项
if (!process.env.DEST) console.log("未指定目标, 代码将被编译但不会上传")
else if (!(config = require("./.secret.json")[process.env.DEST])) {
    throw new Error("无效目标，请检查 secret.json 中是否包含对应配置")
}

// 根据指定的配置决定是上传还是复制到文件夹
const pluginDeploy = config && config.copyPath ?
    // 复制到指定路径
    copy({
        targets: [
            {
                src: 'dest/Appassionata/main.js',
                dest: config.copyPath
            },
            {
                src: 'dest/Appassionata/main.js.map',
                dest: config.copyPath,
                rename: name => name + '.map.js',
                transform: contents => `module.exports = ${contents.toString()};`
            }
        ],
        hook: 'writeBundle',
        verbose: true
    }) :
    // 更新 .map 到 .map.js 并上传
    screeps({ config, dryRun: !config })

export default [
    {
        input: 'src/main/mainAppassionata.ts',
        output: {
            file: 'dest/Appassionata/main.js',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [
            // 清除上次编译成果
            clear({ targets: ["dest/Appassionata"] }),
            // 打包依赖
            resolve(),
            // 模块化依赖
            commonjs(),
            // 编译 ts
            typescript({ tsconfig: "./tsconfigAppassionata.json" }), // <== 新增这一行，注意先后顺序不要搞错了
            // 执行上传或者复制
            pluginDeploy
        ]
    },
];