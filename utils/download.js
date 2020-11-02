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

const request = require('request');
const fs = require('fs-extra');

async function download(url, dest) {
    const file = fs.createWriteStream(dest);
    await new Promise((resolve, reject) => {
        request({
            uri: url,
            gzip: true,
        })
        .pipe(file)
        .on('finish', async() => {
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        });
    })
    .catch((error) => {
        console.log(`Something happened: ${error}`);
    });
}

module.exports = download;
