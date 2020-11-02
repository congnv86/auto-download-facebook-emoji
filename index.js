/*
 * Copyright 2020-present Cong Nguyen. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const fs = require('fs-extra');
const chalk = require('chalk');

const Constants = require('./constants.js');
const emojiData = require('./utils/emojiData.js');
const unicodeUtils = require('./utils/unicode.js');
const download = require('./utils/download.js');

/**
 * Check if folder is exist
 * */
function isExist(src) {
    return fs.existsSync(src);
}

/**
 * Return a hash string for emoji
 * @param: b string
 * @param: c number = checksum value
 * */
function h(b, c) {
    const d = unescape(encodeURIComponent(b));
    for (let e = 0; e < d.length; e++)
        c = (c << 5) - c + b.charCodeAt(e),
            c &= 4294967295;
    return (c & 255).toString(16)
}

function getUrl(a, c, d) {
    const f = 1 + "/" + c + "/" + a + ".png";
    a = h(f, 317426846);
    return "https:\/\/static.xx.fbcdn.net\/images\/emoji.php\/v9" + "/" + d + a + "/" + f
}

let size;
let toDir;
let folderPrefix;

process.argv.slice(2).map( (element, index) => {
    if (index === 0) {
        size = element;
    } else if (index === 1) {
        toDir = element;
    } else if (index === 2) {
        folderPrefix = element;
    }
});

const _sizeValue = parseInt(size);
const _supportSizesStr = Constants.SupportedSizes.join(', ');

if (!size || size.length === 0) {
    console.error(chalk.red(`You must specify emoji size to download. Use one of these value: ${_supportSizesStr}`));
    return;
} else if (!Constants.SupportedSizes.includes(_sizeValue)) {
    console.error(chalk.red(`The size: ${_sizeValue} is not supported. Use one of these value: ${_supportSizesStr}`));
    return;
}

if (!toDir || toDir.length === 0) {
    console.error(chalk.red(`You must specify a target folder to save emoji.`));
    return;
}

if (!isExist(toDir)) {
    console.error(chalk.red(`Target folder is not exist: ${toDir}`));
    return;
}

console.log(chalk.yellow(`Started downloading Facebook emoji size: ${size}. Please wait...`));

let _emojiCount = 0;
let _done = 0;

if (!isExist(`${toDir}/${size}`)) {
    fs.mkdirSync(`${toDir}/${size}`);
}

emojiData.map(async function(cat) {
    cat.emoji.map(async function(emoji) {
        _emojiCount++;
        const name = unicodeUtils.getKeyFromCodepoints(emoji.codepoint);
        const url = getUrl(name, size, "t");
        await download(url, `${toDir}/${size}/${name}.png`);
        _done++;

        if (_done === _emojiCount) {
            console.log(chalk.green(`Success downloaded ${_done} Emojis of size ${size}.`));
        }
    })
});
